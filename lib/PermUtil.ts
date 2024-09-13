import { ProjectRole, RolePermission } from "@prisma/client"

export const hasPermissionInRoles = (roles: ProjectRole[], permission: RolePermission) => {
  let has = false

  roles.map(role => {
    if (role.permissions.includes(permission)) {
      has = true
    }
  })

  return has
}