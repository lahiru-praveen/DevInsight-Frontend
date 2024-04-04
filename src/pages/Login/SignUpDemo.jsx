
import { useState, Redirect } from 'react';
import { Link } from 'react-router-dom';

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
    
    // State variables for form inputs and validation
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [isFilled, setIsFilled] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    // Function to handle changes in the first name input
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
        setIsFilled(
            firstName !== '' &&
                lastName !== '' &&
                username !== '' &&
                email !== '' &&
                password !== '' &&
                reEnterPassword !== ''
        );
    };

    // Function to handle changes in the last name input
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
        setIsFilled(
            firstName !== '' &&
                lastName !== '' &&
                username !== '' &&
                email !== '' &&
                password !== '' &&
                reEnterPassword !== ''
        );
    };

    // Function to handle changes in the username input
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setIsFilled(
            firstName !== '' &&
                lastName !== '' &&
                username !== '' &&
                email !== '' &&
                password !== '' &&
                reEnterPassword !== ''
        );
    };

    // Function to handle changes in the email input
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsFilled(
            firstName !== '' &&
                lastName !== '' &&
                username !== '' &&
                email !== '' &&
                password !== '' &&
                reEnterPassword !== ''
        );
    };

    // Function to handle changes in the password input
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsFilled(
            firstName !== '' &&
                lastName !== '' &&
                username !== '' &&
                email !== '' &&
                password !== '' &&
                reEnterPassword !== ''
        );
        // Check if the passwords match and update the error state
        if (reEnterPassword !== '' && event.target.value !== reEnterPassword) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

    // Function to handle changes in the re-enter password input
    const handleReEnterPasswordChange = (event) => {
        setReEnterPassword(event.target.value);
        setIsFilled(
            firstName !== '' &&
                lastName !== '' &&
                username !== '' &&
                email !== '' &&
                password !== '' &&
                reEnterPassword !== ''
        );
        // Check if the passwords match and update the error state
        if (event.target.value !== password) {
            setPasswordError('Passwords do not match');
        } else {
            setPasswordError('');
        }
    };

  
  // State variable for redirection
const [redirect, setRedirect] = useState(false);

// Function to handle form submission
const handleSubmit = () => {
    // Check if the form is filled and passwords match before submission
    if (isFilled && password === reEnterPassword) {
        // Perform your form submission logic here
        // For demonstration purposes, we'll just simulate a successful submission
        setRedirect(true);
    } else {
        setPasswordError('Passwords do not match');
    }
};

// Redirect to landing page after successful form submission
if (redirect) {
    return <Redirect to="/SignInDemo" />;
}


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
                {/* Alert for password mismatch */}
                {passwordError && (
                    <Alert status="error">
                        <AlertIcon />
                        {passwordError}
                    </Alert>
                )}

                {/* Logo */}
                <center>
                    {' '}
                    <img src={logo} height={200} width={200} alt={'DevInsightLOGO'} />
                </center>

                {/* Form inputs */}
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
                        placeholder="Username"
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

                {/* Submit button */}
                <Link to="/db">
                <Stack spacing={6}>
                   
                   <Button
                       bg={isFilled && password === reEnterPassword ? 'blue.400' : 'blue.200'}
                       color={'white'}
                       onClick={handleSubmit}>
                       NEXT
                   </Button>
               </Stack>
               </Link>
               
            </Stack>
        </Flex>
    );
}
