import React from 'react';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Box, Text, Input, Button, VStack } from "@chakra-ui/react";

const Chatbot = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>ChatBot</DrawerHeader>
        <DrawerBody>
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
                      style={{display: 'flex', justifyContent: msg.role === 'user' ? 'end' : 'start'}}
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
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Chatbot;