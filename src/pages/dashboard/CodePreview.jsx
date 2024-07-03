import { useState, useEffect } from 'react';
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs.css';
import {Tabs, TabList, TabPanels, Tab, TabPanel, Button, CircularProgress, Input, Text, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Tooltip} from '@chakra-ui/react';
import FileList from "../../components/dashboard/FileList.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { GoCodeReview } from "react-icons/go";
import { useCode } from '../../context/CodeContext.jsx';
import LanguageSelectMenu from "../../components/dashboard/LanguageSelectMenu.jsx";
import {IoHelpCircle, IoHome} from "react-icons/io5";
import {IoIosArrowForward} from "react-icons/io";
import {ChevronRightIcon} from "@chakra-ui/icons";
import NavBarUser from "../../components/dashboard/NavBarUser.jsx";

export default function CodePreview() {
    const { selectedFileContent, setSelectedFileContent } = useCode();
    const [selectedFileName, setSelectedFileName] = useState('');
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [selectedLine, setSelectedLine] = useState(null);
    const [projectID, setProjectID] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [suggestionContent, setSuggestionContent] = useState('');
    const [referLinksContent, setReferLinksContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    let { code, mode, language, description, projectName, user } = state || {};
    const mode_value = mode;



    const prName = projectName

    if (language === ""){
        language = "Not given";
    }
    const [Language, setLanguage] = useState(language);
    const handleLanguageChange = (language) => {setLanguage(language);};

    if (description === ""){
        description = "Not given";
    }
    const description_value = description;

    useEffect(() => {
        if (mode === 1 && code !== '') {
            setSelectedFileContent(code);
        }
    }, [code, mode, setSelectedFileContent]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/files/${selectedFileName}`);
                setSelectedFileContent(response.data);
            } catch (error) {
                console.error("Error fetching file content:", error);
            }
        };

        if (selectedFileName !== '') {
            fetchData().then(r => console.log(r) );
        }
    }, [mode, selectedFileName, setSelectedFileContent]);


    useEffect(() => {
        if (selectedFileContent) {
            hljs.highlightAll();
        }
    }, [selectedFileContent]);

    useEffect(() => {
        if (reviewContent !== '' && suggestionContent !== '' && referLinksContent !== '') {
            navigate('/cr', { state: { reviewContent: reviewContent, selectedFileName: selectedFileName, suggestionContent: suggestionContent, referLinksContent: referLinksContent, projectName: prName, language: Language, description: description_value, pID: projectID, user: user } });
        }
    }, [referLinksContent]);


    useEffect(() => {
        if (prName !== '' && selectedFileContent ) {
            setSubmitEnabled(true);
        } else {
            setSubmitEnabled(false);
        }
    }, [prName,selectedFileContent]);



    const handleSubmit = async () => {
        setIsModalOpen(true); // Open the modal
        console.log("Selected file name in CodePreview:", selectedFileName);
        try {
            if (!selectedFileContent) {
                console.error("Selected file content is empty.");
                return;
            }
            const llm = sessionStorage.getItem('llm');
            const url = llm === 'gemini' ? "http://localhost:8000/get-review-by-gemini" : "http://localhost:8000/get-review-by-openai";

            const response1 = await axios.post(url, {
                user: user,
                p_id: 0,
                p_name: prName,
                f_name: selectedFileName,
                language: Language,
                description: description_value,
                code: selectedFileContent,
                mode: mode_value
            });

            const new_p_id = await axios.get("http://localhost:8000/get-latest-p-id", {
                params: {
                    user: user
                }
            });
            setProjectID(new_p_id.data);

            const { review, suggestions, refer_link } = response1.data;
            setReviewContent(review);
            setSuggestionContent(suggestions);
            setReferLinksContent(refer_link);

            const response2 = await axios.post("http://localhost:8000/add-review",{
                user: user,
                p_id: new_p_id.data,
                code: selectedFileContent,
                review: review, 
                suggestions: suggestions,
                reference_links: refer_link
            });
            console.log(response2);

        } catch (error) {
            console.error("Error fetching review:", error);
        } finally {
            setIsModalOpen(false); // Close the modal
        }
    };




    function addLineNumbersToCode(code) {
        const lines = code.split('\n');
        const numberedCode = lines.map((line, index) => {
            const isSelected = selectedLine === index;
            const lineClass = isSelected ? 'bg-blue-100' : '';

            return (
                <div
                    key={index}
                    className={`flex ${lineClass}`}
                    onClick={() => setSelectedLine(index)}
                >
                    <div className="w-6 text-left text-gray-500 pr-20 user-select-none">
                        {index + 1}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(line).value }} />
                </div>
            );
        });

        return (
            <pre className="line-numbers">
                {numberedCode}
            </pre>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <div>
                <NavBarUser button1={false} button2={true} button3={true} button4={true}/>
            </div>

            <div className="flex flex-row flex-grow">
                <div className="w-full md:w-1/6 p-4 mt-3 ml-2 mr-2 bg-[#EBEBEB] flex flex-col">
                    <div className="flex items-center mt-2 ml-2 mr-2 mb-4">
                        <IoHome className="mr-1 mt-1"/>
                        <IoIosArrowForward className="mr-1 mt-1"/>
                        <Breadcrumb spacing='4px' separator={<ChevronRightIcon color='gray.500'/>}>
                            <BreadcrumbItem>
                                <BreadcrumbLink as={Link} to="/db">DashBoard</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink>Code Preview</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div>
                        <Text className="text-xl font-bold mr-2">Language</Text>
                        <LanguageSelectMenu onLanguageChange={handleLanguageChange} selectedLanguage={language}/>
                    </div>

                    <div>
                        <div className="flex items-center">
                            <Text className="text-xl font-bold mr-2">Project Name</Text>
                            <Text color="red.400" className="text-xl">*</Text>
                        </div>
                        <div className="mb-4">
                            <Input value={prName} placeholder='{prName}' isDisabled variant='filled'/>
                        </div>
                    </div>

                    <div>
                        <FileList onSelectFile={(fileName) => setSelectedFileName(fileName)} selectedFileName=''
                                  mode={mode}/>
                        <div className="flex items-center">
                            <IoHelpCircle className="mr-2 size-7 colur"/>
                            <Text className="font-bold mr-2 text-red-400">Please select a file to initiate the review
                                process</Text>
                            <Text color="red.400" className="text-xl">*</Text>
                        </div>
                    </div>


                </div>
                <div className="w-full md:w-5/6 p-4 mt-3 ml-2 mr-2 h-auto font-bold bg-[#EBEBEB] color-[#898989]">
                    <Tabs position="relative" isFitted variant="enclosed">
                        <TabList mb='1em'>
                            <Tab>Preview</Tab>
                            <Tab isDisabled>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel className="flex flex-col">
                                <div className="flex justify-end mb-2">
                                    <Tooltip hasArrow label='For review this selected code content' bg='blue.200' placement='bottom'>
                                        <Button colorScheme="blue" border='2px' size="lg" className="w-64"
                                                onClick={handleSubmit} type={"submit"} isDisabled={!submitEnabled}>
                                            <GoCodeReview className="mr-2"/>Review
                                        </Button>
                                    </Tooltip>
                                </div>
                                {selectedFileContent ? (
                                    <pre>
                                        {addLineNumbersToCode(selectedFileContent)}
                                    </pre>
                                ) : (
                                    <div>No file or code selected</div>
                                )}

                                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isCentered closeOnOverlayClick={false}>
                                    <ModalOverlay/>
                                    <ModalContent>
                                        <ModalHeader>LOADING ...</ModalHeader>
                                        <ModalBody>
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="mr-2"><CircularProgress isIndeterminate color='blue.300'/></div>
                                                <div className="mr-2"><Text>The review generation process may take some time.</Text></div>
                                                <div className="mr-2"><Text>Please Wait ...</Text></div>
                                            </div>
                                        </ModalBody>
                                    </ModalContent>
                                </Modal>

                            </TabPanel>
                            <TabPanel>
                                hello
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
            <style>
                {`
                    .user-select-none {
                        user-select: none;
                    }
                `}
            </style>
        </div>
    );
}
