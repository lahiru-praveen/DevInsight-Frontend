import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBarQAE from "../../components/dashboard/NavBarQAE.jsx";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from 'axios';
import { Tooltip, Button, Icon } from '@chakra-ui/react';
import { MdDriveFolderUpload } from 'react-icons/md';

function QAECodePreview() {
    const location = useLocation();
    const { code, review } = location.state || {};

    const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showForwardConfirmationModal, setShowForwardConfirmationModal] = useState(false);
    const [showOptionsModal, setShowOptionsModal] = useState(false); // New state for options modal

    const handleButtonClick = () => {
        setIsTextBoxVisible(true);
    };

    const handleTextBoxChange = (event) => {
        setResponseText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!responseText) {
            // If response text is empty, show an error message
            alert('Response text cannot be empty.');
            return;
        }
        setShowConfirmationModal(true);
    };

    const confirmSubmission = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/sam/',
                { "response_text": responseText },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Response saved successfully:', response.data);
        } catch (error) {
            console.error('Failed to save response:', error);
            console.error('Error details:', error.response);
        }
        setShowConfirmationModal(false);
    };

    const cancelSubmission = () => {
        setShowConfirmationModal(false);
    };

    const handleForwardButtonClick = () => {
        setShowForwardConfirmationModal(true);
    };

    const confirmForward = () => {
        setShowForwardConfirmationModal(false);
        setShowOptionsModal(true); // Show the options modal when forwarding
    };

    const cancelForward = () => {
        setShowForwardConfirmationModal(false);
    };

    const handleOptionSubmit = (selectedOption) => {
        // Handle submission of the selected option here
        console.log('Selected Option:', selectedOption);
        setShowOptionsModal(false);
    };

    return (
        <div>
            <NavBarQAE />
            <div className="grid grid-cols-2 divide-x py-4 px-4 mx-4">
                <div className="bg-gray-200 rounded-lg">
                    <Tabs variant="enclosed" colorScheme="blue" height={"1100"}>
                        <TabList>
                            <Tab>Preview</Tab>
                            <Tab>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <pre>{code}</pre>
                            </TabPanel>
                            <TabPanel>
                                <pre>{review}</pre>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                <div className="px-4 bg-gray-200 rounded-lg mx-4 py-4">
                    <p>Subject: About functions </p>

                    <p>Request: How to add a variable inside the function</p>
                    {isTextBoxVisible ? (
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="mb-8 mt-10">
                                <input
                                    className="shadow appearance-none border rounded w-full h-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="response"
                                    type="text"
                                    placeholder="Enter response"
                                    value={responseText}
                                    onChange={handleTextBoxChange}
                                    maxLength={100}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Tooltip hasArrow
                                         label={!responseText ? 'Response text cannot be empty.' : 'Submit the codes/files'}
                                         bg={!responseText ? 'red.200' : 'blue.200'} placement='bottom'>
                                    <Button
                                        isDisabled={!responseText}
                                        border='2px'
                                        size="lg"
                                        colorScheme={!responseText ? 'red' : 'blue'}
                                        className="w-64"
                                        type={"submit"}
                                    >
                                        <Icon as={MdDriveFolderUpload} boxSize={6} color='white' className="mr-2"/>Submit
                                    </Button>
                                </Tooltip>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-2 divide-x py-4 px-4 mx-4">
                            <p
                                className="mt-10 flex items-center space-x-5 p-2 text-white w-50 rounded-lg bg-blue-500 mr-5"
                                onClick={handleButtonClick}
                            >
                                Send Response
                            </p>
                            <p
                                className="mt-10 flex items-center space-x-5 p-2 text-white w-50 rounded-lg bg-blue-500"
                                onClick={handleForwardButtonClick}
                            >
                                Forward to another QAE
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {showConfirmationModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg text-2xl shadow-lg p-8 w-100">
                        <p>Are you sure you want to submit?</p>
                        <div className="mt-4 flex justify-end">
                            <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={confirmSubmission}>
                                <a href="/qhr">Yes</a>
                            </button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelSubmission}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {showForwardConfirmationModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg text-2xl shadow-lg p-8 w-100">
                        <p>Are you sure you want to forward the request to another QAE?</p>
                        <div className="mt-4 flex justify-end">
                            <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={confirmForward}>
                                Yes
                            </button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelForward}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {showOptionsModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg text-2xl shadow-lg p-8 w-100">
                        <p>Select a valid reason to forward the request:</p>
                        <div className="mt-4"><a href="/qhr">
                            <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleOptionSubmit('Option 1')}>Unavailable</button>
                            <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleOptionSubmit('Option 2')}>Not my field</button>
                            <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleOptionSubmit('Option 3')}>Request is not clear</button>
                            {/*<button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleOptionSubmit('Option 4')}>Option 4</button>*/}
                            {/*<button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleOptionSubmit('Option 5')}>Option 5</button>*/}
                        </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
     );
 }

 export default QAECodePreview;

