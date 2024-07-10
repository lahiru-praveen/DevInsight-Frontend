import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Text, Box,} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import axios from "axios";
import {useEffect, useState} from "react";

const SubmissionModal = ({ isOpen, onClose, p_name, code , des , entity_id}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [reviewContent, setReviewContent] = useState('');
    const [suggestionContent, setSuggestionContent] = useState('');
    const [referLinksContent, setReferLinksContent] = useState('');
    const user = sessionStorage.getItem('email');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/get-review/${entity_id}`, {
                    params: {
                        user: user
                    }
                });
                console.log("Fetch Result: ", result); // Log the entire response
                const { review, suggestions, reference_links } = result.data;
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
    }, [isOpen, entity_id]);


    const handleDelete = async () => {
        const confirmed = window.confirm("\u26A0 \t" + " RECORD DELETION\n\n"+"Are you sure you want to delete this code submission?");
        setIsDeleting(true);
        try {
            if (confirmed) {
                const response = await axios.delete("http://localhost:8000/delete-sub", {data: { entity_id, user }});
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
                    <div>
                        <Tabs variant='soft-rounded' colorScheme='blue'>
                            <div>
                                <TabList>
                                    <Tab>Code</Tab>
                                    <Tab>Review</Tab>
                                    <Tab>Help Requests</Tab>
                                </TabList>
                            </div>
                            <TabPanels>
                                <div>
                                    <TabPanel>
                                        <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                                            <Text className="text-xl font-bold mr-2">Description - </Text>
                                            <Box bg='white' p={4} color='black' className="mt-2 mb-8">
                                                <Text>{des}</Text>
                                            </Box>
                                            <Text className="text-xl font-bold mr-2">Code - </Text>
                                            <Box bg='white'  p={4} className="mt-2 mb-8">
                                                <pre>{code}</pre>
                                            </Box>
                                        </div>
                                    </TabPanel>
                                </div>
                                <div>
                                    <TabPanel>
                                        <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                                            <Text className="text-xl font-bold mr-2">Review - </Text>
                                            <Box bg='white' p={4} color='black' className="mt-2 mb-8">
                                                <pre>{reviewContent}</pre>
                                            </Box>
                                            <Text className="text-xl font-bold mr-2">Suggestions - </Text>
                                            <Box bg='white'  p={4} className="mt-2 mb-8">
                                                <pre>{suggestionContent}</pre>
                                            </Box>
                                            <Text className="text-xl font-bold mr-2">Reference Links - </Text>
                                            <Box bg='white'  p={4} className="mt-2 mb-8">
                                                <pre>{referLinksContent}</pre>
                                            </Box>
                                        </div>
                                    </TabPanel>
                                </div>
                                <div>
                                    <TabPanel>
                                        <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                                            <pre>
                                                Request Details
                                            </pre>
                                        </div>
                                    </TabPanel>
                                </div>
                            </TabPanels>
                        </Tabs>
                    </div>
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

SubmissionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    p_name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
    entity_id: PropTypes.number.isRequired, // Add entity_id to PropTypes
};

export default SubmissionModal;
