import React, { useState } from 'react';
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export default function SignUp() {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [isFilled, setIsFilled] = useState(false);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
        setIsFilled(firstName !== '' && lastName !== '' && username !== '' && email !== '' && password !== '' && reEnterPassword !== '');
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
        setIsFilled(firstName !== '' && lastName !== '' && username !== '' && email !== '' && password !== '' && reEnterPassword !== '');
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setIsFilled(firstName !== '' && lastName !== '' && username !== '' && email !== '' && password !== '' && reEnterPassword !== '');
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsFilled(firstName !== '' && lastName !== '' && username !== '' && email !== '' && password !== '' && reEnterPassword !== '');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsFilled(firstName !== '' && lastName !== '' && username !== '' && email !== '' && password !== '' && reEnterPassword !== '');
    };

    const handleReEnterPasswordChange = (event) => {
        setReEnterPassword(event.target.value);
        setIsFilled(firstName !== '' && lastName !== '' && username !== '' && email !== '' && password !== '' && reEnterPassword !== '');
    };

    return (
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
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Sign Up
                </Heading>
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
                <Stack spacing={6}>
                    <Button bg={isFilled ? 'blue.400' : 'blue.200'} color={'white'}
                       // _hover={{bg: isFilled ? 'blue.500' : 'gray.400',}}
                        > 
                        NEXT
                    </Button>
                </Stack>
              
            </Stack>
            
        </Flex>
    );
}
