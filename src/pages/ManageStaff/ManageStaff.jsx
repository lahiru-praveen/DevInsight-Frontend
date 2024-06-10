import React from 'react'
import {InviteTable} from '../../components/ManageStaff/InviteTable'
import MyComponent from '../../components/ManageStaff/AccountList'
import ManagerNavBar from '../../components/ManageStaff/ManagerNavBar'

function ManageStaff() {
  return (
    <div className='flex-col justify-between'>
      <ManagerNavBar/>

    <div className='h-1/3'>
  
      <InviteTable/>
      </div>
    <div className=''>
      <MyComponent/>
      
      </div>  
    
    </div>

      )
    }

export default ManageStaff