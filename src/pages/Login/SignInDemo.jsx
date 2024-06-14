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
} from '@chakra-ui/react';

import logo from '../../assets/devsign.png'

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFilled, setIsFilled] = useState(false);
    const [showIncorrectPasswordAlert, setShowIncorrectPasswordAlert] = useState(false);
    const [showIncorrectUsernameAlert, setShowIncorrectUsernameAlert] = useState(false);
    const [showLoggingInAlert, setShowLoggingInAlert] = useState(false);
    const [loginmessage,setLoginMessage] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // const SignInDemo = ({ setToken }) => {
    //     const [credentials, setCredentials] = useState({
    //       email: '',
    //       password: '',
    //     });
    //     const [error, setError] = useState(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsFilled(email !== '' && password !== '');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsFilled(email !== '' && password !== '');
    };

    const handleLogin = async () => {
        setShowLoggingInAlert(true);
        try {
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password,
            });
            console.log(response.data);
    
            // Check if the profile status is 'Suspend'
            if (response.data.profileStatus === 'Suspend') {
                // Update the profile status to 'Active'
                const updatedProfile = { ...response.data, profileStatus: 'Active' };
                await axios.put('http://localhost:8000/api/update_profile_status', updatedProfile);
    
                // Also update the local state to reflect the change
                setProfile((prevProfile) => ({ ...prevProfile, profileStatus: 'Active' }));
            }
    
            setLoginMessage('Login successfully');
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
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}>
                <Stack
                    spacing={6}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.700')}
                    rounded={'xl'}
                    p={6}
                    my={12}>

                    {/* {showIncorrectPasswordAlert && (
                        <Alert status="error">
                            <AlertIcon />
                            Incorrect password. Please try again.
                        </Alert>
                    )}

                    {showIncorrectUsernameAlert && (
                        <Alert status="error">
                            <AlertIcon />
                            Incorrect Username or Email. Please try again.
                        </Alert>
                    )} */}

                    {showLoggingInAlert && (
                        <Alert status="info">
                            <AlertIcon />
                            Logging in...
                        </Alert>
                    )}
                    <center>
                        {' '}
                        <img src={logo} height={200} width={200} alt={'DevInsightLOGO'} />
                    </center>
                    <FormControl id="email">
                        <Input
                            placeholder="Enter Username or Email"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
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

                  

                    <p style={{ color: 'red' }}>{loginmessage}</p>


                    {/* </Link> */}
                    <Text textAlign="center">
                        <Link to="/su">
                        <Button variant="link" color="black">
                            Create a new account
                        </Button>{' '}
                        </Link>
                        <br />{' '}
                        <Link to="/fp">
                        <Button variant="link" as="span" color="black">
                            Forgot password
                        </Button>
                        </Link>
                    </Text>
                </Stack>
            </Flex>
        </>
    );
}
