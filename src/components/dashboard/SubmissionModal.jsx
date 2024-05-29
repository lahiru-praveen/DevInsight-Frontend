import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Flex, Text, Box
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SubmissionModal = ({ isOpen, onClose, p_name, code , des }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'fit'}>
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
                                            <pre>
                                                Review
                                            </pre>
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
                    <Button colorScheme="red" className="mr-4">
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
};

export default SubmissionModal;
