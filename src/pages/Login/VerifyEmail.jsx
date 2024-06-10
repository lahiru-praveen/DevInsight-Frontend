// import React, { useState } from 'react';
// import emailjs from 'emailjs-com';

// export default function VerifyEmail() {
//     const [email, setEmail] = useState('');

    // const sendVerificationEmail = async () => {
    //     try {
    //         const templateParams = {
    //             to_email: email,
    //             verification_link: 'https://example.com/verify-email' // Replace with your actual verification link
    //         };
    //         await emailjs.send('service_vpkybcl', 'template_e23p3ef', templateParams, '<YOUR_USER_ID>');

    //         alert('Verification email sent!');
    //     } catch (error) {
    //         alert('Failed to send verification email. Please try again later.');
    //     }
    // };

//     return (
//         <div>
//             <h1>Verify Your Email</h1>
//             <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <button onClick={sendVerificationEmail}>Send Verification Email</button>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import {
    Button,
    Flex,
    Stack,
    useColorModeValue,
    FormControl,
    FormLabel,
    Select,
    Input,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure
} from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import emailjs from 'emailjs-com';
import logo from '../../assets/devsign.png';

const companyDomains = {
    '99x': '99x.com',
    'IFS': 'ifs.com',
    'Zone 24/7': 'zone24/7.com',
    'WSO2': 'wso2.com',
    'virtusa': 'virtusa.com',
    'Google': 'gmail.com',
};

export default function VerifyEmail() {
    const [isVerified, setIsVerified] = useState(false);
    const [isError, setIsError] = useState(false);
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [verificationLink, setVerificationLink] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    useEffect(() => {
        const verifyEmail = async () => {
            const email = searchParams.get('email');
            const verificationCode = searchParams.get('code');

            if (email && verificationCode) {
                try {
                    const response = await axios.post('http://localhost:8000/api/verify-email', {
                        email,
                        verificationCode,
                    });

                    if (response.data.success) {
                        setIsVerified(true);
                        setTimeout(() => {
                            navigate(`/su?email=${encodeURIComponent(email)}`);
                        }, 3000);
                    } else {
                        setIsError(true);
                    }
                } catch (error) {
                    setIsError(true);
                } finally {
                    onOpen();  // Only open the alert dialog after the verification attempt
                }
            } else {
                setIsError(true);
                onOpen();
            }
        };

        verifyEmail();
    }, [searchParams, navigate, onOpen]);

    const sendVerificationEmail = async () => {
        const domain = companyDomains[company];
        const fullEmail = `${email}@${domain}`;
        const verificationUrl = `${window.location.origin}/verify-email?email=${encodeURIComponent(fullEmail)}&code=some-verification-code`;

        try {
            const templateParams = {
                to_email: email,
                verification_link: verificationUrl
            };
            await emailjs.send('service_vpkybcl', 'template_e23p3ef',{ email: email }, 'pi_OZJS01t_taFQHw');

            alert('Verification email sent!');
        } catch (error) {
            alert('Failed to send verification email. Please try again later.');
        }
    };

    const handleVerify = async () => {
        const domain = companyDomains[company];
        const fullEmail = `${email}@${domain}`;
        const verificationUrl = `${window.location.origin}/verify-email?email=${encodeURIComponent(fullEmail)}&code=some-verification-code`;

        setVerificationLink(verificationUrl);

        try {
            const response = await axios.post('http://localhost:8000/api/send-verification-email', {
                email: fullEmail,
                verificationUrl
            });

            if (response.data.success) {
                setIsVerified(true);
                onOpen();
            } else {
                setIsError(true);
                onOpen();
            }
        } catch (error) {
            setIsError(true);
            onOpen();
        }
    };

    return (
        <Flex minH={'100vh'} align={'center'} justify={'center'}>
            <Stack
                spacing={6}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                p={6}
                my={12}
            >
                <center>
                    <img src={logo} height={200} width={200} alt="Logo" />
                </center>
                <FormControl>
                    <FormLabel>Company</FormLabel>
                    <Select placeholder="Select company" value={company} onChange={(e) => setCompany(e.target.value)}>
                        {Object.keys(companyDomains).map((companyName) => (
                            <option key={companyName} value={companyName}>
                                {companyName}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Email(Enter without domain) </FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isDisabled={!company}
                    />
                    {company && <small>{`Suggested: ${email}@${companyDomains[company]}`}</small>}
                </FormControl>
                <Button onClick={sendVerificationEmail} colorScheme="blue" isDisabled={!email || !company}>
                    Verify Your Email
                </Button>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                {isVerified ? 'Email Verification Sent!' : 'Verification Failed'}
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                {isVerified ? (
                                    'A verification email has been sent to your email address. Please check your email to complete the verification.'
                                ) : (
                                    'There was an error sending the verification email. Please try again later.'
                                )}
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Close
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Stack>
        </Flex>
    );
}
