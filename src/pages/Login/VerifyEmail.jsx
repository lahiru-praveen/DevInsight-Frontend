
import React, { useEffect, useState } from 'react';
import {
    Button,
    Flex,
    Stack,
    Box,
    Spacer,
    Text,
    useColorModeValue,
    FormControl,
    FormLabel,
    Select,
    Input,
    InputGroup,
    InputRightElement,
    Alert,
    AlertIcon,
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
import image from '../../assets/email.png';

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
    const [emailName, setEmailName] = useState('');
    const [company, setCompany] = useState('');
    const [verificationUrl, setVerificationLink] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const sendVerificationEmail = async () => {
        const domain = companyDomains[company];
        const email = `${emailName}@${domain}`;
        const verificationCode = Math.random().toString(36).substring(2, 15); // Generate a unique code here
        const verificationUrl = `${window.location.origin}/su?email=${encodeURIComponent(email)}&code=${verificationCode}&company=${company}`;

        //setVerificationLink(verificationUrl);

        try {
            const templateParams = {
                to_email: email,
                verification_link: verificationUrl,
            };
            await emailjs.send('service_vpkybcl', 'template_e23p3ef', templateParams, 'RpcqYlAsefwq23rYY');

            alert('Verification email sent!');

        // Save the verification code in the database
                 await axios.post('http://localhost:8000/save-verification-code', { email, verificationCode });
                 setVerificationLink(verificationUrl);
                 setIsVerified(true);
                 setIsError(false);
             } catch (error) {
                 setIsError(true);
                 setIsVerified(false);
             }
         };

    const handleSubmit = async (event) => {
            event.preventDefault();
            const domain = companyDomains[company];
            if (domain) {
                await sendVerificationEmail();
            }
    };

    useEffect(() => {
        const emailFromQuery = searchParams.get('email');
        const verificationCodeFromQuery = searchParams.get('code');

        const verifyEmail = async () => {
            try {
                const response = await axios.post('http://localhost:8000/verify-email', {
                    email: emailFromQuery,
                    code: verificationCodeFromQuery,
                });
                if (response.data.success) {
                    setIsVerified(true);
                    onOpen();
                } else {
                    setIsError(true);
                }
            } catch (error) {
                setIsError(true);
            }
        };
   
        if (emailFromQuery && verificationCodeFromQuery) {
            verifyEmail();
        }
    }, [searchParams, onOpen]);

    return (
        <Flex  minH={'100vh'}>
            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bg={useColorModeValue('white', 'gray.700')}
                
            >
                <Box mt={20}>
                    <img src={logo} height={200} width={200} alt={'DevInsightLOGO'} />
                </Box>
                <Spacer />
                <Box mb={150}>
                    <img src={image} alt="Sample GIF"  height={800} width={800} />
                </Box>
            </Box>
        <Flex flex={1} align={'center'} justify={'center'} bg={useColorModeValue('gray.50')}>
            <Stack
                spacing={6}
                w={'full'}
                maxW={'md'}
                rounded={'xl'}
                p={6}
                my={12}
            >

                {isVerified && (
                    <Alert status="success">
                        <AlertIcon />
                        Please verify your email. If you don't see the email, please check spam.
                    </Alert>
                )}
                {isError && (
                    <Alert status="error">
                        <AlertIcon />
                        Error verifying email. Please try again.
                    </Alert>
                )}

                <Text fontSize="2xl" fontWeight="bold">  Verify your E-mail address.</Text>
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
                    <FormLabel>Email (Enter without domain) </FormLabel>
                    <InputGroup>
                        <Input
                            type="text"
                            placeholder="Enter your email"
                            value={emailName}
                            onChange={(e) => setEmailName(e.target.value)}
                            isDisabled={!company}
                        />
                        {company && (
                            <InputRightElement width="auto" pointerEvents="none">
                                <small>{`@${companyDomains[company]}`}</small>
                            </InputRightElement>
                        )}
                    </InputGroup>
                </FormControl>
                <Button onClick={handleSubmit} colorScheme="blue" isDisabled={!emailName || !company}>
                    Verify Your Email
                </Button>
            </Stack>
        </Flex>
    </Flex>
    );
}
