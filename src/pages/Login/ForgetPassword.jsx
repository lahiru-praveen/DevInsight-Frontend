// import {useState} from 'react';
// import {Button, Flex, FormControl, PinInput, PinInputField, Stack, Text, useColorModeValue,} from '@chakra-ui/react';

// import logo from '../../assets/devsign.png'

// export default function ForgetPassword() {


//     const [isFilled] = useState(false);

   

//     return (
//         <Flex
//             minH={'100vh'}
//             align={'center'}
//             justify={'center'}>
//             <Stack
//                 spacing={6}
//                 w={'full'}
//                 maxW={'md'}
//                 bg={useColorModeValue('white', 'gray.700')}
//                 rounded={'xl'}
//                 p={6}
//                 my={12}>

//                 <center><img src={logo} height={200} width={200}/></center>
//                 <p>Enter the 6 digit code</p>

//                 <FormControl>
//                     <Stack>
//                         <flex>
//                             <PinInput otp>
//                                 <PinInputField style={{marginRight: '30px'}}/>
//                                 <PinInputField style={{marginRight: '25px'}}/>
//                                 <PinInputField style={{marginRight: '25px'}}/>
//                                 <PinInputField style={{marginRight: '25px'}}/>
//                                 <PinInputField style={{marginRight: '25px'}}/>
//                                 <PinInputField style={{marginRight: '25px'}}/>
//                             </PinInput>
//                         </flex>
//                     </Stack>

//                 </FormControl>
//                 <Stack spacing={6}>
//                     <Button
//                         bg={isFilled ? 'blue.500' : 'blue.200'}
//                         color={'white'}

//                     >
//                         Verify
//                     </Button>
//                 </Stack>


//                 <div align={'right'}>
//                     <Text color="black" align={'right'}>If you have not received an email</Text>
//                     <Button variant="link" colorScheme="blue">Re-send the email</Button><br/>
//                     <Button variant="link" colorScheme="blue">Check the email</Button>
//                 </div>


//             </Stack>
//         </Flex>
//     );
// }


import { useState } from 'react';
import { Button,
        Flex,
        FormControl, 
        Input, 
        PinInput, 
        PinInputField, 
        Stack, 
        Text, 
        useColorModeValue,
    } from '@chakra-ui/react';

import logo from '../../assets/devsign.png'
//import { useHistory } from 'react-router-dom';

export default function ForgetPassword() {
    //const history = useHistory();
    const [isEmailFilled, setIsEmailFilled] = useState(false);
    const [isCodeFilled, setIsCodeFilled] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSendEmail = async () => {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                alert('Email sent successfully!');
            } else {
                setErrorMessage('Email sending failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    const handleVerify = async () => {
        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code }),
                
            });

            if (response.ok) {
                alert('Password reset successfully!');
                //history.push('/fpr');
            } else {
                setErrorMessage('Password reset failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
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

                <center><img src={logo} height={200} width={200}/></center>
                <p>Enter your email address to receive a verification code</p>

                <FormControl>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsEmailFilled(e.target.value !== '');
                        }}
                    />
                </FormControl>

                <Stack spacing={6}>
                    <Button
                        bg={isEmailFilled ? 'blue.500' : 'blue.200'}
                        color={'white'}
                        onClick={handleSendEmail}
                        disabled={!isEmailFilled}
                    >
                        Send Email
                    </Button>
                </Stack>

                <p>Enter the 6-digit verification code</p>

                <FormControl>
                    <Stack direction="row" spacing={2}>
                        <PinInput otp>
                            {[...Array(6)].map((_, index) => (
                                <PinInputField key={index} value={code[index] || ''} onChange={(e) => {
                                    const newCode = [...code];
                                    newCode[index] = e.target.value;
                                    setCode(newCode);
                                    setIsCodeFilled(newCode.every((c) => c));
                                }}/>
                            ))}
                        </PinInput>
                    </Stack>
                </FormControl>

                <Stack spacing={6}>
                    <Button
                        bg={isCodeFilled ? 'blue.500' : 'blue.200'}
                        color={'white'}
                        onClick={handleVerify}
                        disabled={!isCodeFilled}
                    >
                        Verify
                    </Button>
                </Stack>

                {errorMessage && (
                    <Text color="red.500" align={'center'}>{errorMessage}</Text>
                )}

                <div align={'right'}>
                    
                    <Button variant="link" colorScheme="blue" onClick={() => window.open(`mailto:${email}`, '_blank')}>
                        Check the email
                    </Button><br/>
                    <Button variant="link" colorScheme="blue" onClick={handleSendEmail}>Re-send the email</Button>
                </div>
            </Stack>
        </Flex>
    );
}
