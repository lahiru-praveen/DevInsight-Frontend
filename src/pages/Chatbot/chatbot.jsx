// import React from 'react';
// import Chatbot from '../../components/Chatbot/chatbot.jsx'// Adjust the path as necessary
// import { ChakraProvider } from "@chakra-ui/react";

// export default function App() {
//   return (
//     <ChakraProvider>
//       <div className="App">
        
//         <Chatbot />
        
//       </div>
//     </ChakraProvider>
//   );
// }

// import React, { useState } from 'react';
// import { Box, Input, Button, Text, VStack, Container, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Spinner } from "@chakra-ui/react";
// import axios from 'axios';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// const Chatbot = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const btnRef = React.useRef();

//   const handleSendMessage = async () => {
//     const userMessage = { role: "user", content: input };
//     setMessages([...messages, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/chat', { message: input });
//       const botMessage = { role: "bot", content: response.data.reply };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     } catch (error) {
//       console.error("Error sending message: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderMessageContent = (content) => {
//     const codeBlockPattern = /```([\s\S]*?)```/g;
//     const boldPattern = /\*\*(.*?)\*\*/g;
//     const parts = content.split(codeBlockPattern);

//     return parts.map((part, index) => {
//       if (index % 2 === 1) {
//         return (
//           <SyntaxHighlighter key={index} language="javascript" style={docco}>
//             {part.trim()}
//           </SyntaxHighlighter>
//         );
//       }

//       const subParts = part.split(boldPattern);
//       return subParts.map((subPart, subIndex) => {
//         if (subIndex % 2 === 1) {
//           return <b key={subIndex}>{subPart}</b>;
//         }
//         return <span key={subIndex}>{subPart}</span>;
//       });
//     });
//   };

//   return (
//     <Container centerContent>
//       <Button ref={btnRef} colorScheme="teal" onClick={onOpen} mb={4}>
//         Open Chatbot
//       </Button>
//       <Drawer
//         isOpen={isOpen}
//         placement="right"
//         onClose={onClose}
//         finalFocusRef={btnRef}
//         size="xl"
//       >
//         <DrawerOverlay />
//         <DrawerContent height="100vh">
//           <DrawerCloseButton />
//           <DrawerHeader>Chatbot</DrawerHeader>

//           <DrawerBody display="flex" flexDirection="column">
//             <VStack spacing={4} w="100%" flex="1" overflowY="auto">
//               <Box
//                 w="100%"
//                 bg="gray.100"
//                 p={4}
//                 borderRadius="md"
//                 boxShadow="md"
//                 flex="1"
//                 overflowY="auto"
//               >
//                 <VStack align="start" spacing={3}>
//                   {messages.map((msg, index) => (
//                     <Box
//                       key={index}
//                       alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
//                       w="100%"
//                     >
//                       <Text
//                         bg={msg.role === 'user' ? 'blue.200' : 'green.200'}
//                         borderRadius="md"
//                         p={2}
//                         maxW="80%"
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
//           </DrawerBody>
//         </DrawerContent>
//       </Drawer>
//     </Container>
//   );
// }

// export default Chatbot;

import React, { useState } from 'react';
import { Box, Input, Button, Text, VStack, Container, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Spinner } from "@chakra-ui/react";
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Chatbot = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const btnRef = React.useRef();

  // Generate a unique user ID (for simplicity, use a random string here)
  const user_id = 'user-' + Math.random().toString(36).substr(2, 9);

  const handleSendMessage = async () => {
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chat', { message: input, user_id });
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
    <Container centerContent>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} mb={4}>
        Open Chatbot
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent height="100vh">
          <DrawerCloseButton />
          <DrawerHeader>Chatbot</DrawerHeader>

          <DrawerBody display="flex" flexDirection="column">
            <VStack spacing={4} w="100%" flex="1" overflowY="auto">
              <Box
                w="100%"
                bg="gray.100"
                p={4}
                borderRadius="md"
                boxShadow="md"
                flex="1"
                overflowY="auto"
              >
                <VStack align="start" spacing={3}>
                  {messages.map((msg, index) => (
                    <Box
                      key={index}
                      alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                      w="100%"
                    >
                      <Text
                        bg={msg.role === 'user' ? 'blue.200' : 'green.200'}
                        borderRadius="md"
                        p={2}
                        maxW="80%"
                        whiteSpace="pre-wrap"
                        wordBreak="break-word"
                      >
                        {msg.role === 'user' ? <b>User: </b> : <b>Bot: </b>}
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
                <Button onClick={handleSendMessage} colorScheme="blue" isLoading={loading} loadingText="Sending">Send</Button>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

export default Chatbot;
