// src/App.jsx

import React from 'react';
import { ChakraProvider, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import invalid from '../../assets/invalid.svg';
import { Link } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <ChakraProvider>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <img src={invalid} className="w-24 h-24 mb-4" alt="Account Created" />
      <Heading size="md" className="mb-2">Invalid or Expired Token</Heading>
      <Text className="mb-4">The token you used is invalid or has expired. Please try again.</Text>
      <Link to="/co2">
        <Button colorScheme="blue" onClick={() => navigate('/login')}>
          Try Again
        </Button>
      </Link>
    </div>
  </ChakraProvider>
  );
}

export default App;
