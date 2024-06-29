import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, Text, Heading, Center,Flex,Grid,Image, useColorModeValue, } from '@chakra-ui/react';
import image from '../../assets/face.png';

const RegisterFace = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const webcamRef = React.useRef(null);
  ;
  const navigate = useNavigate();

  React.useEffect(() => {
    // Fetch email from session storage on component mount
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const file = dataURLtoFile(imageSrc, 'face.png');

    if (!email || !file) {
      setMessage('Email and face capture are required.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/register_face', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error); // Log the error for debugging
      setMessage(error.response?.data?.detail || 'An error occurred');
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleCancel = () => {
  
    navigate('/settings');
  };

  return (
    <Flex minH={'100vh'}>
      {/* Left Box */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg={useColorModeValue('white.700')}
      >
        <Heading as="h2" size="xl" mb="4">Register Face</Heading>
        <img src={image}  />
      </Box>
      {/* Right Box */}
      <Flex flex={1} align="center" justify="center" bg="white" minHeight="100vh">
        <Box
          bg="white"
          p={6}
          rounded="lg"
          
          maxWidth="600px"
          width="100%"
          textAlign="left"
          position="relative"
        >
          <Box
            className="phone-frame"
            position="relative"
            border="2px solid #ccc"
            borderRadius="20px"
            overflow="hidden"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            maxWidth="500px"
            width="100%"
            margin="0 auto"
          >
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg overflow-hidden"
              videoConstraints={{ width: 500, height: 300 }}
            />
          </Box>

          <Flex
            justifyContent="space-between"
            mt="4"
            position="absolute"
            bottom="-20px"
            left="0"
            right="0"
            zIndex="10"
            px="4"
          >
            <Button onClick={capture} colorScheme="blue" size="md" width="45%">Register</Button>
            <Button onClick={handleCancel} colorScheme="gray" size="md" width="45%">Cancel</Button>
          </Flex>

          {typeof message === 'string' ? (
            <Text mt="4" color={message.startsWith('Error') ? 'red.500' : 'green.500'}>{message}</Text>
          ) : (
            <Text mt="4" color="red.500">Error: Unexpected response format</Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export default RegisterFace;
