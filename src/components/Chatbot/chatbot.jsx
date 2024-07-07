// import React from 'react';
// import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Box, Text, Input, Button, VStack } from "@chakra-ui/react";

// const Chatbot = ({ isOpen, onClose }) => {
//   return (
//     <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
//       <DrawerOverlay />
//       <DrawerContent>
//         <DrawerCloseButton />
//         <DrawerHeader>ChatBot</DrawerHeader>
//         <DrawerBody>
//         <VStack spacing={4} w="100%" flex="1" overflowY="auto">
//               <Box
//                 w="100%"
//                 bg="white"
//                 p={4}
//                 borderRadius="md"
                
//                 flex="1"
//                 overflowY="auto"
//                 border="1px"
//                 borderColor="gray.100"
//               >
//                 <VStack spacing={3}>
//                   {messages.map((msg, index) => (
//                     <Box
//                       key={index}
//                       style={{display: 'flex', justifyContent: msg.role === 'user' ? 'end' : 'start'}}
//                       w="100%"
//                     >
//                       <Text
//                         bg={msg.role === 'user' ? 'gray.100' : 'white'}
//                         borderRadius="md"
//                         p={2}
//                         maxW={msg.role === 'user' ? '90%' : '100%'}
//                         whiteSpace="pre-wrap"
//                         wordBreak="break-word"
//                       >
//                         {msg.role === 'user' ? <b>User: </b> : <b>Bot: </b>}
//                         {renderMessageContent(msg.content)}
//                       </Text>
//                     </Box>
//                   ))}
//                   {loading && <Spinner size="xl" />}
//                 </VStack>
//               </Box>
//               <Box w="100%" display="flex" mt={2}>
//                 <Input
//                   placeholder="Type your message..."
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   mr={2}
//                   disabled={loading}
//                 />
//                 <Button onClick={handleSendMessage} colorScheme="blue" isLoading={loading} loadingText="Sending">Send</Button>
//               </Box>
//             </VStack>
//         </DrawerBody>
//         <DrawerFooter>
//           <Button variant="outline" mr={3} onClick={onClose}>
//             Close
//           </Button>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// };

// export default Chatbot;


import { useState } from 'react';
import {
  Box, Input, Button, Text, VStack, Container, Drawer, DrawerBody,
  DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,
  DrawerCloseButton, useDisclosure, Spinner
} from "@chakra-ui/react";
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Generate a unique user ID (for simplicity, use a random string here)
  const user_id = 'user-' + Math.random().toString(36).substr(2, 9);

  const handleSendMessage = async () => {
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/chat', { message: input, user_id });
      const botMessage = { role: "bot", content: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message: ", error);
    } finally {
      setLoading(false);
    }
  };

  const renderMessageContent = (content) => {
    const codeBlockPattern = /```([\s\S]*?)```/g;
    const boldPattern = /\*\*(.*?)\*\*/g;
    const parts = content.split(codeBlockPattern);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <SyntaxHighlighter key={index} language="javascript" style={docco}>
            {part.trim()}
          </SyntaxHighlighter>
        );
      }

      const subParts = part.split(boldPattern);
      return subParts.map((subPart, subIndex) => {
        if (subIndex % 2 === 1) {
          return <b key={subIndex}>{subPart}</b>;
        }
        return <span key={subIndex}>{subPart}</span>;
      });
    });
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent height="100vh">
        <DrawerCloseButton />
        <DrawerHeader>Chatbot</DrawerHeader>

        <DrawerBody display="flex" flexDirection="column">
          <VStack spacing={4} w="100%" flex="1" overflowY="auto">
            <Box
              w="100%"
              bg="white"
              p={4}
              borderRadius="md"
              flex="1"
              overflowY="auto"
              border="1px"
              borderColor="gray.100"
            >
              <VStack spacing={3}>
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'end' : 'start' }}
                    w="100%"
                  >
                    <Text
                      bg={msg.role === 'user' ? 'gray.100' : 'white'}
                      borderRadius="md"
                      p={2}
                      maxW={msg.role === 'user' ? '90%' : '100%'}
                      whiteSpace="pre-wrap"
                      wordBreak="break-word"
                    >
                      {/* {msg.role === 'user' ? <b>User: </b> : <b>Bot: </b>} */}
                      {renderMessageContent(msg.content)}
                    </Text>
                  </Box>
                ))}
                {loading && <Spinner size="xl" />}
              </VStack>
            </Box>
            <Box w="100%" display="flex" mt={2}>
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                mr={2}
                disabled={loading}
              />
              <Button onClick={handleSendMessage} colorScheme="blue" isLoading={loading} loadingText="Sending">
                Send
              </Button>
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Chatbot;
