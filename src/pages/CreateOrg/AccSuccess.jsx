// src/App.jsx

import React from 'react';
import { ChakraProvider, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Acc from '../../assets/Acc.svg';
import { Link } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  return (
    <ChakraProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <img src={Acc} className="w-32 h-32 mb-6" alt="Account Created" />
        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Organization Account Has Been Completely Created
        </h1>
        <Link to ="/si">
        <Button colorScheme="blue" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
        </Link>
      </div>
    </ChakraProvider>
  );
}

export default App;
