// src/App.jsx

import React from 'react';
import { ChakraProvider, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Acc from '../../assets/Acc.svg';
import { Link } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <ChakraProvider>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <img src={Acc} className="w-24 h-24 mb-4" alt="Account Created" />
      <Heading size="md" className="mb-2">Email Verified Successfully</Heading>
      <Text className="mb-4">Your email has been verified. You can now log in.</Text>
      <Link to="/login-manager">
        <Button colorScheme="blue" onClick={() => navigate('/login-manager')}>
          Go to Login
        </Button>
      </Link>
    </div>
  </ChakraProvider>
  );
}

export default App;
