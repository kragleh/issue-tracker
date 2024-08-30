"use client"
import { Issue, IssueMessage, Project, User } from '@prisma/client'
import React, { useEffect } from 'react'
import Card from '../ui/Card'
import IssueCard from './IssueCard'
import Button from '../ui/Button'

type ExtendedIssue = Issue & {
  project: Project
  messages: IssueMessage[]
  owner: User
}

const IssuesView = ({ issues }: { issues: ExtendedIssue[] }) => {
  const ammount = 10
  const [page, setPage] = React.useState(1)
  const [filtered, setFiltered] = React.useState<ExtendedIssue[]>(issues)
  const [pageButtons, setPageButtons] = React.useState<JSX.Element[]>([])

  const filterOpened = () => {
    setFiltered(issues.filter(issue => issue.opened))
    setPage(1)
  }

  const filterClosed = () => {
    setFiltered(issues.filter(issue => !issue.opened))
    setPage(1)
  }

  const filterMix = () => {
    setFiltered(issues)
    setPage(1)
  }

  useEffect(() => {
    const newPages = Math.ceil(filtered.length / ammount)
  
    if (newPages > 1) {
      const buttonBuffer: JSX.Element[] = []
      for (let i = 1; i <= newPages; i++) {
        buttonBuffer.push(
          <Button key={i} onCLick={() => setPage(i)} className='px-2'>
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
  const paginatedIssues = filtered.slice(startIndex, endIndex)

  return (
    <Card>
      <div className='p-3 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center'>
        <div className='flex gap-2'>
          <Button onCLick={ filterOpened } className='px-2'>
            { issues.filter(issue => issue.opened).length } Opened
          </Button>
          <Button onCLick={ filterClosed } className='px-2'>
            { issues.filter(issue => !issue.opened).length } Closed
          </Button>
          <Button onCLick={ filterMix } className='px-2'>
            { issues.length } All
          </Button>
        </div> 
        <div className='flex gap-2'>
          { pageButtons }
        </div>
      </div>
      {
        paginatedIssues.length > 0 ?
        paginatedIssues.map((issue) => (
          <IssueCard key={issue.id} issue={ issue } owner={ issue.owner.name } messages={ issue.messages.length } />
        ))
        :
        <>
          <div className='text-center p-4'>
            <h1 className='text-xl'>Welcome to issues!</h1>
            <p className='text-neutral-700 dark:text-neutral-300'>Here you can find all the issues you have interacted with.</p>
          </div>
        </>
      }
    </Card>
  )
}

export default IssuesView