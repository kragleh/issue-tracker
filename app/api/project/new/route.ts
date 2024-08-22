import { auth } from "@/auth"
import { z } from "zod"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

  const project = await prisma.project.create({
    data: {
      ownerId: user.id,
      title: body.title,
      description: body.description,
    }
  })

  await prisma.project.update({
    where: {
      id: project.id
    },
    data: {
      members: {
        connect: {
          id: user.id
        }
      }
    }
  })

  return Response.json({ message: 'Success' }, { status: 200 })
}