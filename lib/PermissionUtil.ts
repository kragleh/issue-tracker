import { ProjectRole, RolePermission } from "@prisma/client";

export function hasPermissionInRoles(projectId: string, permission: RolePermission, roles: ProjectRole[]) {
  const filtered = roles.filter(role => role.projectId === projectId)
  if (filtered.length === 0) return false
  
  return filtered.some(role => role.permission === permission)
}