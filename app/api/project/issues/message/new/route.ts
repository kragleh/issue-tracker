import { auth } from "@/auth"
import { db } from "@/lib/db"
import { IssueMessageType } from "@prisma/client"
import { z } from "zod"

const bodySchema = z.object({
  projectId: z.string().min(1).max(100),
  issueId: z.string().min(1).max(100),
  content: z.string().min(1).max(2048),
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

  const project = await db.project.findFirst({ where: { id: body.projectId }, include: { members: true } })

  if (!project) return Response.json({ message: 'Project not found' }, { status: 400 })
  if (project.members.every(member => member.id !== user.id)) return Response.json({ message: 'You are not a member of this project' }, { status: 400 })

  const issue = await db.issue.findFirst({
    where: {
      id: body.issueId,
    },
  })

  if (!issue) return Response.json({ message: 'Issue not found' }, { status: 400 })

  await db.issueMessage.create({
    data: {
      issueId: issue.id,
      message: body.content,
      ownerId: user.id,
      type: IssueMessageType.USER,
    }
  })

  return Response.json({ message: 'Success' }, { status: 200 })
}