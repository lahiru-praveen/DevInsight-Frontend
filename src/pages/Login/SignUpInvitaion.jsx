
import { useState, useEffect } from 'react';
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
    Box,
    Spacer,
    Text,
} from '@chakra-ui/react';

import logo from '../../assets/devsign.png';
import image from '../../assets/su.png';

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [isFilled, setIsFilled] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const useremail = searchParams.get('email');


        const fetchInvitationDetails = async (token, useremail) => {
            try {
                const response = await axios.get(`http://localhost:8000/get-invitation-details?token=${token}&email=${useremail}`);
                const { email, organization_email, organization_name, role } = response.data;
                setEmail(email);
                setCompanyEmail(organization_email);
                setCompany(organization_name);
                setRole(role);
                // If needed, set role or other state variables
            } catch (error) {
                console.error("Error fetching invitation details:", error);
            }
        };

        if (token) {
            fetchInvitationDetails(token);
        }
    }, [searchParams]);

    const handleFirstNameChange = (event) => {
        const firstNameValue = event.target.value;
        setFirstName(firstNameValue);
        setUsername(`${firstNameValue} ${lastName}`);
        checkIsFilled(firstNameValue, lastName, username, email, password, reEnterPassword, company);
    };

    const handleLastNameChange = (event) => {
        const lastNameValue = event.target.value;
        setLastName(lastNameValue);
        setUsername(`${firstName} ${lastNameValue}`);
        checkIsFilled(firstName, lastNameValue, username, email, password, reEnterPassword, company);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        checkIsFilled(firstName, lastName, event.target.value, email, password, reEnterPassword, company);
    };


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        checkIsFilled(firstName, lastName, username, email, event.target.value, reEnterPassword, company);
        validatePassword(event.target.value, reEnterPassword);
    };

    const handleReEnterPasswordChange = (event) => {
        setReEnterPassword(event.target.value);
        checkIsFilled(firstName, lastName, username, email, password, event.target.value, company);
        validatePassword(password, event.target.value);
    };



    const checkIsFilled = (firstName, lastName, username, email, password, reEnterPassword, company) => {
        setIsFilled(
            firstName !== '' &&
            lastName !== '' &&
            username !== '' &&
            email !== '' &&
            password !== '' &&
            reEnterPassword !== '' &&
            company !== ''
        );
    };

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
                    company,
                    companyEmail,
                    role,
                    skills: [],
                    face_encoding: [],
                    profileStatus: "Active",
                    profilePicture:  " ",
                });

                const { access_token, user_id, verificationCode } = response.data;
                sessionStorage.setItem( "token", access_token );
                setUserId(user_id); // Store user ID in state
                navigate('/login-developer');
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
                <Box mt={20}>
                    <img src={logo} height={200} width={200} alt={'DevInsightLOGO'} />
                </Box>
                <Spacer />
                <Box>
                    <img src={image} alt="Sample GIF" height={600} width={600} />
                </Box>
            </Box>

            {/* Right Side */}
            <Flex align={'center'} justify={'center'} flex={1} bg={useColorModeValue('gray.50')}>
                <Stack
                    spacing={6}
                    w={'full'}
                    maxW={'md'}
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
                    {message && (
                        <Alert status="error">
                            <AlertIcon />
                            {message}
                        </Alert>
                    )}
                    {userId && (
                        <Alert status="success">
                            <AlertIcon />
                            Signup successful! Your user ID is: {userId}
                        </Alert>
                    )}
                    <Text fontSize="4xl" fontWeight="bold">
                        Welcome to DevInsight!
                    </Text>
                    <form onSubmit={handleSubmit}>
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
                            <FormControl id="lastName" ml={3} flex={1}>
                                <Input
                                    placeholder="Last Name"
                                    _placeholder={{ color: 'gray.500' }}
                                    type="text"
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                />
                            </FormControl>
                        </Flex>
                        <FormControl id="username" mt={4}>
                            <Input
                                placeholder="Username"
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                            />
                        </FormControl>
                        <FormControl id="email" mt={4}>
                            <Input
                                placeholder="Email"
                                _placeholder={{ color: 'gray.500' }}
                                type="email"
                                value={email}
                                isReadOnly
                            />
                        </FormControl>
                        <FormControl id="company" mt={4}>
                            <Input
                                placeholder="Company"
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                                value={company}
                                isReadOnly
                            />
                        </FormControl>
                        <FormControl id="password" mt={4}>
                            <Input
                                placeholder="Password"
                                _placeholder={{ color: 'gray.500' }}
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </FormControl>
                        <FormControl id="reEnterPassword" mt={4}>
                            <Input
                                placeholder="Re-enter Password"
                                _placeholder={{ color: 'gray.500' }}
                                type="password"
                                value={reEnterPassword}
                                onChange={handleReEnterPasswordChange}
                            />
                        </FormControl>
                        <Stack spacing={6} direction={['column', 'row']} mt={6}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                type="submit"
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Flex>
        </Flex>
    );
}


