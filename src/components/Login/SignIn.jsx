
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

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFilled, setIsFilled] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsFilled(email !== '' && password !== '');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsFilled(email !== '' && password !== '');
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
                    Sign In
                </Heading>
                <FormControl id="email">
                    <Input
                        placeholder="Enter Username or Email "
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
                      
                        >
                        LOGIN
                    </Button>
                </Stack>
                
                <Text textAlign="center">
                    <Text as="span" color="black">Create a new account</Text> <br/> <Text as="span" color="black">Forgot password</Text>
                </Text>
               
            </Stack>
        </Flex>
    );
}
