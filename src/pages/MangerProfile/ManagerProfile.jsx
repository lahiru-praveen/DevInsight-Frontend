import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

import UserProfile from '../../components/ManagerProfile/UserProfile.jsx'
import OrgProfile from '../../components/ManagerProfile/OrgProfile.jsx'

export default function ManagerProfile() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white space-y-8">
      <div className="absolute top-4 left-4">
        <Link to="/ms">
          <Button colorScheme="blue">Back</Button>
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-8">
        <UserProfile />
        <OrgProfile />
      </div>
    </div>
  )
}
