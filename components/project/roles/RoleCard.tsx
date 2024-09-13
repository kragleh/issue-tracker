import LinkButton, { LinkButtonVariant } from '@/components/ui/LinkButton'
import RoleBadge from '@/components/ui/RoleBadge'
import { ProjectRole } from '@prisma/client'
import React from 'react'

const RoleCard = ({ role, moderator }: { role: ProjectRole, moderator: boolean }) => {
  return (
    <section className='flex justify-between items-center px-4 py-3 border-b last:border-b-0 border-neutral-200 dark:border-neutral-700 even:bg-neutral-50 dark:even:bg-neutral-950/50 last:rounded-b-xl'>
      <div className='flex gap-2 items-center'>
        <RoleBadge role={ role } />
      </div>
      <div className='flex gap-2 items-center'>
        {
          moderator ?
          <>
            <LinkButton href={'/project/' + role.projectId + '/roles/' + role.id + '/edit'} variant={ LinkButtonVariant.WARNING } className='px-2'>
              Edit
            </LinkButton>
            <LinkButton href={'/project/' + role.projectId + '/roles/' + role.id + '/delete'} variant={ LinkButtonVariant.DANGER } className='px-2'>
              Delete
            </LinkButton>
          </>
          :
          <></>
        }
      </div>
    </section>
  )
}

export default RoleCard