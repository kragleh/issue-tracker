import { auth } from "@/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const bodySchema = z.object({
  userId: z.string().min(1).max(100),
})

export const POST = async (request: Request) => {
  const session = await auth()
  const user = session?.user

  if (!user) return Response.json({ message: 'Unauthorized' }, { status: 401 })
  if (!user.id) return Response.json({ message: 'Invalid user id' }, { status: 401 })

  const userObj = await db.user.findUnique({ where: { id: user.id } })
  if (!userObj) return Response.json({ message: 'User not found' }, { status: 404 })
  if (userObj.role !== 'ADMIN') return Response.json({ message: 'You are not allowed to demote users' }, { status: 401 })

  const body = await request.json()

  try {
    bodySchema.parse(body)
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Response.json({ message: e.errors }, { status: 400 })
    }

    return Response.json({ message: 'Invalid request data' }, { status: 400 })
  }

  const demoteUser = await db.user.findUnique({ where: { id: body.userId } })
  if (!demoteUser) return Response.json({ message: 'Demote user not found' }, { status: 404 })
  if (demoteUser.role === "USER") return Response.json({ message: 'This user is already a user' }, { status: 401 })

  await db.user.update({
    where: {
      id: body.userId
    },
    data: {
      role: "USER"
    }
  })

  return Response.json({ message: 'Success' }, { status: 200 })
}