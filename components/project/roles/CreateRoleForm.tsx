"use client"
import Button, { ButtonVariant } from '@/components/ui/Button'
import NumberInput from '@/components/ui/NumberInput'
import TextInput from '@/components/ui/TextInput'
import { RolePermissions } from '@/lib/RolePermissions'
import React from 'react'
import RolePermissionCheckbox from './RolePermissionCheckbox'

const CreateRoleForm = ({ projectId }: { projectId: string }) => {
  const [name, setName] = React.useState('')
  const [color, setColor] = React.useState('')
  const [weight, setWeight] = React.useState(0)
  const [permissions, setPermissions] = React.useState<RolePermissions[]>([])
  const [done, setDone] = React.useState(false)
  const [error, setError] = React.useState<undefined | string>(undefined)

  const handleSave = async () => {
    try {
      const response = await fetch('/api/project/roles/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          projectId,
          name,
          color,
          weight,
          permissions
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(JSON.parse(errorData.message)[0].message || 'Failed to save title')
      }

      setDone(true)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <section className='flex flex-col gap-2'>
      { error ? <p className='
        bg-red-100 dark:bg-red-900 
        border border-red-300 dark:border-red-700 
        px-2 py-1 rounded text-center
        w-full
        h-screen md:h-auto
      '>{ error }</p> : <></> }
      <h1>Name</h1>
      <TextInput id='name' placeholder={ 'Member' } onChange={ content => setName(content) } />
      <h1>Color</h1>
      <input type='color' id='color' className='w-10 h-10 rounded' onChange={ content => setColor(content.target.value.replace('#', '')) } />
      <h1>Weight</h1>
      <NumberInput id='weight' onChange={ content => setWeight(content) } />
      <h1>Permissions</h1>
      <div className='grid grid-cols-3 gap-2'>
        <RolePermissionCheckbox title='View Issues' enumm={ RolePermissions.VIEW_ISSUES } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='View Members' enumm={ RolePermissions.VIEW_MEMBERS } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='View Roles' enumm={ RolePermissions.VIEW_ROLES } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='View Invites' enumm={ RolePermissions.VIEW_INVITES } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Create Issues' enumm={ RolePermissions.CREATE_ISSUE } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Create Invites' enumm={ RolePermissions.CREATE_INVITE } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Create Roles' enumm={ RolePermissions.CREATE_ROLE } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Delete Issues' enumm={ RolePermissions.DELETE_ISSUE } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Delete Invites' enumm={ RolePermissions.DELETE_INVITE } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Delete Roles' enumm={ RolePermissions.DELETE_ROLE } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Delete Members' enumm={ RolePermissions.DELETE_MEMBER } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Edit Issues' enumm={ RolePermissions.EDIT_ISSUE } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Edit Members' enumm={ RolePermissions.EDIT_MEMBER } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Edit Roles' enumm={ RolePermissions.EDIT_ROLE } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Edit Settings' enumm={ RolePermissions.EDIT_SETTINGS } permissions={ permissions } setPermissions={ setPermissions } />
        <RolePermissionCheckbox title='Ban Members' enumm={ RolePermissions.BAN_MEMBER } permissions={ permissions } setPermissions={ setPermissions } />
      </div>
      <Button onClick={ handleSave } variant={ ButtonVariant.SUCCESS } className='px-2' disabled={ done }>
        { done ? 'Saved' : 'Save' }
      </Button>
    </section>
  )
}

export default CreateRoleForm