import React, { useState } from 'react';
import { Box, Input, Button, Text, VStack, Code, Container } from "@chakra-ui/react";
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/chat', { message: input });
      const botMessage = { role: "bot", content: response.data.reply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error sending message: ", error);
    }
    setInput('');
  };

  return (
    <Container centerContent>
      <VStack spacing={4} w="100%">
        <Box w="100%" bg="gray.100" p={4} borderRadius="md" boxShadow="md">
          <VStack align="start">
            {messages.map((msg, index) => (
              <Box key={index} alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'}>
                <Text
                  bg={msg.role === 'user' ? 'blue.200' : 'green.200'}
                  borderRadius="md"
                  p={2}
                  maxW="80%"
                >
                  {msg.role === 'user' ? <Text as="b">User: </Text> : <Text as="b">Bot: </Text>}
                  <Code whiteSpace="pre-wrap">{msg.content}</Code>
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
        <Box w="100%" display="flex" mt={2}>
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            mr={2}
          />
          <Button onClick={handleSendMessage} colorScheme="blue">Send</Button>
        </Box>
      </VStack>
    </Container>
  );
}

export default Chatbot;