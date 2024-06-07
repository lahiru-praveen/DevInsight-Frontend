import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button, Alert, AlertIcon, FormControl, FormLabel } from '@chakra-ui/react';
import Devinsight from '../../assets/Devinsight.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

function InteractiveForm() {
    const [show, setShow] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const handleClick = () => setShow(!show);
    const handleConfirmClick = () => setShowConfirm(!showConfirm);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        company_name: '',
        company_uname: '',
        company_email: '',
        backup_email: '',
        manager_email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: '',
        email: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
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

    const checkUsernameExists = async (username) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/check-company-username', { params: { username } });
            return response.data.exists;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const validateStep1 = async () => {
        const newErrors = {};
        if (!formData.company_name) newErrors.company_name = 'Company name is required';
        if (!formData.company_uname) newErrors.company_uname = 'Company username is required';
        if (!formData.company_email) newErrors.company_email = 'Company email is required';
        if (!formData.backup_email) newErrors.backup_email = 'Backup email is required';
        if (formData.company_email === formData.backup_email) newErrors.backup_email = 'Backup email cannot be the same as company email';
        if (!formData.manager_email) newErrors.manager_email = 'Manager email is required';

        if (formData.company_email) {
            const emailExists = await checkEmailExists(formData.company_email);
            if (emailExists) newErrors.company_email = 'Company email already exists';
        }

        if (formData.company_uname) {
            const usernameExists = await checkUsernameExists(formData.company_uname);
            if (usernameExists) newErrors.company_uname = 'Company username already exists';
        }

        return newErrors;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
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
            console.log(response.data);
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen">
           <div className= 'border border-gray-300 p-8 rounded-lg shadow-lg w-1/2'>
                {step === 1 && (
                    <div className="space-y-4">
                        <div className='flex justify-center'>
                            <img src={Devinsight} alt="Logo" className="w-1/3" />
                        </div>

                        <FormControl>
                            <FormLabel htmlFor="company_name">Company Name</FormLabel>
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
                            <FormLabel htmlFor="company_uname">Company Username</FormLabel>
                            <Input
                                id="company_uname"
                                name="company_uname"
                                type="text"
                                value={formData.company_uname}
                                onChange={handleChange}
                            />
                            {errors.company_uname && <Alert status="error"><AlertIcon />{errors.company_uname}</Alert>}
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="company_email">Company Email</FormLabel>
                            <Input
                                id="company_email"
                                name="company_email"
                                type="email"
                                value={formData.company_email}
                                onChange={handleChange}
                            />
                            {errors.company_email && <Alert status="error"><AlertIcon />{errors.company_email}</Alert>}
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="backup_email">Backup Email</FormLabel>
                            <Input
                                id="backup_email"
                                name="backup_email"
                                type="email"
                                value={formData.backup_email}
                                onChange={handleChange}
                            />
                            {errors.backup_email && <Alert status="error"><AlertIcon />{errors.backup_email}</Alert>}
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="manager_email">Manager Email</FormLabel>
                            <Input
                                id="manager_email"
                                name="manager_email"
                                type="email"
                                value={formData.manager_email}
                                onChange={handleChange}
                            />
                            {errors.manager_email && <Alert status="error"><AlertIcon />{errors.manager_email}</Alert>}
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
                            <div className="flex space-x-4">
                                <FormControl>
                                    <FormLabel htmlFor="first_name">First Name</FormLabel>
                                    <Input
                                        id="first_name"
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                    {errors.first_name && <Alert status="error"><AlertIcon />{errors.first_name}</Alert>}
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="last_name">Last Name</FormLabel>
                                    <Input
                                        id="last_name"
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                    {errors.last_name && <Alert status="error"><AlertIcon />{errors.last_name}</Alert>}
                                </FormControl>
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
                    </>
                )}
            </div>
        </form>
    );
}

export default InteractiveForm;


// import React, { useState } from 'react';
// import { Input, InputGroup, InputRightElement, Button, Alert, AlertIcon } from '@chakra-ui/react';
// import Devinsight from '../../assets/Devinsight.png';
// import axios from 'axios';
// import { Redirect } from 'react-router-dom';

// function InteractiveForm() {
//     const [show, setShow] = useState(false);
//     const [showConfirm, setShowConfirm] = useState(false);
//     const handleClick = () => setShow(!show);
//     const handleConfirmClick = () => setShowConfirm(!showConfirm);

//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({
//         company_name: '',
//         company_uname: '',
//         company_email: '',
//         backup_email: '',
//         manager_email: '',
//         first_name: '',
//         last_name: '',
//         password: '',
//         confirmPassword: '',
//         email: ''
//     });

//     const [errors, setErrors] = useState({});
//     const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
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
//         if (!formData.company_email) newErrors.company_email = 'Company email is required';
//         if (!formData.backup_email) newErrors.backup_email = 'Backup email is required';
//         if (formData.company_email === formData.backup_email) newErrors.backup_email = 'Backup email cannot be the same as company email';
//         if (!formData.manager_email) newErrors.manager_email = 'Manager email is required';

//         if (formData.company_email) {
//             const emailExists = await checkEmailExists(formData.company_email);
//             if (emailExists) newErrors.company_email = 'Company email already exists';
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
//             setErrors({});
//         } else {
//             setErrors(newErrors);
//         }
//     };

//     const prevStep = () => {
//         setStep(step - 1);
//         setErrors({});
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
//             setFormSubmitted(true); // Set form submission state to true
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     if (formSubmitted) {
//         return <Redirect to="/as" />; // Redirect to "/ac" route upon successful form submission
//     }

//     return (
//         <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen">
//            <div className= 'border border-gray-300 p-8 rounded-lg shadow-lg w-1/2'>
//                 {step === 1 && (
//                     <div className="space-y-4">
//                         <div className='flex justify-center'>
//                             <img src={Devinsight} alt="Logo" className="w-1/3" />
//                         </div>

//                         <div>
//                             <Input
//                                 placeholder='Company Name'
//                                 id="company_name"
//                                 type="text"
//                                 name="company_name"
//                                 value={formData.company_name}
//                                 onChange={handleChange}
//                             />
//                             {errors.company_name && <Alert status="error"><AlertIcon />{errors.company_name}</Alert>}
//                         </div>

//                         <div>
//                             <Input
//                                 placeholder='Company Username'
//                                 id="company_uname"
//                                 name="company_uname"
//                                 type="text"
//                                 value={formData.company_uname}
//                                 onChange={handleChange}
//                             />
//                             {errors.company_uname && <Alert status="error"><AlertIcon />{errors.company_uname}</Alert>}
//                         </div>

//                         <div>
//                             <Input
//                                 placeholder='Company Email'
//                                 id="company_email"
//                                 name="company_email"
//                                 type="email"
//                                 value={formData.company_email}
//                                 onChange={handleChange}
//                             />
//                             {errors.company_email && <Alert status="error"><AlertIcon />{errors.company_email}</Alert>}
//                         </div>

//                         <div>
//                             <Input
//                                 placeholder='Backup Email'
//                                 id="backup_email"
//                                 name="backup_email"
//                                 type="email"
//                                 value={formData.backup_email}
//                                 onChange={handleChange}
//                             />
//                             {errors.backup_email && <Alert status="error"><AlertIcon />{errors.backup_email}</Alert>}
//                         </div>

//                         <div>
//                             <Input
//                                 placeholder='Manager Email'
//                                 id="manager_email"
//                                 name="manager_email"
//                                 type="email"
//                                 value={formData.manager_email}
//                                 onChange={handleChange}
//                             />
//                             {errors.manager_email && <Alert status="error"><AlertIcon />{errors.manager_email}</Alert>}
//                         </div>

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
//                                 <div>
//                                     <Input
//                                         placeholder='First Name'
//                                         id="first_name"
//                                         type="text"
//                                         name="first_name"
//                                         value={formData.first_name}
//                                         onChange={handleChange}
//                                     />
//                                     {errors.first_name && <Alert status="error"><AlertIcon />{errors.first_name}</Alert>}
//                                 </div>
//                                 <div>
//                                     <Input
//                                         placeholder='Last Name'
//                                         id="last_name"
//                                         type="text"
//                                         name="last_name"
//                                         value={formData.last_name}
//                                         onChange={handleChange}
//                                     />
//                                     {errors.last_name && <Alert status="error"><AlertIcon />{errors.last_name}</Alert>}
//                                 </div>
//                             </div>

//                             <InputGroup size='md'>
//                                 <Input
//                                     pr='4.5rem'
//                                     id="password"
//                                     type={show ? 'text' : 'password'}
//                                     placeholder='Enter password'
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                 />
//                                 <InputRightElement width='4.5rem'>
//                                     <Button h='1.75rem' size='sm' onClick={handleClick}>
//                                         {show ? 'Hide' : 'Show'}
//                                     </Button>
//                                 </InputRightElement>
//                             </InputGroup>
//                             {errors.password && <Alert status="error"><AlertIcon />{errors.password}</Alert>}

//                             <InputGroup size='md'>
//                                 <Input
//                                     pr='4.5rem'
//                                     id="confirmPassword"
//                                     type={showConfirm ? 'text' : 'password'}
//                                     placeholder='Confirm password'
//                                     name="confirmPassword"
//                                     value={formData.confirmPassword}
//                                     onChange={handleChange}
//                                 />
//                                 <InputRightElement width='4.5rem'>
//                                     <Button h='1.75rem' size='sm' onClick={handleConfirmClick}>
//                                         {showConfirm ? 'Hide' : 'Show'}
//                                     </Button>
//                                 </InputRightElement>
//                             </InputGroup>
//                             {errors.confirmPassword && <Alert status="error"><AlertIcon />{errors.confirmPassword}</Alert>}
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
