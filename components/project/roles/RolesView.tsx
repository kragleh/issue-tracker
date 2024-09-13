"use client"
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { ProjectRole } from '@prisma/client'
import React, { useEffect } from 'react'
import RoleCard from './RoleCard'

const RolesView = ({ roles, moderator }: { roles: ProjectRole[], moderator: boolean }) => {
  const ammount = 10
  const [page, setPage] = React.useState(1)
  const [filtered, setFiltered] = React.useState<ProjectRole[]>(roles)
  const [pageButtons, setPageButtons] = React.useState<JSX.Element[]>([])

  const filterLatest = () => {
    setFiltered([...roles].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    setPage(1)
  }

  const filterOldest = () => {
    setFiltered([...roles].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
    setPage(1)
  }

  useEffect(() => {
    const newPages = Math.ceil(filtered.length / ammount)
  
    if (newPages > 1) {
      const buttonBuffer: JSX.Element[] = []
      for (let i = 1; i <= newPages; i++) {
        buttonBuffer.push(
          <Button key={i} onClick={() => setPage(i)} className='px-2'>
            {i}
          </Button>
        )
      }
      setPageButtons(buttonBuffer)
    } else {
      setPageButtons([])
    }
  }, [filtered])

  const startIndex = (page - 1) * ammount
  const endIndex = startIndex + ammount
  const paginatedRoles = filtered.slice(startIndex, endIndex)

  return (
    <Card>
      <div className='p-3 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center'>
        <div className='flex gap-2'>
          <Button onClick={ filterLatest } className='px-2'>
            Latest
          </Button>
          <Button onClick={ filterOldest } className='px-2'>
            Oldest
          </Button>
        </div> 
        <div className='flex gap-2'>
          { pageButtons }
        </div>
      </div>
      {
        paginatedRoles.length > 0 ?
        paginatedRoles.map((role) => (
          <RoleCard key={role.id} role={ role } moderator={ moderator } />
        ))
        :
        <>
          <div className='text-center p-4'>
            <h1 className='text-xl'>Welcome to roles!</h1>
            <p className='text-neutral-700 dark:text-neutral-300'>Here you can find all the roles for your project.</p>
          </div>
        </>
      }
    </Card>
  )
}

export default RolesView