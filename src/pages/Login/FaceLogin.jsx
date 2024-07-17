import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Box, Button, Text, Flex, Heading, useColorModeValue, Link, Spinner, Image } from '@chakra-ui/react';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link as RouterLink , useNavigate } from 'react-router-dom';
import image from '../../assets/facelogin.gif';

function LoginFace() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const webcamRef = React.useRef(null);
  const navigate = useNavigate();

  const capture = async () => {
    setLoading(true);
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
      const { email, password, access_token, companyEmail, role } = response.data.user;
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password);
      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem('companyEmail', companyEmail);
      sessionStorage.setItem('role', role);
      navigate('/db');
    } catch (error) {
      setMessage(error.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
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
    <RouterLink to="/login-developer" style={{ alignSelf: 'flex-start' }}>
          <Button leftIcon={<IoArrowBackCircleSharp />} variant="ghost" color="black">
            Go Back
          </Button>
        </RouterLink>
      <Box 
        backgroundSize="cover"
        backgroundPosition="center"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
         

        <Box 
          bg={useColorModeValue('white', 'gray.700')}
          p={4}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          maxWidth="500px"
          width="100%"
        >
          <Box mb={-5} mt={-10}>
            <Image src={image} alt="Face Login" boxSize="150px" mx="auto" />
          </Box>

          <Heading as="h3"  mb={6}>Login with Face</Heading>

          <Box mb={4}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg overflow-hidden"
              videoConstraints={{ width: 640, height: 480 }}
              style={{ borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
            />
          </Box>

          <Box>
            <Button
              colorScheme="blue"
              onClick={capture}
              size="lg"
              width="full"
              isLoading={loading}
              spinner={<Spinner size="sm" color="white" />}
            >
              {loading ? '' : 'Login'}
            </Button>
            <Text mt={4} color="red.500">{message}</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LoginFace;
