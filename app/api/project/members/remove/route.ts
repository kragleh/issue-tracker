import { auth } from "@/auth"
import { hasPermissionInRoles } from "@/lib/PermUtil"
import { RolePermissions } from "@/lib/RolePermissions"
import { db } from "@/lib/db"
import { z } from "zod"

const bodySchema = z.object({
  projectId: z.string().min(1).max(100),
  memberId: z.string().min(1).max(100),
})

export const DELETE = async (request: Request) => {
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

  const dbUser = await db.user.findFirst({ where: { id: user.id }, include: { projectRoles: true } })
  if (!dbUser) return Response.json({ message: 'User not found in database' }, { status: 400 })

  const project = await db.project.findFirst({ where: { id: body.projectId }, include: { owner: true } })
  if (!project) return Response.json({ message: 'Project not found' }, { status: 400 })

  if (project.owner.id === body.memberId) return Response.json({ message: 'You are not allowed to remove the owner' }, { status: 400 })
  if (!hasPermissionInRoles(dbUser.projectRoles.filter(role => role.projectId === project.id), RolePermissions.DELETE_MEMBER) && project.owner.id !== user.id) return Response.json({ message: 'You don\'t have permission to remove members' }, { status: 400 })

  await db.project.update({ where: { id: body.projectId }, data: { members: { deleteMany: { id: body.memberId } } } })

  return Response.json({ message: 'Success' }, { status: 200 })
}