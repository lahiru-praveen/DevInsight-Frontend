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
    Flex
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SubmissionModal = ({ isOpen, onClose, p_name, code }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'fit'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{p_name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex alignItems="center" justifyContent="center">
                        <div>
                            <Tabs variant='soft-rounded' colorScheme='blue'>
                                <TabList>
                                    <Tab>Code</Tab>
                                    <Tab>Review</Tab>
                                    <Tab>Help Requests</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                                            <pre>
                                                {code}
                                            </pre>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                                            <pre>
                                                Review
                                            </pre>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="font-bold bg-[#EBEBEB] color-[#898989] p-10 m-2">
                                            <pre>
                                                Request Details
                                            </pre>
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                    </Flex>
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
};

export default SubmissionModal;
