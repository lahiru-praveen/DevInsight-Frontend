import React,{ useState, Redirect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    
    // State variables for form inputs and validation
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [isFilled, setIsFilled] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [message,setMessage] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');

    // const SignUpDemo = ({ setToken }) => {
    //     const [formData, setFormData] = useState({
    //       firstName: '',
    //       lastName: '',
    //       username: '',
    //       email: '',
    //       password: '',
    
    //     });
        // const [error, setError] = useState(null);
      
        // const handleChange = (e) => {
        //   const { name, value } = e.target;
        //   setFormData({ ...formData, [name]: value });
        // };

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
            const emailValue = event.target.value;
            setEmail(emailValue);
            setIsFilled(
                firstName !== '' &&
                    lastName !== '' &&
                    username !== '' &&
                    emailValue !== '' &&
                    password !== '' &&
                    reEnterPassword !== ''
            )
            validateEmail();

            const validateEmail = () => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    setEmailError('Please enter a valid email address.');
                } else {
                    setEmailError('');
                }
            };

            
            // Check if the email contains the "@" sign
            // if (!emailValue.includes('@')) {
            //     setMessage('Email should include @ sign');
            // } else {
            //     setMessage('');
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
const [redirect] = useState(false);



// const handleSubmit = async () => {
//     console.log("Submitting form...");
//     if (isFilled && password === reEnterPassword) {
//         try {
//             // Check if the email is already registered
//             const response = await axios.post('http://localhost:8000/signup', {
//                 firstName,
//                 lastName,
//                 username,
//                 email,
//                 password,
//             });
//             console.log("Form submitted successfully:", response.data);
//             // If email is not already registered, redirect to sign-in page
//             navigate("/si");

//         } catch (error) {
//             console.error('Error signing up:', error);
//             if (error.response && error.response.status === 400 && error.response.data.detail === "User already exists") {
//                 setMessage("Email is already registered");
//             } else {
//                 setMessage("An error occurred while signing up");
//             }
//         }
//     } else {
//         setPasswordError('Fill all the details');
//     }
// };

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    if (isFilled && password === reEnterPassword) {
        try {
            const response = await axios.post('http://localhost:8000/signup', {
                firstName,
                lastName,
                username,
                email,
                password,
                role: "Developer"
            });

            console.log("Form submitted successfully:", response.data);

            // Assuming the response contains the access token
            const { access_token } = response.data;
            setToken(access_token); // Store token in state or local storage
            sessionStorage.setItem("token", access_token);

            // Redirect to sign-in page
            navigate("/si");

        } catch (error) {
            console.error('Error signing up:', error);

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


  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   try {
    //     const data = await signup(formData);
    //     setToken(data.access_token); // Store token in state or local storage
    //   } catch (error) {
    //     setError(error.detail);
    //   }
    // };

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
