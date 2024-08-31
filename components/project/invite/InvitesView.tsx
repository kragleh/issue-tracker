"use client"
import { ProjectInvite } from '@prisma/client'
import React, { useEffect } from 'react'
import Card from '../../ui/Card'
import Button from '../../ui/Button'
import InviteCard from './InviteCard'

const InvitesView = ({ invites }: { invites: ProjectInvite[] }) => {
  const ammount = 10
  const [page, setPage] = React.useState(1)
  const [filtered, setFiltered] = React.useState<ProjectInvite[]>(invites)
  const [pageButtons, setPageButtons] = React.useState<JSX.Element[]>([])

  const filterUsable = () => {
    setFiltered(invites.filter(invite => invite.uses > 0))
    setPage(1)
  }

  const filterUsed = () => {
    setFiltered(invites.filter(invite => invite.uses === 0))
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
  const paginatedInvites = filtered.slice(startIndex, endIndex)

  return (
    <Card>
      <div className='p-3 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center'>
        <div className='flex gap-2'>
          <Button onClick={ filterUsable } className='px-2'>
            Usable
          </Button>
          <Button onClick={ filterUsed } className='px-2'>
            Used
          </Button>
        </div> 
        <div className='flex gap-2'>
          { pageButtons }
        </div>
      </div>
      {
        paginatedInvites.length > 0 ?
        paginatedInvites.map((invite) => (
          <InviteCard key={ invite.id } invite={ invite } />
        ))
        :
        <>
          <div className='text-center p-4'>
            <h1 className='text-xl'>Welcome to invites!</h1>
            <p className='text-neutral-700 dark:text-neutral-300'>Here you can find all the invites related to your project.</p>
          </div>
        </>
      }
    </Card>
  )
}

export default InvitesView