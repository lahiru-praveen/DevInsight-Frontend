import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Text, Heading, Center } from '@chakra-ui/react';

function FingerprintLogin() {
  const [email, setEmail] = useState('');
  const [fingerprint, setFingerprint] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/FingerprintRegister', {
        email,
        fingerprint
      });
      setMessage(`Registered successfully: ${response.data.email}`);
    } catch (error) {
      setMessage(`Registration failed: ${error.response.data.detail}`);
    }
  };

  const captureFingerprint = async () => {
    try {
      // Assuming there's a global SDK function to capture fingerprints
      const capturedData = await window.fingerprintSDK.capture();
      setFingerprint(capturedData);
    } catch (error) {
      setMessage('Fingerprint capture failed');
    }
  };

  return (
    <Center height="100vh">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading as="h1" size="xl" mb={4}>Fingerprint Authentication</Heading>
        <Text fontSize="lg" mb={4}>Register your fingerprint for authentication.</Text>
        <Button colorScheme="teal" onClick={captureFingerprint} mb={4}>Capture Fingerprint</Button>
        <Button colorScheme="blue" onClick={handleRegister}>Register</Button>
        {message && <Text mt={4} color="red.500">{message}</Text>}
      </Box>
    </Center>
  );
}

export default FingerprintLogin;
