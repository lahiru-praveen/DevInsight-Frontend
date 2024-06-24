import { Tabs, TabList, Tab } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import Devinsight from '../../assets/Devinsight.png';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between py-4 px-4 md:px-10 fixed top-0 w-full z-50 bg-white shadow-md'>
      <div className='flex items-center mb-4 md:mb-0'>
        <img src={Devinsight} className="w-24 h-auto md:w-32 md:h-auto" alt="Pic" />
      </div>

      <div className='flex justify-center w-full md:w-auto'>
        <Tabs variant='soft-rounded' colorScheme='blue'>
          <TabList className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-8">
          <Tab as="a" href="#home">Home</Tab>
            <Tab as="a" href="#about-us">About Us</Tab>
            <Link to="/cu">
            <Tab>Contact Us</Tab>
            </Link>
          </TabList>
        </Tabs>
      </div>

      <div className='flex items-center space-x-4'>
        <Link to ="/verify-email">
        <Button colorScheme='blue' variant='solid' size="sm">
          Sign Up
        </Button>
        </Link>
        <Link to ="/login-both">
        <Button colorScheme='blue' variant='outline' size="sm">
          Log In
        </Button>
        </Link>
      </div>
    </div>
  );
};
