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

export default function FindYourAccount() {
    const [Email, setEmail] = useState('');
    ;
    const [isFilled, setIsFilled] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsFilled(event.target.value !== '' && organizationCode !== '');
    };

   

    const handleNext = () => {
        
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
                    Find Your Account
                </Heading>
                <FormControl id="Email">
                    <Input
                        placeholder="Enter email"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={Email}
                        onChange={handleEmailChange}
                    />
                </FormControl>
              
                <Stack spacing={6}>
                    <Button
                        bg={isFilled ? 'blue.500' : 'blue.200'}
                        color={'white'}
                        onClick={handleNext}
                        disabled={!isFilled}
                    >
                        Search
                    </Button>
                </Stack>
                
               
               
            </Stack>
        </Flex>
    );
}
