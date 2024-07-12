import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Box, Popover,
    PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, useDisclosure
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import axios from "axios";
import { useEffect, useState } from "react";

const RequestModal = ({ isOpen, onClose, p_name, subject, request, r_id, p_id }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [responseContent, setResponseContent] = useState('');
    const user = sessionStorage.getItem('email');
    const [selectedRating, setSelectedRating] = useState(0);
    const {
        isOpen: isPopoverOpen,
        onOpen: onPopoverOpen,
        onClose: onPopoverClose,
    } = useDisclosure();

    const handleStarAndConfirmation = (rating) => {
        setSelectedRating(rating);
        onPopoverOpen(); // Open the popover when a star is clicked
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/get-response`, {
                    params: {
                        p_id: p_id,
                        user: user,
                        r_id: r_id
                    }
                });
                console.log("Fetch Result: ", result); // Log the entire response
                const { response_content } = result.data;
                setResponseContent(response_content);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };
        if (isOpen) {
            fetchData();
        }
    }, [isOpen, p_id, r_id, user]);

    const handleDelete = async () => {
        const confirmed = window.confirm("\u26A0 \t" + " RECORD DELETION\n\n" + "Are you sure you want to delete this code submission?");
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
                    console.error("Delete failed:", response.data);
                }
            }
        } catch (error) {
            console.error("An error occurred while deleting:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const submitRating = async () => {
        try {
            await axios.post('http://localhost:8000/submit-feedback', {
                p_id: p_id,
                r_id: r_id,
                user: user,
                feedback: selectedRating,
            });
            alert("Feedback submitted successfully");
            onPopoverClose();
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert("Failed to submit feedback");
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
                        <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                            <Text className="text-xl font-bold mr-2">Subject - </Text>
                            <Box bg='white' p={4} color='black' className="mt-2 mb-8">
                                <Text>{subject}</Text>
                            </Box>
                            <Text className="text-xl font-bold mr-2">Request - </Text>
                            <Box bg='white' p={4} className="mt-2 mb-8">
                                <pre>{request}</pre>
                            </Box>
                            <Text className="text-xl font-bold mr-2">Response - </Text>
                            <Box bg='white' p={4} className="mt-2 mb-8">
                                <pre>{responseContent}</pre>
                            </Box>

                            <div className="flex items-center space-x-2 text-xl font-bold">
                                <div>
                                    <p className="text-xl font-bold">Feedback</p>
                                </div>
                                <div>
                                    {/* Render the star rating */}
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <span
                                            key={rating}
                                            className={rating <= selectedRating ? "text-blue-500 cursor-pointer" : "text-gray-300 cursor-pointer"}
                                            onClick={() => handleStarAndConfirmation(rating)}
                                        >
                                            ★
                                        </span>
                                    ))}

                                    {/* Popover for confirmation */}
                                    <Popover isOpen={isPopoverOpen} onClose={onPopoverClose}>
                                        <PopoverTrigger>
                                            {/* Hidden trigger element, popover is controlled programmatically */}
                                            <Button variant="unstyled" />
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverHeader>Confirm Rating</PopoverHeader>
                                            <PopoverBody>
                                                Are you sure you want to submit this rating of {selectedRating} stars?
                                            </PopoverBody>
                                            <PopoverFooter>
                                                <Button colorScheme="blue" onClick={submitRating} value={selectedRating}
                                                >
                                                    Confirm
                                                </Button>
                                                <Button variant="ghost" onClick={onPopoverClose}>Cancel</Button>
                                            </PopoverFooter>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </div>
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

RequestModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    p_name: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    request: PropTypes.string.isRequired,
    r_id: PropTypes.number.isRequired,
    p_id: PropTypes.number.isRequired,
};

export default RequestModal;
