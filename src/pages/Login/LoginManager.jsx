

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Button,
    FormControl,
    Flex,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
    Box,
    Spacer,
} from '@chakra-ui/react';
import logo from '../../assets/devsign.png';
import gif from '../../assets/T.gif';

export default function LoginManager() {
    const [admin_email, setadminEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFilled, setIsFilled] = useState(false);
    const [showLoggingInAlert, setShowLoggingInAlert] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    const handleAdminEmailChange = (event) => {
        setadminEmail(event.target.value);
        setIsFilled(event.target.value !== '' && password !== '');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsFilled(admin_email !== '' && event.target.value !== '');
    };

    const handleLogin = async () => {
        setShowLoggingInAlert(true);
        try {
            const response = await axios.post('http://localhost:8000/login', {
                email: admin_email,
                password,
            });
            console.log(response.data);

            // Save token to sessionStorage
            sessionStorage.setItem('access_token', response.data.access_token);

           

            setLoginMessage('Login successful');
            sessionStorage.setItem('email', response.data.email);
            navigate('/db');

        } catch (error) {
            setShowLoggingInAlert(false);
            if (error.response && error.response.status === 401) {
                setLoginMessage('Incorrect password. Please try again.');
            } else if (error.response && error.response.status === 404) {
                setLoginMessage('User not found. Please try again.');
            } else {
                setLoginMessage('An error occurred. Please try again later.');
            }
            console.error('Error logging in:', error);
        }
    };

    return (
        <>
        <Flex minH={'100vh'}>
         {/* Left Side */}
         <Box
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bg={useColorModeValue('white', 'gray.700')}
                
            >
                <Box mt={40}>
                    <img src={logo} height={200} width={200} alt={'DevInsightLOGO'} />
                </Box>
                <Spacer />
                <Box>
                    <img src={gif} alt="Sample GIF" />
                </Box>
            </Box>
             {/* Right Side */}
            <Flex
                    flex={1}
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50')}>
                <Stack
                    spacing={6}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}>

                    {showLoggingInAlert && (
                        <Alert status="info">
                            <AlertIcon />
                            Logging in...
                        </Alert>
                    )}
                    
                    <Text fontSize="4xl" fontWeight="bold">
                         Welcome Back!
                    </Text>   
                 <Text fontSize="2xl" >  Login as a manager.</Text>
                     
                    <FormControl id="admin_email">
                        <Input
                            placeholder="Enter Company Email"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            value={admin_email}
                            onChange={handleAdminEmailChange}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <Input
                            placeholder="Password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </FormControl>
                    <Stack spacing={6}>
                        <Button
                            bg={isFilled ? 'blue.500' : 'blue.200'}
                            color={'white'}
                            onClick={handleLogin}>
                            LOGIN
                        </Button>
                    </Stack>
                    <Text textAlign="center">
                        <Link to="/fp">
                            <Button variant="link" as="span" color="black">
                                Forgot password
                            </Button>
                        </Link>
                        <p style={{ color: 'red' }}>{loginMessage}</p>
                    </Text>
                </Stack>
            </Flex>
        </Flex>
        </>
    );
}

