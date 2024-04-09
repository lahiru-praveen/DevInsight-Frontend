import  { useState } from 'react';
import {
    Button,
    FormControl,
    Flex,
    Input,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';

import logo from '../../assets/devsign.png'

export default function FindYourAccount() {
    const [Email, setEmail] = useState('');
    const [isFilled, setIsFilled] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        let organizationCode;
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
                    <center>  <img src={logo} height={200} width={200} /></center> 
                
                   <p>Find Your Account</p> 
                
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
