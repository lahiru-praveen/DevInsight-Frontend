import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Flex, FormControl, FormLabel, Input, Stack, Text, useColorModeValue, Alert, AlertIcon } from '@chakra-ui/react';
import logo from '../../assets/devsign.png';
import BackButton from '../../components/Profile_page/BackButton';

export default function ForgotPasswordAndReset() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { email, code } = location.state;

    const handleSave = async () => {
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('Passwords do not match. Please re-enter.');
            return;
        }

        if (!/(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/.test(newPassword)) {
            setErrorMessage('Password must contain at least 6 characters, one capital letter, and one special character.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/change-password-organization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code, new_password: newPassword }),
            });

            if (response.ok) {
                setSuccessMessage('Password changed successfully!');
                sessionStorage.clear();
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(`Password change failed: ${errorData.detail}`);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <>
          <Box>
            <BackButton />
          </Box>
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.700')} rounded={'xl'} p={6} my={12}>
                <center><img src={logo} height={200} width={200} alt="Logo" /></center>

                {errorMessage && (
                    <Alert status="error" rounded="md">
                        <AlertIcon />
                        {errorMessage}
                    </Alert>
                )}

                {successMessage && (
                    <Alert status="success" rounded="md">
                        <AlertIcon />
                        {successMessage}
                    </Alert>
                )}

                <FormControl>
                    <FormLabel>New Password</FormLabel>
                    <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Confirm New Password</FormLabel>
                    <Input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                </FormControl>
                <Stack spacing={6}>
                {!successMessage && (
                        <Button onClick={handleSave} color={'white'} bg={'blue.500'} _hover={{ bg: 'blue.600' }}>
                            Save
                        </Button>
                    )}
                </Stack>
                

                {successMessage && (
                    <Stack spacing={6}>
                        <Button onClick={() => navigate('/login-manager')} color={'white'} bg={'green.500'} _hover={{ bg: 'green.600' }}>
                            Click here to Login
                        </Button>
                    </Stack>
                )}
            </Stack>
        </Flex>
    </>
    );
}
