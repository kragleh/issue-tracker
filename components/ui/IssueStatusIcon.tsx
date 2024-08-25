import React from 'react'
import { GoIssueClosed, GoIssueOpened } from 'react-icons/go'

const IssueStatusIcon = ({ opened, size }: { opened: boolean, size: number }) => {
  if (opened) return ( <GoIssueOpened size={ size } className='text-green-500' /> )
  return ( <GoIssueClosed size={ size } className='text-red-500' /> )
}

export default IssueStatusIcon