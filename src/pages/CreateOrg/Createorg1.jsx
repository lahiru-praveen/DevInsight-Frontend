import React from 'react'
import  Devinsight  from '../../assets/Devinsight.png';
import  { Input }  from '@chakra-ui/react'
import  { Stack }  from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';



function Createorg1() {
  return (
    <div className='mx-auto  w-1/3  bg-white py-24'>
      
      <div className='flex flex-col space-y-20 h-full justify-between'>
      
      <div className='flex justify-center items-center'>
            <img src={Devinsight} className="w-2/6 h-2/6" />
      </div>

      
      <div>
      <Stack spacing={4}>
      <Heading as='h3' size='lg' className='mb-5'>
       Create Company Account
      </Heading>
      <Input placeholder='Company Name' size='lg' />
      <Input placeholder='Company username' size='lg' />
      <Input placeholder='Company Email' size='lg' />
      <Input placeholder='Backup Email' size='lg' />
      <Input placeholder='Manager Email' size='lg' />

      </Stack>
      </div>
      
      <div className="mb-3 h-1/4 " >
      <Heading as='h3' size='md' className='mb-5'>
       Upload Company Logo
      </Heading>
        <div className="flex items-center justify-center w-full">
        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
      </div> 
      </div>

      

      </div>

       
       
      <div className='py-6'>
      <Link to="/co2">
  <Button rightIcon={<ArrowForwardIcon />} colorScheme='blue' variant='solid' className='w-full'>
    Next
  </Button>
</Link>
        
      </div>
            
           


       

    </div>
  )
}

export default Createorg1