import {useEffect, useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarUser from "../../components/dashboard/NavBarUser.jsx";

import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Icon,
    useToast
} from "@chakra-ui/react";
import axios from 'axios';
import NavBarQAE from "../../components/dashboard/NavBarQAE.jsx";
import {MdDriveFolderUpload} from "react-icons/md";

function AskHelp() {
    const location = useLocation();
    const navigate = useNavigate();
    const {projectName, code, review, suggestions, referLinks, fileName ,mode,language, description} = location.state || {};
    const role = sessionStorage.getItem('role');
    const [requestSubject, setRequestSubject] = useState('');
    const [requestText, setRequestText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const user = sessionStorage.getItem('email');
    const [projectID, setProjectID] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleSubjectChange = (event) => {
        setRequestSubject(event.target.value);
    };

    const handleRequestChange = (event) => {
        setRequestText(event.target.value);

    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!requestSubject || !requestText) {
            setErrorMessage("Please fill in both the subject and the request to submit.");
            return;
        }
        setErrorMessage('');
        onOpen();
    };

    useEffect(() => {
        const fetchProjectID = async () => {
            try {
                const new_p_id = await axios.get("http://localhost:8000/get-latest-p-id", {
                    params: {
                        user: user
                    }
                });
                setProjectID(new_p_id.data);
            } catch (error) {
                console.error("Error fetching the project ID:", error);
            }
        };

        fetchProjectID().then(r => console.log(r));
    }, [user]);

    const confirmSubmission = async () => {
        try {

            const requestData = {
                user:user,
                p_id:projectID,
                p_name:projectName,
                r_id:0,
                r_subject:requestSubject,
                r_content:requestText,
                qae:"",
                r_status:"Pending"
            };

            console.log("Sending request data:", requestData); // Log payload data

            const response = await axios.post(
                "http://localhost:8000/request",
                requestData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log("Server response:", response.data); // Log server response

            setRequestSubject('');
            setRequestText('');
            toast({
                title: "Action successful",
                description: "Request submitted successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            navigate('/cr', { state: { reviewContent:review, selectedFileName:fileName, mode:mode, suggestionContent:suggestions, referLinksContent:referLinks, projectName:projectName, language:language, description:description } });
        } catch (error) {
            console.error('Failed to save request:', error);
            if (error.response) {
                console.error('Error details:', error.response.data); // Log error details
                setErrorMessage(`Error: ${error.response.data.message}` || 'Failed to save request');
                toast({
                    title: "Action failure.",
                    description: "System failed to submit the request",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                setErrorMessage('Failed to save request');
            }
        }
    };

    return (
        <div>
            <div>
                {role === 'Developer' ?
                    <NavBarUser button1={false} button2={true} button3={true} button4={true}/> :
                    <NavBarQAE button1={false} button2={true} button3={true} button4={true} button5={true}/>
                };
            </div>
            <div className="grid grid-cols-2 divide-x py-4  mx-4">
                <div className="bg-gray-200 rounded-lg">
                    <Tabs isFitted className="grid grid-cols-2 divide-x py-4 ml-4" variant="enclosed" colorScheme="blue" height={"1100"}>
                        <TabList>
                            <Tab>Preview</Tab>
                            <Tab>Review</Tab>
                            <Tab>Suggestions</Tab>
                            <Tab>Reference Links</Tab>
                        </TabList>
                        <TabPanels className="h-full">
                            <TabPanel className="h-full overflow-auto">

                                <pre>{code}</pre>
                            </TabPanel>
                            <TabPanel className="h-full overflow-auto">
                                <pre>{review}</pre>
                            </TabPanel>
                            <TabPanel className="h-full overflow-auto">
                                <pre>{suggestions}</pre>
                            </TabPanel>
                            <TabPanel className="h-full overflow-auto">
                                <pre>{referLinks}</pre>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                <div className="px-4 bg-gray-200 rounded-lg mx-4 py-4">
                    <div>
                        <p>Type below the request:</p>
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="mb-8 mt-10">
                                <input
                                    className="shadow appearance-none border rounded w-full h-full py-2 px-3 text-gray-700 leading-tight
                                        focus:outline-none focus:shadow-outline mb-3"
                                    id="subject"
                                    type="text"
                                    placeholder="Enter a subject for your request"
                                    value={requestSubject}
                                    onChange={handleSubjectChange}
                                />
                                <textarea
                                    className="shadow appearance-none border rounded w-full h-80 py-2 px-3 text-gray-700 leading-tight
        focus:outline-none focus:shadow-outline"
                                    id="request"
                                    placeholder="Enter the request"
                                    value={requestText}
                                    onChange={handleRequestChange}
                                    rows={10} // You can adjust the number of rows to increase the height
                                ></textarea>

                            </div>
                            {errorMessage && (
                                <div className="text-red-500 mb-4">
                                    {errorMessage}
                                </div>
                            )}
                            <div className="flex items-center justify-end">

                                <Button
                                    isDisabled={!requestSubject || !requestText}
                                    border='2px'
                                    size="lg"
                                    colorScheme='blue'
                                    className="w-64"
                                    type={"submit"}
                                >


                                <Icon as={MdDriveFolderUpload} boxSize={6} color='white' className="mr-2"/>Submit
                                </Button>

                            </div>
                        </form>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Confirm Submission</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <p>Are you sure you want to submit?</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={confirmSubmission}>
                                        Yes
                                    </Button>
                                    <Button variant="ghost" onClick={onClose}>No</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AskHelp;
