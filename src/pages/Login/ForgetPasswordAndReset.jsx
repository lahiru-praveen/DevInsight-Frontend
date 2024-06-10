import { useState } from 'react';
import { Button, Flex, FormControl, FormLabel, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import logo from '../../assets/devsign.png';

export default function ForgetPasswordAndReset() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSave = () => {
        // Add your logic to save the new password
        console.log('New password:', newPassword);
        console.log('Confirm new password:', confirmNewPassword);
    };

    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.700')} rounded={'xl'} p={6} my={12}>
                <center><img src={logo} height={200} width={200} alt="Logo"/></center>
               
                <FormControl>
                    <FormLabel>New Password</FormLabel>
                    <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Confirm New Password</FormLabel>
                    <Input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                </FormControl>
                <Stack spacing={6}>
                    <Button onClick={handleSave} color={'white'} bg={'blue.500'} _hover={{ bg: 'blue.600' }}>
                        Save
                    </Button>
                </Stack>
                
            </Stack>
        </Flex>
    );
}
