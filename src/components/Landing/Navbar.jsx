import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Button} from '@chakra-ui/react'
import  Devinsight  from '../../assets/Devinsight.png';

export const Navbar = () => {
  return (
<div className='flex justify-between py-10 px-10'>
            
  <div className='flex justify-start '>
      <img src={Devinsight} className="w-40 h-10"  alt={"Pic"}/>
  </div>

  <div className='flex justify-center'>
  
  <Tabs variant='soft-rounded' colorScheme='blue'>
  <TabList className="flex space-x-4">
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
  </Tabs>
  </div>
  <div  className='flex justify-end space-x-4'>
  <Button colorScheme='blue' variant='solid'>
    Sign In
  </Button>
  <Button colorScheme='blue' variant='outline'>
    Log In
  </Button>
  </div>

</div>

  )

}
