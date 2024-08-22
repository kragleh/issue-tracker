import React from 'react'
import SidebarGroup from './SidebarGroup'
import SidebarButton from './SidebarButton'
import { BsGraphUp, BsPeopleFill } from 'react-icons/bs'

const AdminSidebarMenu = () => {
  return (
    <SidebarGroup title='Admin'>
      <SidebarButton icon={ <BsPeopleFill size={ 24 } /> } title='Users' href='/admin/users' />
      <SidebarButton icon={ <BsGraphUp size={ 24 } /> } title='Stats' href='/admin/stats' />
    </SidebarGroup>
  )
}

export default AdminSidebarMenu