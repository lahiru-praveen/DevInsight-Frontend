import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { Box, Button,Text, Heading,Flex, useColorModeValue,Spacer } from '@chakra-ui/react';
import logo from '../../assets/devsign.png';
import image from '../../assets/face.png';

const RegisterFace = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const webcamRef = React.useRef(null);

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
         <Box mt={50} pl={-10} position="relative" zIndex="1">
        <img src={logo} height={200} width={200} alt="DevInsightLOGO" />
      </Box>

      <Box position="relative" zIndex="0">
        <img src={image} height={500} width={500}  />
      </Box>
       

      </Box>

      {/* Right Box */}
      <Box flex={1} align="center" justify="center" bg={useColorModeValue('gray.100')} >
      
        <Box
          p={6}
          rounded="lg"
          mt={40}
          maxWidth="600px"
          width="100%"
          textAlign="left"
          position="relative"
        >
          <center><Text fontSize="3xl" fontWeight="bold" mb={10}>Register Face</Text></center>
          
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
            justifyContent="center"
            mt="4"
            bottom="-20px"
            zIndex={1}
          >
            <Button onClick={capture} colorScheme="blue" variant="outline"  size="md" width="45%">Register</Button>
            
          </Flex>
          <Box align="center" justify="center">
          {typeof message === 'string' ? (
            <Heading mt="4" size="md" color={message.startsWith('Error') ? 'red.500' : 'green.500'}>{message}</Heading>
          ) : (
            <Text mt="4" color="red.500">Error: Unexpected response format</Text>
          )}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default RegisterFace;
