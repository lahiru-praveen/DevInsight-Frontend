import React, { useState, useEffect } from 'react';
import { Input, Button, Alert, AlertIcon, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function CompletionForm() {
    const [formData, setFormData] = useState({
        company_name: '',
        company_address: '',
        phone_number: '',
        has_custom_domain: false,
        domain: '',
        password: '',
        confirmPassword: '',
        logo_url: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            
            const response = await axios.post('http://127.0.0.1:8000/complete-registration', { ...formData, token });
            setSuccessMessage('Registration successful! You can now log in.');
            setErrorMessage('');
            setTimeout(() => navigate('/login'), 3000);  // Redirect to login after 3 seconds
        } catch (error) {
            console.error(error);
            setErrorMessage('Registration failed! Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen">
            <div className='border border-gray-300 p-8 rounded-lg shadow-lg w-1/2'>
                <div className="space-y-4">
                    <FormControl>
                        <FormLabel htmlFor="company_name">Organization Name</FormLabel>
                        <Input
                            id="company_name"
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="company_address">Organization Address</FormLabel>
                        <Input
                            id="company_address"
                            type="text"
                            name="company_address"
                            value={formData.company_address}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
                        <Input
                            id="phone_number"
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <Input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </FormControl>
                    {errorMessage && <Alert status="error"><AlertIcon />{errorMessage}</Alert>}
                    {successMessage && <Alert status="success"><AlertIcon />{successMessage}</Alert>}
                    <Button type="submit" colorScheme="blue" className="mt-4">
                        Complete Registration
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default CompletionForm;