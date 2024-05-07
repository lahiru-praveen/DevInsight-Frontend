import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import Devinsight from '../../assets/Devinsight.png';
import axios from 'axios'; // Import Axios

function InteractiveForm() {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const [step, setStep] = useState(1); // State to manage the current step of the form
    const [formData, setFormData] = useState({
        company_name: '',
        company_uname: '',
        company_email: '',
        backup_email: '',
        manager_email: '',
        first_name: '',
        last_name: '',
        password: '',
        projectDetails: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            password: event.target.value
        }));
    };

    const nextStep = () => {
        setStep(step + 1); // Move to the next step
    };

    const prevStep = () => {
        setStep(step - 1); // Move to the previous step
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send POST request to the backend endpoint
            const response = await axios.post('http://127.0.0.1:8001/create-company', formData);
            console.log(response.data); // Log the response data
            // Handle success, e.g., show a success message or redirect
        } catch (error) {
            console.error(error); // Log the error
            // Handle error, e.g., show an error message
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen">
           <div className= 'border border-gray-300 p-8 rounded-lg shadow-lg w-1/2'>
                {step === 1 && (
                    <div className="space-y-4">
                        {/* Name input field */}
                        <div className="flex flex-col space-y-4">
                            <div className='flex justify-center'>
                        <img src={Devinsight} alt="Logo" className="w-1/3" />
                        </div>
                        <div>
                            <Input
                                placeholder='Company Name'
                                id="company_name"
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Number input field */}
                        <div>
                            <Input
                                placeholder='Company Username'
                                id="company_uname"
                                name="company_uname"
                                type="text"
                                value={formData.company_uname}
                                onChange={handleChange}
                            />
                        </div>

                        
                        <div>
                            <Input
                                placeholder='Company Email'
                                id="company_email"
                                name="company_email"
                                type="email"
                                value={formData.company_email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Input
                                placeholder='Backup Email'
                                id="backup_email"
                                name="backup_email"
                                type="email"
                                value={formData.backup_email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Input
                                placeholder='Manager Email'
                                id="manager_email"
                                name="manager_email"
                                type="email"
                                value={formData.manager_email}
                                onChange={handleChange}
                            />
                        </div>
                        </div>

                        <button type="button" onClick={nextStep} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Next
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <>
                        {/* Date of completion input field */}
                        <div className="space-y-4">
                        <div className='flex justify-center'>
                        <img src={Devinsight} alt="Logo" className="w-1/3" />
                        </div>
                            <div className="flex space-x-4">
                                <Input
                                    placeholder='First Name'
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                                <Input
                                    placeholder='Last Name'
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Input
                                    placeholder='Enter Email'
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    id="password"
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    // value={formData.password}
                                    onChange={handleChange}
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
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