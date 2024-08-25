import { Issue } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { FaMessage } from 'react-icons/fa6'
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go'

const IssueCard = ({ issue, owner, messages }: { issue: Issue, owner: string | null, messages: number }) => {
  return (
    <Link href={'/project/' + issue.projectId + '/issues/' + issue.id} className='flex justify-between items-center px-4 py-3 border-b last:border-b-0 border-neutral-200 dark:border-neutral-700'>
      <div className='flex gap-2 items-center'>
        {
          issue.opened ?
          <GoIssueOpened size={ 16 } className='text-green-500' />
          :
          <GoIssueClosed size={ 16 } className='text-red-500' />
        }
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