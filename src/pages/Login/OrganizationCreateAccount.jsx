import React, { useState } from 'react';
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

export default function CreateOrg() {
    // State variables to store organization data and manage form state
    const [organizationName, setOrganizationName] = useState('');
    const [organizationCode, setOrganizationCode] = useState('');
    const [isFilled, setIsFilled] = useState(false);
    const [showAccountCreatedAlert, setShowAccountCreatedAlert] = useState(false);

    // Event handlers to update organization data and manage form state
    const handleOrganizationNameChange = (event) => {
        setOrganizationName(event.target.value);
        setIsFilled(event.target.value !== '' && organizationCode !== '');
    };

    const handleOrganizationCodeChange = (event) => {
        setOrganizationCode(event.target.value);
        setIsFilled(organizationName !== '' && event.target.value !== '');
    };

    // Function to handle "NEXT" button click
    const handleNext = () => {
        // Perform account creation logic here
        // For demonstration purposes, we'll just show an alert
        setShowAccountCreatedAlert(true);
    };

    // JSX code for the component layout and structure
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
                {/* Display an alert for account created */}
                {showAccountCreatedAlert && (
                    <Alert status="success">
                        <AlertIcon />
                        Account created successfully!
                    </Alert>
                )}
                <center>
                    {' '}
                    <img src={logo} height={200} width={200} />
                </center>
                {/* Organization name input */}
                <FormControl id="organizationName">
                    <Input
                        placeholder="Enter Organization Name"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={organizationName}
                        onChange={handleOrganizationNameChange}
                    />
                </FormControl>
                {/* Organization code input */}
                <FormControl id="organizationCode">
                    <Input
                        placeholder="Enter Organization Code"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={organizationCode}
                        onChange={handleOrganizationCodeChange}
                    />
                </FormControl>
                {/* "NEXT" button */}
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
