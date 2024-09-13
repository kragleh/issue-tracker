import { ProjectRole } from '@prisma/client'
import React from 'react'

const RoleBadge = ({ role, scale }: { role: ProjectRole, scale?: number }) => {
  return (
    <h1 className='text-xs px-1 rounded border' style={{ scale: scale, borderColor: '#' + role.color + '77', backgroundColor: '#' + role.color + '22' }}>
      { role.name }
    </h1>
  )
}

export default RoleBadge