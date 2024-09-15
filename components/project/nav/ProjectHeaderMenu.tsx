import LinkButton from '@/components/ui/LinkButton'
import { hasPermissionInRoles } from '@/lib/PermissionUtil'
import { Project, ProjectRole, RolePermission } from '@prisma/client'
import { User as UserDB } from '@prisma/client'
import { User } from 'next-auth'
import React from 'react'

interface UserWRoles extends UserDB {
  projectRoles: ProjectRole[]
}

interface ProjectWOwner extends Project {
  owner: UserDB
}

const ProjectHeaderMenu = ({ project, user, dbUser }: { project: ProjectWOwner, user: User, dbUser: UserWRoles }) => {
  return (
    <div className='flex items-center gap-2'>
      {
        hasPermissionInRoles(project.id, RolePermission.MEMBER, dbUser.projectRoles)
        ||
        project.owner.id === user.id
        ?
        <LinkButton href={'/project/' + project.id + '/issues'}>
          Issues
        </LinkButton>
        :
        <></>
      }
      {
        hasPermissionInRoles(project.id, RolePermission.MODERATOR, dbUser.projectRoles)
        ||
        hasPermissionInRoles(project.id, RolePermission.ADMIN, dbUser.projectRoles)
        ||
        project.owner.id === user.id
        ?
        <LinkButton href={'/project/' + project.id + '/members'}>
          Members
        </LinkButton>
        :
        <></>
      }
      {
        hasPermissionInRoles(project.id, RolePermission.ADMIN, dbUser.projectRoles)
        ||
        project.owner.id === user.id
        ?
        <LinkButton href={'/project/' + project.id + '/roles'}>
          Roles
        </LinkButton>
        :
        <></>
      }
      {
        hasPermissionInRoles(project.id, RolePermission.ADMIN, dbUser.projectRoles)
        ||
        project.owner.id === user.id
        ?
        <LinkButton href={'/project/' + project.id + '/invites'}>
          Invites
        </LinkButton>
        :
        <></>
      }
      {
        hasPermissionInRoles(project.id, RolePermission.ADMIN, dbUser.projectRoles)
        ||
        project.owner.id === user.id
        ?
        <LinkButton href={'/project/' + project.id + '/settings'}>
          Settings
        </LinkButton>
        :
        <></>
      }
    </div>
  )
}

export default ProjectHeaderMenu