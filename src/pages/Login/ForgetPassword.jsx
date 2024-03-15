import React, { useState } from 'react';
import {
    PinInput,
    PinInputField,
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Spacer,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

import logo from '../../assets/devsign.png'

export default function ForgetPassword() {
    
    const [password, setPassword] = useState('');
    const [isFilled, setIsFilled] = useState(false);

    const handlePasswordChange = (e) => {
        const value = e.target.value.slice(0, 1); // Limit to one character
        setPassword(value);
        setIsFilled(value.length === 1);
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
                <p >Enter the 6 digit code</p>
               
                <FormControl>
                <Stack>
                    <flex >
                    <PinInput otp>
                        <PinInputField   style={{ marginRight: '30px' }}/>
                        <PinInputField  style={{ marginRight: '25px' }}/>
                        <PinInputField  style={{ marginRight: '25px' }}/>
                        <PinInputField  style={{ marginRight: '25px' }}/>
                        <PinInputField  style={{ marginRight: '25px' }}/>
                        <PinInputField  style={{ marginRight: '25px' }}/>
                    </PinInput>
                    </flex>
                </Stack>

                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={isFilled ? 'blue.500' : 'blue.200'}
                        color={'white'}
                      
                        >
                        Verify
                    </Button>
                </Stack>

                <div align={'right'}>
                    <Text color="black" align={'right'}>If you have not received an email</Text>
                        <Button variant="link" colorScheme="blue" >Re-send the email</Button><br/>
                        <Button variant="link" colorScheme="blue" >Check the email</Button>
                </div>
                
               
            </Stack>
        </Flex>
    );
}
