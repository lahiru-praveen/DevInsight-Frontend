import { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Spinner,
  FormControl,
  Input,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  Spacer,
  Box,
  AlertDescription,
  CloseButton
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import logo from '../../assets/devsign.png';
import image from '../../assets/fp.png';
import BackButton from '../../components/Profile_page/BackButton';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [isCodeFilled, setIsCodeFilled] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(new Array(6).fill(''));
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isResend, setIsResend] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setErrorMessage('');
      }, 8000); // Close the message after 8 seconds

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!data.exists) {
        setErrorMessage('Email does not exist.');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
      setLoading(false);
      return;
    }

    // If email exists, proceed to send OTP
    const generatedOtp = generateOtp();
    setOtp(generatedOtp);

    const templateParams = {
      email: email,
      to_email: email,
      otp: generatedOtp,
    };

    try {
      await emailjs.send('service_ax5vdad', 'template_9ngk2p7', templateParams, 'QMOV04h5XPfI8pijD');
      if (isResend) {
        setSuccessMessage('!');
        setIsResend(true);
      } else {
        setSuccessMessage("Please verify your email. If you don't see the email, please check spam.");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
      setLoading(false);
      setSuccessMessage('');
    }
  };

  const handleCodeChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setIsCodeFilled(newCode.every((c) => c !== ''));
  };

  const handleVerify = async () => {
    if (code.join('') === otp) {
      try {
        const response = await fetch('http://localhost:8000/api/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code: code.join('') }),
        });

        if (response.ok) {
          navigate('/fpr', { state: { email, code: code.join('') } });
          setErrorMessage('');
        } else {
          const errorData = await response.json();
          setErrorMessage(`Password reset failed: ${errorData.detail}`);
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred. Please try again.');
      }
    } else {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  };

  return (
    <>
    <Box>
      <BackButton />
    </Box>
    <Flex minH={'100vh'}>

     {/* Left Side */}
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
     <Box>
         <img src={image}  height={600} width={600}/>
     </Box>
 </Box>

 {/* Right Side */}
    <Flex  flex={1} align={'center'} justify={'center'} bg={useColorModeValue('gray.50')}>
    
      <Stack
        spacing={6}
        w={'full'}
        maxW={'sm'} 
        rounded={'xl'}
        p={6}
        my={12}
      >
       <Text fontSize="2xl" >  Forgot your password?.</Text>
        <p>Enter your email</p>

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
            isLoading={loading}
            spinner={<Spinner size="sm" color="white" />}
            >
              {loading ? '' : 'Send Email'}
          
          </Button>
        </Stack>


        <FormControl>
          <Stack direction="row" spacing={4} justify="center">
            <PinInput>
              {code.map((digit, index) => (
                <PinInputField
                  key={index}
                  value={digit}
                  onChange={(e) => handleCodeChange(e.target.value, index)}
                />
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
      
          {successMessage && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle mr={2}>
                <center>{isResend ? 'Email has been resent.' : 'Success!'}</center>
              </AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
              <CloseButton position="absolute" right="8px" top="8px" onClick={() => setSuccessMessage('')} />
            </Alert>
          )}

          {errorMessage && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error!</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
              <CloseButton position="absolute" right="8px" top="8px" onClick={() => setErrorMessage('')} />
            </Alert>
          )}

          <div align={'right'}>
            <Button variant="link" colorScheme="blue" onClick={() => handleSendEmail(true)}>
              Re-send the email
            </Button>
          </div>
        </Stack>
      
      </Flex>
    </Flex>
    </>
  );
}
