import { auth } from "@/auth"
import { RolePermissions } from "@/lib/RolePermissions"
import { db } from "@/lib/db"
import { z } from "zod"

const bodySchema = z.object({
  projectId: z.string().min(1).max(100),
  name: z.string().min(1).max(100),
  color: z.string().min(6).max(6),
  weight: z.number().min(0).max(1000),
  permissions: z.array(z.enum(Object.values(RolePermissions) as [string, ...string[]])),
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

  const project = await db.project.findFirst({ where: { id: body.projectId } })

  if (!project) return Response.json({ message: 'Project not found' }, { status: 404 })

  const role = await db.projectRole.create({
    data: {
      projectId: project.id,
      name: body.name,
      color: body.color,
      weight: body.weight,
      permissions: body.permissions,
    }
  })

  await db.project.update({
    where: {
      id: project.id
    },
    data: {
      projectRoles: {
        connect: {
          id: role.id
        }
      }
    }
  })

  return Response.json({ message: 'Success' }, { status: 200 })
}