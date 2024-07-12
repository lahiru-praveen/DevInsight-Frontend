import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Text, Box, useDisclosure, useToast} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const SubmissionModal = ({ isOpen, onClose, p_name, code, des, entity_id }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [reviewContent, setReviewContent] = useState('');
    const [suggestionContent, setSuggestionContent] = useState('');
    const [referLinksContent, setReferLinksContent] = useState('');
    const [requests, setRequests] = useState([]);
    const [response, setResponse] = useState([]);
    const user = sessionStorage.getItem('email');
    const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();
    const toast = useToast()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewResult = await axios.get(`http://localhost:8000/get-review/${entity_id}`, {
                    params: {
                        user: user,
                    },
                });
                const { review, suggestions, reference_links } = reviewResult.data;
                setReviewContent(review);
                setSuggestionContent(suggestions);
                setReferLinksContent(reference_links);

                const requestResult = await axios.get(`http://localhost:8000/get-request/${entity_id}`, {
                    params: {
                        user: user,
                    },
                });
                setRequests(requestResult.data);

                const responseResult = await axios.get(`http://localhost:8000/get-response-by-p_id/${entity_id}`, {
                    params: {
                        user: user,
                    },
                });
                setResponse(responseResult.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen, entity_id, user]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.delete("http://localhost:8000/delete-sub", {data: { entity_id, user }});
            if (response.status === 200) {
                onClose(); // Close the modal after deletion
                window.location.reload();
                toast({
                    title: 'Delete Successful.',
                    description: "Your submission deleted successfully.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
            } else {
                // Handle deletion failure
                console.error("Delete failed:", response.data);
                toast({
                    title: 'Delete Failed.',
                    description: "Your submission deleted failed.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                  });
            }
        } catch (error) {
            console.error("An error occurred while deleting:", error);
            toast({
                title: 'Delete Failed.',
                description: "Your submission deleted failed.",
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
        } finally {
            setIsDeleting(false);
            onConfirmClose();
        }
    };
    

    return (

        <>      
        <Modal isOpen={isOpen} onClose={onClose} size={'fit'} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text className="text-xl font-bold mr-2">{p_name}</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div>
                        <Tabs variant="soft-rounded" colorScheme="blue">
                            <TabList>
                                <Tab>Code</Tab>
                                <Tab>Review</Tab>
                                <Tab>Suggestions</Tab>
                                <Tab>Refer Links</Tab>
                                {requests.map((request) => (
                                    <Tab key={request.r_id}>Request {request.r_id}</Tab>
                                ))}
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                                        <Text className="text-xl font-bold mr-2">Description - </Text>
                                        <Box bg="white" p={4} color="black" className="mt-2 mb-8">
                                            <Text>{des}</Text>
                                        </Box>
                                        <Text className="text-xl font-bold mr-2">Code - </Text>
                                        <Box bg="white" p={4} className="mt-2 mb-8">
                                            <pre>{code}</pre>
                                        </Box>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                                        <Text className="text-xl font-bold mr-2">Review - </Text>
                                        <Box bg="white" p={4} color="black" className="mt-2 mb-8">
                                            <pre>{reviewContent}</pre>
                                        </Box>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                                        <Text className="text-xl font-bold mr-2">Suggestions - </Text>
                                        <Box bg="white" p={4} className="mt-2 mb-8">
                                            <pre>{suggestionContent}</pre>
                                        </Box>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                                        <Text className="text-xl font-bold mr-2">Reference Links - </Text>
                                        <Box bg="white" p={4} className="mt-2 mb-8">
                                            <pre>{referLinksContent}</pre>
                                        </Box>
                                    </div>
                                </TabPanel>
                                {requests.map((request) => (
                                    <TabPanel key={request.r_id}>
                                        <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                                            <Text className="text-xl font-bold mr-2">{request.r_subject} </Text>
                                            <Box bg="white" p={4} color="black" className="mt-2 mb-10">
                                                <pre>{request.r_content}</pre>
                                            </Box>
                                            {response
                                                .filter((res) => res.r_id === request.r_id)
                                                .map((res) => (
                                                    <div key={res.r_id}>
                                                        {res.response_status === 'Completed' ?
                                                            <Text color="green" fontSize='xl' className="mr-2 mb-4">Response Status - {res.response_status}</Text> :
                                                            <Text color='red' fontSize='xl' className="mr-2 mb-4">Response Status - {res.response_status}</Text>
                                                        }
                                                        <Text className="text-lg mr-2">Response - </Text>
                                                        <Box bg="white" p={4} color="black" className="mt-2 mb-8">
                                                            <pre>{res.response_content}</pre>
                                                        </Box>
                                                        <Text className="text-lg font-bold mr-2">Responded Date - {res.date}</Text>
                                                    </div>
                                                ))}
                                        </div>
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </Tabs>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" className="mr-4" onClick={onConfirmOpen} isLoading={isDeleting}>
                        Delete
                    </Button>
                    <Button colorScheme="blue" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        <Modal isOpen={isConfirmOpen} onClose={onConfirmClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Confirm Deletion</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>Are you sure you want to delete this code submission?</Text>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="red" onClick={handleDelete} isLoading={isDeleting}>
                    Delete
                </Button>
                <Button colorScheme="blue" onClick={onConfirmClose} ml={3}>
                    Cancel
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </>  
    );
};

SubmissionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    p_name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
    entity_id: PropTypes.number.isRequired, // Add entity_id to PropTypes
};

export default SubmissionModal;
