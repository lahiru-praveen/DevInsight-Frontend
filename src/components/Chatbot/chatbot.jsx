import React, { useState } from 'react';
import { Box, Input, Button, Text, VStack, Container } from "@chakra-ui/react";
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
      <VStack spacing={4} w="100%">
        <Box
          w="100%"
          bg="gray.100"
          p={4}
          borderRadius="md"
          boxShadow="md"
          maxH="500px"
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
