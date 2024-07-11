
import { useState } from 'react';
import emailjs from "emailjs-com";
import {
  Button,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  Textarea,
  Select,
  Box,
} from '@chakra-ui/react';

import MailSentImg from '../../assets/email.gif';
import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
import NavBarQAE from "../../components/dashboard/NavBarQAE.jsx";

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const role = sessionStorage.getItem('role');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!name || !email || !subject || !message) {
      console.log('all feild filled:');
        setIsError(true);
        setTimeout(() => setIsError(false), 8000);
        return;
    }

    // Send email
    emailjs.send('service_ze83lzg', 'template_0er8c5m', { // service and template
      c_name: name,
      c_email: email,
      c_subject: subject,
      c_message: message
    }, 'RpcqYlAsefwq23rYY') //public key
      .then((response) => {
        console.log('Email sent:', response);
        setIsSuccess(true);
        setIsError(false);

        // Reset form fields after sending the email
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');

        setTimeout(() => setIsSuccess(false), 8000);
      }, (error) => {
        console.error('Email send error:', error);
        console.error('Error details:', error.text);
        setIsError(true);
        setTimeout(() => setIsError(false), 8000);
      });
  };


  return (
      <div className="flex flex-col h-screen ">
      <div>
        {role === 'Developer' ?
            <NavBarUser button1={false} button2={false} button3={false} button4={false}/> :
            <NavBarQAE button1={false} button2={false} button3={false} button4={false} button5={false}/>
        };
      </div>
      <section className="bg-white">
       
        <div className="flex flex-col lg:flex-row mx-auto max-w-screen-md py-8 lg:py-16 px-4">
          <div className="flex-1 bg-gray-000 text-black p-8 rounded-lg">
            <Box textAlign="left">
              <Heading fontSize="5xl" mb={10}>Contact Us</Heading>
            </Box>
            <div className="flex flex-col items-center">
              <img src={MailSentImg} alt="Mail sent illustration" className=" mb-4"/>
              <p className="text-center text-lg ">
                If you have questions or just want to get in touch, use the form below. We look forward to hearing from
                you!
              </p>
            </div>
          </div>

          <div className="flex-1 mt-8 lg:mt-0 lg:ml-8">


            {isSuccess && (
                <Alert
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                    mb={4}
                    position="fixed"
                    bottom="0"
                    left="0"
                    width="100%"
                    zIndex="9999"
                    bg="green.200"
                    color="white"
                    padding="1rem"
                >
                  <AlertIcon boxSize="40px" mr={0}/>
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    Your message sent successfully!
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    Thanks for submitting your application. Our team will get back to you soon.
                  </AlertDescription>
                </Alert>
            )}

            {isError && (
                <Alert
                    status="error"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                    mb={4}
                    position="fixed"
                    bottom="0"
                    left="0"
                    width="100%"
                    zIndex="9999"
                    bg="red.500"
                    color="white"
                    padding="1rem"
                >
                  <AlertIcon boxSize="40px" mr={0}/>
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    Error sending message
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    Please fill out all fields and try again.
                  </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your
                  Name</label>
                <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                       placeholder="Name" isRequired/>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User
                  Email</label>
                <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                       placeholder="email@example.com" isRequired/>
              </div>
              <div>
                <label htmlFor="subject"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                <Select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}
                        className="block p-3 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-700 dark:border-gray-600 placeholder-gray-10 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Let us know how we can help you" isRequired>
                  <option value="General Inquiry" className="text-gray-900">General Inquiry</option>
                  <option value="Support" className="text-gray-900">Support</option>
                  <option value="Feedback" className="text-gray-900">Feedback</option>
                  <option value="Other" className="text-gray-900">Other</option>
                </Select>
              </div>
              <div>
                <label htmlFor="message"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Message</label>
                <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)}
                          placeholder="Leave a Message..."
                          rows="6" isRequired/>
              </div>
              <Button type="submit" colorScheme="blue" width="full">
                Send
              </Button>
            </form>
          </div>
        </div>
      </section>
      </div>
  );
};

export default ContactUs;

