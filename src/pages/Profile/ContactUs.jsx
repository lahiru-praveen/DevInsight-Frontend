import React, { useState } from 'react';
import emailjs from "emailjs-com"
import {
    Button,
    Heading,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Select
   } from '@chakra-ui/react';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email
    emailjs.send('service_ze83lzg', 'template_0er8c5m', {
      c_name: name,
      c_email: email,
      c_subject: subject,
      c_message: message
    }, 'pi_OZJS01t_taFQHw')
        .then((response) => {
          console.log('Email sent:', response);
          setIsSuccess(true);
          setIsError(false);

            // Reset form fields after sending the email
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        }, (error) => {
            console.error('Email send error:', error);
            alert('An error occurred. Please try again later.');
        });
  };

  return (
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md flex">
          <div className=" flex-1 mt-32 mr-16 ">
             <Heading fontSize="6xl" >Contact Us</Heading> 
            <br/>
            <p className="text-left text-2xl  mb-8 lg:mb-16  text-gray-500 dark:text-gray-400 ">
              Need to get touch with us?<br/> Either fill out the form with your inquiry or find the depatment email you like to contact below 
            </p>
</div>

           <div className="flex-1">
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
           bg="green.500"
           color="white"
           padding="1rem"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Your message sent successfully!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Thanks for submitting your application. Our team will get back to you soon.
              </AlertDescription>
            </Alert>
          )}

            <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="@gmail.com" required />
              </div>
              <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <Select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Select a subject" required>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Support">Support</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Message</label>
              <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a Message..." spellCheck="true"></textarea>
            </div>
              <Button 
                       bg={'blue.400'}
                       color={'white'}
                       onClick={handleSubmit}>
                       Send Message
              </Button>
            </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
