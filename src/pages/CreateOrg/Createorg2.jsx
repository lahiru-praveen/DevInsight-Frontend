import React from 'react'
import  Devinsight  from '../../assets/Devinsight.png';
import  { Input }  from '@chakra-ui/react'
import  { Stack }  from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';



function Createorg2() {
  return (
    <div className='mx-auto  w-1/3  bg-white py-24'>
      
      <div className='flex flex-col space-y-40 h-full justify-between'>
      
      <div className='flex justify-center items-center'>
            <img src={Devinsight} className="w-2/6 h-2/6" />
      </div>

      
      <div>
      <Stack spacing={4}>
      <Heading as='h3' size='lg' className='mb-5'>
       Create your account
      </Heading>
      <div className='flex space-x-3'>
      <Input placeholder='First Name' size='lg' />
      <Input placeholder='Last Name' size='lg' />
      </div>
      <Input placeholder='User Name' size='lg' />
      <Input placeholder='Email' size='lg' />
      <Input placeholder='Enter Password' size='lg' />
      <Input placeholder='Enter Password Again' size='lg' />

      </Stack>
      </div>

      

      </div>

       
       
      <div className='py-6'>
      <Button rightIcon={<ArrowForwardIcon />} colorScheme='blue' variant='solid' className='w-full'>
    Next
  </Button>
        
      </div>
            
           


       

    </div>
  )
}

export default Createorg2