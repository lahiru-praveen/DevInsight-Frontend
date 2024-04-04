import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

import logo from '../../assets/devsign.png';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFilled, setIsFilled] = useState(false);
    const [showIncorrectPasswordAlert, setShowIncorrectPasswordAlert] = useState(false);
    const [showIncorrectUsernameAlert, setShowIncorrectUsernameAlert] = useState(false);
    const [showLoggingInAlert, setShowLoggingInAlert] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsFilled(email !== '' && password !== '');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsFilled(email !== '' && password !== '');
    };

    const handleLogin = () => {
        if (email === 'example@example.com' && password === 'password') {
            // Perform login logic here
            setShowLoggingInAlert(true);
        } else {
            setShowIncorrectPasswordAlert(true);
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
                    <Link to="/db">
                    <Stack spacing={6}>
                        <Button
                            bg={isFilled ? 'blue.500' : 'blue.200'}
                            color={'white'}
                            onClick={handleLogin}>
                            LOGIN
                        </Button>
                    </Stack>
                    </Link>
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
