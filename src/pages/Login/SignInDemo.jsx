//import SignIn from "../../components/Login/SignIn"


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

import logo from '../../assets/devsign.png'

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
              
              <center>  <img src={logo} height={200} width={200} /></center> 
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
                    <Button variant="link"  color="black">Create a new account</Button> <br/> <Button variant="link" as="span" color="black">Forgot password</Button>
                </Text>
               
            </Stack>
        </Flex>
    );
}
