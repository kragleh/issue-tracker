import { auth } from "@/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const bodySchema = z.object({
  inviteId: z.string().min(1).max(100),
})

export const POST = async (request: Request) => {
  const session = await auth()
  const user = session?.user

  if (!user) return Response.json({ message: 'Unauthorized' }, { status: 401 })
  if (!user.id) return Response.json({ message: 'Invalid user id' }, { status: 401 })

  const body = await request.json()

  try {
    bodySchema.parse(body)
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Response.json({ message: e.errors }, { status: 400 })
    }

    return Response.json({ message: 'Invalid request data' }, { status: 400 })
  }

  const invite = await db.projectInvite.findFirst({ where: { id: body.inviteId } })
  if (!invite) return Response.json({ message: 'Invite not found' }, { status: 400 })

  if (invite.uses === 0) return Response.json({ message: 'Invite has been depleted' }, { status: 400 })

  const project = await db.project.findFirst({ where: { id: invite.projectId }, include: { members: true } })
  if (!project) return Response.json({ message: 'Project not found' }, { status: 400 })
  if (project.members.every(member => member.id === user.id)) return Response.json({ message: 'You are a member of this project' }, { status: 400 })

  await db.project.update({
    where: { id: project.id },
    data: {
      members: {
        connect: {
          id: user.id,
        }
      }
    }
  })

  await db.projectInvite.update({
    where: { id: body.inviteId },
    data: {
      uses: invite.uses - 1,
    }
  })

  return Response.json({ message: 'Success', inviteId: invite.id }, { status: 200 })
}