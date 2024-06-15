

// import React, { useState } from 'react';
// import { Input, InputGroup, InputRightElement, Button, Alert, AlertIcon, FormControl, FormLabel, Checkbox, Text } from '@chakra-ui/react';
// import Devinsight from '../../assets/Devinsight.png';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function InteractiveForm() {
//     const [show, setShow] = useState(false);
//     const [showConfirm, setShowConfirm] = useState(false);
//     const handleClick = () => setShow(!show);
//     const handleConfirmClick = () => setShowConfirm(!showConfirm);

//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({
//         company_name: '',
//         company_uname: '',
//         admin_email: '',
//         company_address: '',
//         phone_number: '',
//         has_custom_domain: false,
//         domain: '',
//         first_name: '',
//         last_name: '',
//         password: '',
//         confirmPassword: '',
        
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (event) => {
//         const { name, value, type, checked } = event.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const checkEmailExists = async (email) => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/check-company-email', { params: { email } });
//             return response.data.exists;
//         } catch (error) {
//             console.error(error);
//             return false;
//         }
//     };

//     const checkUsernameExists = async (username) => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/check-company-username', { params: { username } });
//             return response.data.exists;
//         } catch (error) {
//             console.error(error);
//             return false;
//         }
//     };

//     const validateStep1 = async () => {
//         const newErrors = {};
//         if (!formData.company_name) newErrors.company_name = 'Company name is required';
//         if (!formData.company_uname) newErrors.company_uname = 'Company username is required';
//         if (!formData.admin_email) newErrors.admin_email = 'Admin email is required';
//         if (!formData.company_address) newErrors.company_address = 'Company address is required';
//         if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';

//         if (formData.has_custom_domain) {
//             if (!formData.domain) {
//                 newErrors.domain = 'Custom domain is required';
//             } else {
//                 const emailDomain = formData.admin_email.split('@')[1];
//                 if (emailDomain !== formData.domain) {
//                     newErrors.domain = 'Admin email domain does not match the custom domain';
//                 }
//             }
//         }

//         if (formData.admin_email) {
//             const emailExists = await checkEmailExists(formData.admin_email);
//             if (emailExists) newErrors.admin_email = 'Admin email already exists';
//         }

//         if (formData.company_uname) {
//             const usernameExists = await checkUsernameExists(formData.company_uname);
//             if (usernameExists) newErrors.company_uname = 'Company username already exists';
//         }

//         return newErrors;
//     };

//     const validateStep2 = () => {
//         const newErrors = {};
//         if (!formData.first_name) newErrors.first_name = 'First name is required';
//         if (!formData.last_name) newErrors.last_name = 'Last name is required';
//         if (!formData.password) newErrors.password = 'Password is required';
//         if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//         return newErrors;
//     };

//     const nextStep = async () => {
//         const newErrors = await validateStep1();
//         if (Object.keys(newErrors).length === 0) {
//             setStep(step + 1);
//         } else {
//             setErrors(newErrors);
//         }
//     };

//     const prevStep = () => {
//         setStep(step - 1);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newErrors = validateStep2();
//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }
//         try {
//             const { confirmPassword, ...dataToSubmit } = formData;
//             const response = await axios.post('http://127.0.0.1:8000/create-company', dataToSubmit);
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen">
//             <div className='border border-gray-300 p-8 rounded-lg shadow-lg w-1/2'>
//                 {step === 1 && (
//                     <div className="space-y-4">
//                         <div className='flex justify-center'>
//                             <img src={Devinsight} alt="Logo" className="w-1/3" />
//                         </div>

//                         <FormControl>
//                             <FormLabel htmlFor="company_name">Company Name</FormLabel>
//                             <Input
//                                 id="company_name"
//                                 type="text"
//                                 name="company_name"
//                                 value={formData.company_name}
//                                 onChange={handleChange}
//                             />
//                             {errors.company_name && <Alert status="error"><AlertIcon />{errors.company_name}</Alert>}
//                         </FormControl>

//                         <FormControl>
//                             <FormLabel htmlFor="company_uname">Company Username</FormLabel>
//                             <Input
//                                 id="company_uname"
//                                 name="company_uname"
//                                 type="text"
//                                 value={formData.company_uname}
//                                 onChange={handleChange}
//                             />
//                             {errors.company_uname && <Alert status="error"><AlertIcon />{errors.company_uname}</Alert>}
//                         </FormControl>

//                         <FormControl>
//                             <Checkbox
//                                 id="has_custom_domain"
//                                 name="has_custom_domain"
//                                 isChecked={formData.has_custom_domain}
//                                 onChange={handleChange}
//                             >
//                                 Do you have a custom domain?
//                             </Checkbox>
//                             <Text fontSize="sm" color="gray.500" p="4">
//                                 With the custom domain helps to verify users company when sign in, Otherwise admin need to accept sign in requests.
//                             </Text>
//                         </FormControl>

//                         <FormControl>
//                             <FormLabel htmlFor="domain">Custom Domain</FormLabel>
//                             <Input
//                                 id="domain"
//                                 name="domain"
//                                 type="text"
//                                 value={formData.domain}
//                                 onChange={handleChange}
//                                 disabled={!formData.has_custom_domain} // Disables the input when custom domain is not selected
//                             />
//                             {errors.domain && <Alert status="error"><AlertIcon />{errors.domain}</Alert>}
//                         </FormControl>

//                         <FormControl>
//                             <FormLabel htmlFor="admin_email">Admin Email</FormLabel>
//                             <Input
//                                 id="admin_email"
//                                 name="admin_email"
//                                 type="email"
//                                 value={formData.admin_email}
//                                 onChange={handleChange}
//                             />
//                             {errors.admin_email && <Alert status="error"><AlertIcon />{                                errors.admin_email}</Alert>}
//                         </FormControl>

//                         <FormControl>
//                             <FormLabel htmlFor="company_address">Company Address</FormLabel>
//                             <Input
//                                 id="company_address"
//                                 name="company_address"
//                                 type="text"
//                                 value={formData.company_address}
//                                 onChange={handleChange}
//                             />
//                             {errors.company_address && <Alert status="error"><AlertIcon />{errors.company_address}</Alert>}
//                         </FormControl>

//                         <FormControl>
//                             <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
//                             <Input
//                                 id="phone_number"
//                                 name="phone_number"
//                                 type="text"
//                                 value={formData.phone_number}
//                                 onChange={handleChange}
//                             />
//                             {errors.phone_number && <Alert status="error"><AlertIcon />{errors.phone_number}</Alert>}
//                         </FormControl>

//                         <button type="button" onClick={nextStep} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                             Next
//                         </button>
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <>
//                         <div className="space-y-4">
//                             <div className='flex justify-center'>
//                                 <img src={Devinsight} alt="Logo" className="w-1/3" />
//                             </div>
//                             <div className="flex space-x-4">
//                                 <FormControl>
//                                     <FormLabel htmlFor="first_name">First Name</FormLabel>
//                                     <Input
//                                         id="first_name"
//                                         type="text"
//                                         name="first_name"
//                                         value={formData.first_name}
//                                         onChange={handleChange}
//                                     />
//                                     {errors.first_name && <Alert status="error"><AlertIcon />{errors.first_name}</Alert>}
//                                 </FormControl>

//                                 <FormControl>
//                                     <FormLabel htmlFor="last_name">Last Name</FormLabel>
//                                     <Input
//                                         id="last_name"
//                                         type="text"
//                                         name="last_name"
//                                         value={formData.last_name}
//                                         onChange={handleChange}
//                                     />
//                                     {errors.last_name && <Alert status="error"><AlertIcon />{errors.last_name}</Alert>}
//                                 </FormControl>
//                             </div>

//                             <FormControl>
//                                 <FormLabel htmlFor="password">Password</FormLabel>
//                                 <InputGroup size='md'>
//                                     <Input
//                                         pr='4.5rem'
//                                         id="password"
//                                         type={show ? 'text' : 'password'}
//                                         placeholder='Enter password'
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                     />
//                                     <InputRightElement width='4.5rem'>
//                                         <Button h='1.75rem' size='sm' onClick={handleClick}>
//                                             {show ? 'Hide' : 'Show'}
//                                         </Button>
//                                     </InputRightElement>
//                                 </InputGroup>
//                                 {errors.password && <Alert status="error"><AlertIcon />{errors.password}</Alert>}
//                             </FormControl>

//                             <FormControl>
//                                 <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
//                                 <InputGroup size='md'>
//                                     <Input
//                                         pr='4.5rem'
//                                         id="confirmPassword"
//                                         type={showConfirm ? 'text' : 'password'}
//                                         placeholder='Confirm password'
//                                         name="confirmPassword"
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                     />
//                                     <InputRightElement width='4.5rem'>
//                                         <Button h='1.75rem' size='sm' onClick={handleConfirmClick}>
//                                             {showConfirm ? 'Hide' : 'Show'}
//                                         </Button>
//                                     </InputRightElement>
//                                 </InputGroup>
//                                 {errors.confirmPassword && <Alert status="error"><AlertIcon />{errors.confirmPassword}</Alert>}
//                             </FormControl>
//                         </div>
//                         <button type="button" onClick={prevStep} className="mt-4 mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
//                             Previous
//                         </button>
//                         <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                             Submit
//                         </button>
//                     </>
//                 )}
//             </div>
//         </form>
//     );
// }

// export default InteractiveForm;

import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, Alert, AlertIcon, FormControl, FormLabel, Checkbox, Text, Progress } from '@chakra-ui/react';
import Devinsight from '../../assets/Devinsight.png';
import axios from 'axios';

function InteractiveForm() {
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const handleClick = () => setShow(!show);
    const handleConfirmClick = () => setShowConfirm(!showConfirm);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        company_name: '',
        admin_email: '',
        company_address: '',
        phone_number: '',
        has_custom_domain: false,
        domain: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }
    };

    const checkEmailExists = async (email) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/check-company-email', { params: { email } });
            return response.data.exists;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const validateStep1 = async () => {
        const newErrors = {};
        if (!formData.company_name) newErrors.company_name = 'Company name is required';
        if (!formData.admin_email) newErrors.admin_email = 'Admin email is required';
        if (!formData.company_address) newErrors.company_address = 'Company address is required';
        if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';

        if (formData.has_custom_domain) {
            if (!formData.domain) {
                newErrors.domain = 'Custom domain is required';
            } else {
                const emailDomain = formData.admin_email.split('@')[1];
                if (emailDomain !== formData.domain) {
                    newErrors.domain = 'Admin email domain does not match the custom domain';
                }
            }
        }

        if (formData.admin_email) {
            const emailExists = await checkEmailExists(formData.admin_email);
            if (emailExists) newErrors.admin_email = 'Admin email already exists';
        }

        return newErrors;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        return newErrors;
    };

    const nextStep = async () => {
        const newErrors = await validateStep1();
        if (Object.keys(newErrors).length === 0) {
            setStep(step + 1);
        } else {
            setErrors(newErrors);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateStep2();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const { confirmPassword, ...dataToSubmit } = formData;
            const response = await axios.post('http://127.0.0.1:8000/create-company', dataToSubmit);
            setSuccessMessage('Registration successful! Please check your email for verification.');
            setErrorMessage('');
        } catch (error) {
            console.error(error);
            setErrorMessage('Registration failed! Please try again.');
            setSuccessMessage('');
        }
    };

    const calculatePasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
        return score;
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen">
            <div className='border border-gray-300 p-8 rounded-lg shadow-lg w-1/2'>
                {step === 1 && (
                    <div className="space-y-4">
                        <div className='flex justify-center'>
                            <img src={Devinsight} alt="Logo" className="w-1/3" />
                        </div>

                        <FormControl>
                            <div className="flex"><FormLabel htmlFor="company_name">Organization Name</FormLabel> <Text className="text-sm text-gray-500">
                                Required
                                </Text></div>
                            <Input
                                id="company_name"
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                            />
                            {errors.company_name && <Alert status="error"><AlertIcon />{errors.company_name}</Alert>}
                        </FormControl>

                        <FormControl>
                            <Checkbox
                                id="has_custom_domain"
                                name="has_custom_domain"
                                isChecked={formData.has_custom_domain}
                                onChange={handleChange}
                            >
                                Do you have a custom domain?
                            </Checkbox>
                            <Text fontSize="sm" color="gray.500" p="4">
                                With the custom domain helps to verify users company when sign in, Otherwise admin need to accept sign in requests.
                            </Text>
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="domain">Custom Domain</FormLabel>
                            <Input
                                id="domain"
                                name="domain"
                                type="text"
                                value={formData.domain}
                                onChange={handleChange}
                                disabled={!formData.has_custom_domain} // Disables the input when custom domain is not selected
                            />
                            {errors.domain && <Alert status="error"><AlertIcon />{errors.domain}</Alert>}
                        </FormControl>

                        <FormControl>
                        <div className="flex"><FormLabel htmlFor="admin_email">Organization Email</FormLabel><Text className="text-sm text-gray-500">
                            Required
                            </Text></div>
                            <Input
                                id="admin_email"
                                name="admin_email"
                                type="email"
                                value={formData.admin_email}
                                onChange={handleChange}
                            />
                            {errors.admin_email && <Alert status="error"><AlertIcon />{errors.admin_email}</Alert>}
                        </FormControl>

                        <FormControl>
                        <div className="flex"><FormLabel htmlFor="company_address">Organization Address</FormLabel><Text className="text-sm text-gray-500">
                            Required
                            </Text></div>
                            <Input
                                id="company_address"
                                name="company_address"
                                type="text"
                                value={formData.company_address}
                                onChange={handleChange}
                            />
                            {errors.company_address && <Alert status="error"><AlertIcon />{errors.company_address}</Alert>}
                        </FormControl>

                        <FormControl>
                        <div className="flex"><FormLabel htmlFor="phone_number">Phone Number</FormLabel><Text className="text-sm text-gray-500">
                            Required
                            </Text></div>
                            <Input
                                id="phone_number"
                                name="phone_number"
                                type="text"
                                value={formData.phone_number}
                                onChange={handleChange}
                            />
                            {errors.phone_number && <Alert status="error"><AlertIcon />{errors.phone_number}</Alert>}
                        </FormControl>

                        <button type="button" onClick={nextStep} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Next
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <>
                        <div className="space-y-4">
                            <div className='flex justify-center'>
                                <img src={Devinsight} alt="Logo" className="w-1/3" />
                            </div>

                            <FormControl>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        id="password"
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password && <Alert status="error"><AlertIcon />{errors.password}</Alert>}
                                <Progress value={passwordStrength * 20} size="xs" colorScheme={passwordStrength >= 4 ? 'green' : passwordStrength >= 2 ? 'yellow' : 'red'} mt={2} />
                                <Text fontSize="sm" color="gray.500">{passwordStrength < 2 ? 'Weak' : passwordStrength < 4 ? 'Medium' : 'Strong'}</Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        id="confirmPassword"
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder='Confirm password'
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleConfirmClick}>
                                            {showConfirm ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.confirmPassword && <Alert status="error"><AlertIcon />{errors.confirmPassword}</Alert>}
                            </FormControl>
                        </div>
                        <button type="button" onClick={prevStep} className="mt-4 mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Previous
                        </button>
                        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                        {successMessage && <Alert status="success" className="mt-4"><AlertIcon />{successMessage}</Alert>}
                        {errorMessage && <Alert status="error" className="mt-4"><AlertIcon />{errorMessage}</Alert>}
                    </>
                )}
            </div>
        </form>
    );
}

export default InteractiveForm;
