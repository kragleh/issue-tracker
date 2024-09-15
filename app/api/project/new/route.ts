import { auth } from "@/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const bodySchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(2048),
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

  const project = await db.project.create({
    data: {
      ownerId: user.id,
      title: body.title,
      description: body.description,

    }
  })

  const defaultRole = await db.projectRole.create({
    data: {
      name: 'Member',
      projectId: project.id,
      color: '99aab5',
      permission: 'MEMBER',
    }
  })

  await db.projectRole.update({
    where: {
      id: defaultRole.id
    },
    data: {
      users: {
        connect: {
          id: user.id
        }
      }
    }
  })

  await db.project.update({
    where: {
      id: project.id
    },
    data: {
      defaultRoleId: defaultRole.id,
      members: {
        connect: {
          id: user.id
        }
      }
    }
  })

  return Response.json({ message: 'Success' }, { status: 200 })
}