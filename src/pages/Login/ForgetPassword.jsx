import React, { useState } from 'react';
import {
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

                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Forget Password
                </Heading>
               
                <FormControl>
                    <Flex>
                        
                        <Input
                            placeholder=""
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            maxLength={1}
                            style={{width: '40px', height: '40px', borderRadius: '8px', textAlign: 'center', marginRight: '32px' }}
                        />

<Input
                            placeholder=""
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            maxLength={1}
                            style={{ width: '40px', height: '40px', borderRadius: '8px', textAlign: 'center', marginRight: '30px' }}
                        />

<Input
                            placeholder=""
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            maxLength={1}
                            style={{ width: '40px', height: '40px', borderRadius: '8px', textAlign: 'center', marginRight: '32px' }}
                        />

<Input
                            placeholder=""
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            maxLength={1}
                            style={{ width: '40px', height: '40px', borderRadius: '8px', textAlign: 'center', marginRight: '30px' }}
                        />

<Input
                            placeholder=""
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            maxLength={1}
                            style={{ width: '40px', height: '40px', borderRadius: '8px', textAlign: 'center', marginRight: '32px' }}
                        />
                        <Input
                            placeholder=""
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            value={password}
                            onChange={handlePasswordChange}
                            maxLength={1}
                            style={{ width: '40px', height: '40px', borderRadius: '8px', textAlign: 'center' }}
                        />
                  
                    </Flex>
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
