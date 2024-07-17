import React from 'react';
import { ChakraProvider, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Error from '../../assets/error.svg';
import { Link } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <ChakraProvider>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <img src={Error} className="w-36 h-36 mb-6" alt="Account blocked" />
      <Heading size="md" className="mb-2">Account is Blocked</Heading>
      <Text className="mb-4">Account is is blocked by organization.Try contact the admin</Text>
      <Link to="/login-both">
        <Button colorScheme="blue" onClick={() => navigate('/login-manager')}>
          Back to Login
        </Button>
      </Link>
    </div>
  </ChakraProvider>
  );
}

export default App;
