import { useState } from 'react';
import emailjs from "emailjs-com";
import {
  Button,
  Heading,
  Input,
  Textarea,
  Select,
  Box,
  useToast,
} from '@chakra-ui/react';
import MailSentImg from '../../assets/email.gif';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!name || !email || !subject || !message) {
      toast({
        title: "Error sending message.",
        description: "Please fill out all fields and try again.",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
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
        toast({
          title: "Message sent successfully!",
          description: "Thanks for submitting your application. Our team will get back to you soon.",
          status: "success",
          duration: 8000,
          isClosable: true,
        });

        // Reset form fields after sending the email
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }, (error) => {
        console.error('Email send error:', error);
        console.error('Error details:', error.text);
        toast({
          title: "Error sending message.",
          description: "There was an error sending your message. Please try again later.",
          status: "error",
          duration: 8000,
          isClosable: true,
        });
      });
  };

  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row mx-auto max-w-screen-md py-8 lg:py-16 px-4">
        <div className="flex-1 bg-gray-000 text-black p-8 rounded-lg">
          <Box textAlign="left">
            <Heading fontSize="5xl" mb={10}>Contact Us</Heading>
          </Box>
          <div className="flex flex-col items-center">
            <img src={MailSentImg} alt="Mail sent illustration" className="mb-4" />
            <p className="text-center text-lg">
              If you have questions or just want to get in touch, use the form below. We look forward to hearing from
              you!
            </p>
          </div>
        </div>

        <div className="flex-1 mt-8 lg:mt-0 lg:ml-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Your Name
              </label>
              <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" isRequired />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                User Email
              </label>
              <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" isRequired />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Subject
              </label>
              <Select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="block p-3 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-700 dark:border-gray-600 placeholder-gray-10 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                isRequired
              >
                <option value="General Inquiry" className="text-gray-900">General Inquiry</option>
                <option value="Support" className="text-gray-900">Support</option>
                <option value="Feedback" className="text-gray-900">Feedback</option>
                <option value="Other" className="text-gray-900">Other</option>
              </Select>
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Message
              </label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a Message..."
                rows="6"
                isRequired
              />
            </div>
            <Button type="submit" colorScheme="blue" width="full">
              Send
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
