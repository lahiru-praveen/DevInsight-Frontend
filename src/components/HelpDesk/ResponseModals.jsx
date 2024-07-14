import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Tooltip, Icon, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import axios from "axios";
import {useEffect, useState} from "react";
import {MdDriveFolderUpload} from "react-icons/md";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';

const newTheme = {
    p: props => {
        const { children } = props;
        return (
            <Text mb={2} fontSize={'18px'} fontWeight='light'>
                {children}
            </Text>
            
            
            
        );
    },
};


const ResponseModal = ({ isOpen, onClose, p_id, p_name, r_id, subject, request, response, response_content}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [codeContent, setCodeContent] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [suggestionContent, setSuggestionContent] = useState('');
    const [referLinksContent, setReferLinksContent] = useState('');
    const user = sessionStorage.getItem('email');
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/get-review/${p_id}`, {
                    params: {
                        user: user
                    }
                });
                console.log("Fetch Result: ", result);
                const { code, review, suggestions, reference_links } = result.data;
                setCodeContent(code);
                setReviewContent(review);
                setSuggestionContent(suggestions);
                setReferLinksContent(reference_links);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };
        if (isOpen) {
            fetchData().then(r => console.log(r));
        }
    }, [isOpen, p_id, user]);


    const handleDelete = async () => {
        const confirmed = window.confirm("\u26A0 \t" + " RECORD DELETION\n\n"+"Are you sure you want to delete this code submission?");
        setIsDeleting(true);
        try {
            if (confirmed) {
                const response = await axios.delete(`http://localhost:8000/delete-request`, {
                    params: { p_id, user, r_id }
                });
                if (response.status === 200) {
                    alert("Submission Deleted Successfully");
                    onClose(); // Close the modal after deletion
                    window.location.reload();
                } else {
                    // Handle deletion failure
                    console.error("Delete failed:", response.data);
                }
            }
        } catch (error) {
            console.error("An error occurred while deleting:", error);
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'fit'} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text className="text-xl font-bold mr-2">{p_name}</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="grid grid-cols-2 divide-x py-4 px-4 mx-4">
                        <div className="bg-gray-200 rounded-lg">
                            <Tabs variant="enclosed" colorScheme="blue" height={"1100"}>
                                <TabList>
                                    <Tab>Preview</Tab>
                                    <Tab>Review</Tab>
                                    <Tab>Suggestions</Tab>
                                    <Tab>Refer Links</Tab>
                                </TabList>
                                <TabPanels className="h-full" >
                                    <TabPanel className=" h-full overflow-auto">
                                        <Box p={4} m={0}>   
                                        <pre>{codeContent}</pre>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel className="h-full overflow-auto">
                                        <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
                                        {reviewContent}
                                        </ReactMarkdown>
                                    </TabPanel>
                                    <TabPanel className="h-full overflow-auto">
                                        <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
                                        {suggestionContent}
                                        </ReactMarkdown>
                                    </TabPanel>
                                    <TabPanel className="h-full overflow-auto">
                                        <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
                                        {referLinksContent}
                                        </ReactMarkdown>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                        <div className="px-4 bg-gray-200 rounded-lg mx-4 py-4">
                            <p>Subject: {subject} </p>

                            <p>Request: {request}</p>

                            <p>Response Sent: {response_content}</p>

                            {isTextBoxVisible ? (
                                <form className="w-full" onSubmit={handleSubmit}>
                                    <div className="mb-8 mt-10">
                                        <input
                                            className="shadow appearance-none border rounded w-full h-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="response"
                                            type="text"
                                            placeholder="Enter response"
                                            value={response}
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
                                                <Icon as={MdDriveFolderUpload} boxSize={6} color='white'
                                                      className="mr-2"/>Submit
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
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" className="mr-4" onClick={handleDelete} isLoading={isDeleting}>
                        Delete
                    </Button>
                    <Button colorScheme="blue" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

ResponseModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    p_name: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    request: PropTypes.string.isRequired,
    r_id: PropTypes.number.isRequired,
    p_id: PropTypes.number.isRequired,
    response: PropTypes.string.isRequired,
    response_content: PropTypes.string.isRequired,

};

export default ResponseModal;
