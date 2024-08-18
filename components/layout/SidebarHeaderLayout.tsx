"use client"
import React from 'react'
import Sidebar from '../nav/Sidebar'
import Header from '../nav/Header'
import { User } from 'next-auth'

const SidebarHeaderLayout = ({ 
  children,
  sidebarContent, 
  leftHeader, 
  rightHeader,
  user
}: { 
  children: React.ReactNode,
  sidebarContent: React.ReactNode,
  leftHeader?: React.ReactNode, 
  rightHeader?: React.ReactNode,
  user: User
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <>
      <Sidebar isOpen={ isSidebarOpen } setIsOpen={ setIsSidebarOpen } content={ sidebarContent } />
      <main className='w-full min-h-screen lg:pl-72'>
        <Header user={ user } openSidebar={ setIsSidebarOpen } leftSide={ leftHeader } rightSide={ rightHeader } />
        { children }
      </main>
    </>
  )
}

export default SidebarHeaderLayout