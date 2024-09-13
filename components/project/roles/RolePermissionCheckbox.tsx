import { RolePermissions } from '@/lib/RolePermissions'
import React from 'react'

const RolePermissionCheckbox = ({ title, enumm, permissions, setPermissions }: { title: string, enumm: RolePermissions, permissions: RolePermissions[], setPermissions: (permissions: RolePermissions[]) => void }) => {
  return (
    <div className='flex gap-2'>
      <input type="checkbox" onChange={ 
        content => setPermissions(permissions.includes(enumm) ? permissions.filter(item => item !== enumm) : [...permissions, enumm])
      } /><h1>{ title }</h1>
    </div>
  )
}

export default RolePermissionCheckbox