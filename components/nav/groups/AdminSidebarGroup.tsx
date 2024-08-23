import React from 'react'
import SidebarGroup from '../SidebarGroup'
import SidebarButton from '../SidebarButton'
import { BsPeopleFill } from 'react-icons/bs'
import { MdDashboard } from 'react-icons/md'
import { FaProjectDiagram } from 'react-icons/fa'

const AdminSidebarGroup = () => {
  return (
    <SidebarGroup title='Admin'>
      <SidebarButton icon={ <MdDashboard size={ 24 } /> } title='Dashboard' href='/admin' />
      <SidebarButton icon={ <BsPeopleFill size={ 24 } /> } title='Users' href='/admin/users' />
      <SidebarButton icon={ <FaProjectDiagram size={ 24 } /> } title='Projects' href='/admin/projects' />
    </SidebarGroup>
  )
}

export default AdminSidebarGroup