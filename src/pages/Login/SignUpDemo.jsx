

// SignUpDemo.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
    Button,
    FormControl,
    Flex,
    Input,
    Stack,
    useColorModeValue,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import logo from '../../assets/devsign.png';


export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [isFilled, setIsFilled] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const emailFromQuery = searchParams.get('email');
        if (emailFromQuery) {
            setEmail(emailFromQuery);
        }
    }, [searchParams]);
    

    const handleFirstNameChange = (event) => {
        const firstNameValue = event.target.value;
        setFirstName(firstNameValue);
        setUsername(`${firstNameValue} ${lastName}`);
        checkIsFilled();
    };

    const handleLastNameChange = (event) => {
        const lastNameValue = event.target.value;
        setLastName(lastNameValue);
        setUsername(`${firstName} ${lastNameValue}`);
        checkIsFilled();
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        checkIsFilled();
    };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setEmail(email);
        checkIsFilled();
        validateEmail(email);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        checkIsFilled();
        validatePassword(event.target.value, reEnterPassword);
    };

    const handleReEnterPasswordChange = (event) => {
        setReEnterPassword(event.target.value);
        checkIsFilled();
        validatePassword(password, event.target.value);
    };

    const checkIsFilled = () => {
        setIsFilled(
            firstName !== '' &&
            lastName !== '' &&
            username !== '' &&
            email !== '' &&
            password !== '' &&
            reEnterPassword !== ''
        );
    };

    // const validateEmail = (emailValue) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailRegex.test(emailValue)) {
    //         setEmailError('Please enter a valid email address.');
    //     } else {
    //         setEmailError('');
    //     }
    // };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password, reEnterPassword) => {
        const capitalLetterRegex = /[A-Z]/;
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
        } else if (!capitalLetterRegex.test(password)) {
            setPasswordError('Password must contain at least one capital letter.');
        } else if (!specialCharacterRegex.test(password)) {
            setPasswordError('Password must contain at least one special character.');
        } else if (reEnterPassword !== '' && password !== reEnterPassword) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };
    

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFilled && password === reEnterPassword) {
            try {
                const response = await axios.post('http://localhost:8000/signup', {
                    
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                    role: "Developer",
                    company,
                });

                const { access_token, verificationCode } = response.data;
                sessionStorage.setItem("token", access_token);
                navigate('/si');

               
            } catch (error) {
                if (error.response && error.response.status === 400 && error.response.data.detail === "User already exists") {
                    setMessage("Email is already registered");
                } else {
                    setMessage("An error occurred while signing up");
                }
            }
        } else {
            setPasswordError('Fill all the details');
        }
    };

    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
            <Stack
                spacing={6}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                p={6}
                my={12}
            >
                {passwordError && (
                    <Alert status="error">
                        <AlertIcon />
                        {passwordError}
                    </Alert>
                )}
                <center>
                    <img src={logo} height={200} width={200} alt={'DevInsightLOGO'} />
                </center>
                <Flex>
                    <FormControl id="firstName" mr={3} flex={1}>
                        <Input
                            placeholder="First Name"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={firstName}
                            onChange={handleFirstNameChange}
                        />
                    </FormControl>
                    <FormControl id="lastName" ml={2} flex={1}>
                        <Input
                            placeholder="Last Name"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={lastName}
                            onChange={handleLastNameChange}
                        />
                    </FormControl>
                </Flex>
                <FormControl id="username">
                    <Input
                        placeholder="Profile name"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </FormControl>
                <FormControl id="email">
                    <Input
                        placeholder="Email"
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
                <FormControl id="reEnterPassword">
                    <Input
                        placeholder="Re-enter Password"
                        _placeholder={{ color: 'gray.500' }}
                        type="password"
                        value={reEnterPassword}
                        onChange={handleReEnterPasswordChange}
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={isFilled && password === reEnterPassword ? 'blue.400' : 'blue.200'}
                        color={'white'}
                        onClick={handleSubmit}>
                        Sign Up
                    </Button>
                </Stack>
                <p>{message}</p>
            </Stack>
        </Flex>
    );
}
