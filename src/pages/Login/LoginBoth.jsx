// LoginBoth.jsx
import React from 'react';
import { Box, Button, Text, VStack, useColorModeValue, Link } from '@chakra-ui/react';
import logo from '../../assets/devsign.png';


const LoginBoth = () => {
  return (
    <>
    <center> 
    <Box mt={40}>
    <img src={logo} height={200} width={200} alt={'DevInsightLOGO'} />
    </Box>
    </center>
    <Box className="min-h-screen flex items-center justify-center "mt={-40} >
   
  <Box className="flex w-full max-w-6xl">
  
    {/* Left side - Companies */}
    <Box
      className="flex-1 flex flex-col justify-center items-center p-10"
      bg={useColorModeValue('gray.100', 'gray.700')}
    >
      <Text fontSize="2xl" fontWeight="bold">
        For <Text as="span" className="text-green-600">Companies</Text>
      </Text>
      <Text mt={2} textAlign="center">
        We are the market-leading technical interview platform to identify and hire developers with the right skills.
      </Text>
      <Link href="/login-manager">
        <Button colorScheme="green" variant="solid" mt={4}>Login</Button>
      </Link>
      <Text mt={2}>
        Don't have an account? <Link href="/co2" className="text-blue-500">Get Account</Link> or <Link href="/#contact-us" className="text-blue-500">Contact Us</Link>.
      </Text>
    </Box>

    {/* Right side - Developers */}
    <Box
      className="flex-1 flex flex-col justify-center items-center p-10 bg-white"
      bg={useColorModeValue('gray.50', 'gray.700')}
    >
      <Text fontSize="2xl" fontWeight="bold">
        For <Text as="span" className="text-blue-600">Developers</Text>
      </Text>
      <Text mt={2} textAlign="center">
        Join over 21 million developers, practice coding skills, prepare for interviews, and get hired.
      </Text>
      <Link href="/login-developer">
        <Button colorScheme="blue" variant="solid"  mt={4}>Login</Button>
      </Link>
      <Text mt={2}>
        Don't have an account? <Link href="/verify-email" className="text-blue-500"> <Text as="span" className="text-blue-600">Sign up</Text></Link>
      </Text>
    </Box>
  </Box>
</Box>
</>
  );
};

export default LoginBoth;
