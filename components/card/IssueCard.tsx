import { Issue } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { FaMessage } from 'react-icons/fa6'
import IssueStatusIcon from '../ui/IssueStatusIcon'

const IssueCard = ({ issue, owner, messages }: { issue: Issue, owner: string | null, messages: number }) => {
  return (
    <Link href={'/project/' + issue.projectId + '/issues/' + issue.id} className='flex justify-between items-center px-4 py-3 border-b last:border-b-0 border-neutral-200 dark:border-neutral-700
      even:bg-neutral-50 dark:even:bg-neutral-950/50 last:rounded-b-xl
    '>
      <div className='flex gap-2 items-center'>
        <IssueStatusIcon opened={ issue.opened } size={ 16 } />
        <h1 className='text-xl'>{ issue.title } <span className='text-sm opacity-50'>by { owner }</span></h1>
      </div>
      <div className='flex gap-2 items-center'>
        <FaMessage size={ 16 } />
        <p>{ messages }</p>
      </div>
    </Link>
  )
}

export default IssueCard