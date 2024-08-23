import React from 'react'
import SidebarGroup from '../SidebarGroup'
import SidebarButton from '../SidebarButton'
import { FaHome } from 'react-icons/fa'
import { MdChecklist } from 'react-icons/md'

const MenuSiderbarGroup = () => {
  return (
    <SidebarGroup title='Menu'>
      <SidebarButton icon={ <FaHome size={ 24 } /> } title='Home' href='/' />
      <SidebarButton icon={ <MdChecklist size={ 24 } /> } title='Issues' href='/issues' />
    </SidebarGroup>
  )
}

export default MenuSiderbarGroup