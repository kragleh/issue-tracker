import { auth } from "@/auth"
import { validateProjectDescription, validateProjectTitle } from "@/lib/Validate"
import { db } from "@/lib/db"
import { z } from "zod"

const bodySchema = z.object({
  projectId: z.string().min(20).max(32),
  title: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
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

  const project = await db.project.findUnique({ where: { id: body.projectId }, include: { owner: true } })

  if (!project) return Response.json({ message: 'Project not found' }, { status: 404 })

  if (project.owner.id !== user.id) return Response.json({ message: 'You are not allowed to edit this project' }, { status: 401 })

  if (body.title) {
    const title = validateProjectTitle(body.title)
    if (!title.success) return Response.json({ message: title.error.message }, { status: 400 })

    await db.project.update({
      where: {
        id: project.id
      },
      data: {
        title: body.title
      }
    })
  }

  if (body.description) {
    const description = validateProjectDescription(body.description)
    if (!description.success) return Response.json({ message: description.error.message }, { status: 400 })

    await db.project.update({
      where: {
        id: project.id
      },
      data: {
        description: body.description
      }
    })
  }

  if (body.icon) {
    if (!body.icon) return Response.json({ message: 'No icon provided' }, { status: 400 })

    await db.project.update({
      where: {
        id: project.id
      },
      data: {
        icon: body.icon
      }
    })
  }

  return Response.json({ message: 'Success' }, { status: 200 })
}