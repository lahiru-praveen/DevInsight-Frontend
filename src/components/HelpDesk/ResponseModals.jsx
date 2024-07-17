import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button,
    Text, Tabs, TabList, Tab, TabPanels, TabPanel, Tooltip, Box, useToast, Select
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import axios from "axios";
import { useEffect, useState } from 'react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

const newTheme = {
    p: (props) => {
        const { children } = props;
        return (
            <Text mb={2} fontSize={'18px'} fontWeight='light'>
                {children}
            </Text>
        );
    },
};

const ResponseModal = ({ isOpen, onClose, p_id, p_name, r_id, subject, request, response }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [codeContent, setCodeContent] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [suggestionContent, setSuggestionContent] = useState('');
    const [referLinksContent, setReferLinksContent] = useState('');
    const [response_content, setResponseContent] = useState(response || '');
    const [isTextBoxVisible, setIsTextBoxVisible] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showForwardConfirmationModal, setShowForwardConfirmationModal] = useState(false);
    const [showOptionsModal, setShowOptionsModal] = useState(false);
    const [selectedName, setSelectedName] = useState('');

    const user = sessionStorage.getItem('email');
    const navigate = useNavigate();
    const toast = useToast(); // Toast hook for notifications

    const names = ['lahirupraveen43@gmail.com', 'buwanekamara@gmail.com', 'ramajinignanasuthan@gmail.com']; // Example names

    const handleButtonClick = () => {
        setIsTextBoxVisible(true);
    };

    const handleTextBoxChange = (event) => {
        setResponseContent(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!response_content) {
            toast({
                title: "Response text cannot be empty.",
                description: "Please enter a response before submitting.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        setShowConfirmationModal(true);
    };

    const confirmSubmission = async () => {
        setShowConfirmationModal(false);
        try {
            const response = await axios.post(
                'http://localhost:8000/save-response',
                {
                    response_content: response_content,
                    p_id: p_id,
                    r_id: r_id,
                    user: user
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Response saved successfully:', response.data);
            setResponseContent(response_content);
            onClose();
            toast({
                title: "Response Submitted",
                description: "Your response has been successfully submitted.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate('/qhr');  // Redirect to QHR page after submission
        } catch (error) {
            console.error('Failed to save response:', error);
            toast({
                title: "Submission Failed",
                description: "There was an error submitting your response.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const cancelSubmission = () => {
        setShowConfirmationModal(false);
    };

    const handleForwardButtonClick = () => {
        setShowForwardConfirmationModal(true);
    };

    const confirmForward = () => {
        setShowForwardConfirmationModal(false);
        setShowOptionsModal(true);
    };

    const cancelForward = () => {
        setShowForwardConfirmationModal(false);
    };

    const handleOptionSubmit = async () => {
        setShowOptionsModal(false);
        try {
            const response = await axios.post(
                'http://localhost:8000/forward-request',
                {
                    selectedName: selectedName,
                    p_id: p_id,
                    r_id: r_id,
                    user: user
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Request forwarded successfully:', response.data);
            onClose();
            toast({
                title: "Forwarding Failed",
                description: "There was an error forwarding the request.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            navigate('/qhr');  // Redirect to QHR page after forwarding the request
        } catch (error) {
            console.error('Failed to forward request:', error);

            toast({
                title: "Request Forwarded",
                description: `The request has been forwarded to: ${selectedName}.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });

        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/get-review/${p_id}`, {
                    params: { user: user }
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
        const confirmed = window.confirm("\u26A0 \t" + " RECORD DELETION\n\n" + "Are you sure you want to delete this code submission?");
        setIsDeleting(true);
        try {
            if (confirmed) {
                const response = await axios.delete(`http://localhost:8000/delete-request`, {
                    params: { p_id, user, r_id }
                });
                if (response.status === 200) {
                    toast({
                        title: "Submission Deleted",
                        description: "The submission has been deleted successfully.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    onClose();
                    window.location.reload();
                } else {
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
                                <TabPanels className="h-full">
                                    <TabPanel className="h-full overflow-auto">
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
                            <p className="font-bold mb-4">Subject: </p>
                            <p className="mb-4">{subject}</p>
                            <p className="font-bold mb-4">Request: </p>
                            <p className="mb-4">{request}</p>
                            <p className="font-bold mb-4">Response: </p>

                            {response ? (
                                <p className="mb-4">{response}</p>
                            ) : (
                                <>
                                    {isTextBoxVisible ? (
                                        <form className="w-full" onSubmit={handleSubmit}>
                                            <div className="mb-8 mt-10">
                                                <textarea
                                                    className="shadow appearance-none border rounded w-full h-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="response"
                                                    placeholder="Enter response"
                                                    value={response_content}
                                                    onChange={handleTextBoxChange}
                                                    maxLength={100}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between space-x-4">
                                                <Tooltip
                                                    hasArrow
                                                    label={!response_content ? 'Response text cannot be empty.' : 'Submit the response'}
                                                    bg={!response_content ? 'red.200' : 'blue.200'}
                                                    placement='bottom'
                                                >
                                                    <Button
                                                        isDisabled={!response_content}
                                                        border='2px'
                                                        colorScheme='blue'
                                                        type="submit"
                                                    >
                                                        Submit
                                                    </Button>
                                                </Tooltip>
                                                <Button
                                                    border='2px'
                                                    colorScheme='gray'
                                                    onClick={() => setIsTextBoxVisible(false)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <Button
                                                border='2px'
                                                colorScheme='blue'
                                                onClick={handleButtonClick}
                                            >
                                                Enter Response
                                            </Button>
                                            {!isTextBoxVisible && (
                                                <Button
                                                    colorScheme='blue'
                                                    onClick={handleForwardButtonClick}
                                                >
                                                    Forward
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {/*<Button colorScheme='blue' mr={3} onClick={handleDelete} isLoading={isDeleting}>*/}
                    {/*    Delete*/}
                    {/*</Button>*/}
                    <Button variant='ghost' onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>

            {/* Confirmation Modal for submission */}
            <Modal isOpen={showConfirmationModal} onClose={() => setShowConfirmationModal(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Submission</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to submit this response?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={confirmSubmission}>
                            Yes
                        </Button>
                        <Button variant='ghost' onClick={cancelSubmission}>
                            No
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Forward Confirmation Modal */}
            <Modal isOpen={showForwardConfirmationModal} onClose={() => setShowForwardConfirmationModal(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Forwarding</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to forward this request?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={confirmForward}>
                            Yes
                        </Button>
                        <Button variant='ghost' onClick={cancelForward}>
                            No
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Options Modal with Dropdown */}
            <Modal isOpen={showOptionsModal} onClose={() => setShowOptionsModal(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Forward Request</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Select placeholder="Select another qae" value={selectedName} onChange={(e) => setSelectedName(e.target.value)}>
                            {names.map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))}
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            onClick={handleOptionSubmit}
                            isDisabled={!selectedName}
                        >
                            Forward
                        </Button>
                        <Button variant="ghost" onClick={() => setShowOptionsModal(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Modal>
    );
};

ResponseModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    p_id: PropTypes.string.isRequired,
    p_name: PropTypes.string.isRequired,
    r_id: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    request: PropTypes.string.isRequired,
    response: PropTypes.string,
};

export default ResponseModal;
