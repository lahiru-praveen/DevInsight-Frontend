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

export default function CreateOrg() {
    const [organizationName, setOrganizationName] = useState('');
    const [organizationCode, setOrganizationCode] = useState('');
    const [isFilled, setIsFilled] = useState(false);

    const handleOrganizationNameChange = (event) => {
        setOrganizationName(event.target.value);
        setIsFilled(event.target.value !== '' && organizationCode !== '');
    };

    const handleOrganizationCodeChange = (event) => {
        setOrganizationCode(event.target.value);
        setIsFilled(organizationName !== '' && event.target.value !== '');
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
                    Create Organization Account
                </Heading>
                <FormControl id="organizationName">
                    <Input
                        placeholder="Enter Organization Name"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={organizationName}
                        onChange={handleOrganizationNameChange}
                    />
                </FormControl>
                <FormControl id="organizationCode">
                    <Input
                        placeholder="Enter Organization Code"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={organizationCode}
                        onChange={handleOrganizationCodeChange}
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        bg={isFilled ? 'blue.500' : 'blue.200'}
                        color={'white'}
                        onClick={handleNext}
                        disabled={!isFilled}
                    >
                        NEXT
                    </Button>
                </Stack>
                
               
               
            </Stack>
        </Flex>
    );
}
