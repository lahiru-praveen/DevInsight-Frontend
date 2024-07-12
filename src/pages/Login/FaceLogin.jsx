


import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Center, Box, Button, Text, Flex, Heading,useColorModeValue,Link } from '@chakra-ui/react';
import {  useNavigate } from 'react-router-dom';
import image from '../../assets/facelogin.gif';
import { IoArrowBackCircleSharp } from "react-icons/io5";


function LoginFace() {
  const [message, setMessage] = useState('');
  const webcamRef = React.useRef(null);
  const navigate = useNavigate();

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const file = dataURLtoFile(imageSrc, 'login_face.png');

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('http://localhost:8000/login_face', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setMessage(response.data.message);
        const { email, password, access_token } = response.data.user;
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
        sessionStorage.setItem('access_token', access_token);
        navigate('/db');
    } catch (error) {
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
   <>
     <Box p={2} >
      <Link to="/login-developer">
     <Button leftIcon={<IoArrowBackCircleSharp />} variant="ghost">
        Go Back
      </Button>
      </Link>
    </Box>
    <Box justify="center" align="center"  minHeight="100vh" mt="-20"  p={2}>
        <Flex flex={1} direction="column" align="center" bg="white">
        <Box
        
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bg={useColorModeValue('white.700')}
      >
        
        <img src={image} width="300" height="300"/>
      </Box>
            <Box position="relative" mb={4}>
            <Heading as="h2" size="xl" mt="-10">Login with Face</Heading>
            </Box>

            <Box
                className="phone-frame"
                position="relative"
                border="2px solid #ccc"
                borderRadius="20px"
                overflow="hidden"
                boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
                maxWidth="500px"
                width="100%"
                mb={4}
            >
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="rounded-lg overflow-hidden"
                    videoConstraints={{ width: 500, height: 300 }}
                />
            </Box>

            <Box position="relative" textAlign="center">
                <Button colorScheme="blue" onClick={capture}  size="md" width="60">Login</Button>
                <Text>{message}</Text>
            </Box>
        </Flex>
    </Box>
    </> 
);
}

export default LoginFace;
