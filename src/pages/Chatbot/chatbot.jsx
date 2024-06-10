import React from 'react';
import Chatbot from '../../components/Chatbot/chatbot.jsx'// Adjust the path as necessary
import { ChakraProvider } from "@chakra-ui/react";

export default function App() {
  return (
    <ChakraProvider>
      <div className="App">
        
        <Chatbot />
        
      </div>
    </ChakraProvider>
  );
}