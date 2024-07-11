import React from 'react';
import {
    Box,
    Button,
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    CircularProgress,
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, Tooltip, useDisclosure
} from "@chakra-ui/react";

import { IoMdDownload } from "react-icons/io";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useCode } from '../../context/CodeContext.jsx';
import hljs from "highlight.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FileList from "../../components/dashboard/FileList.jsx";
import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { BiFingerprint } from 'react-icons/bi';
import Chatbot from "../../components/Chatbot/chatbot.jsx";
import { TiSocialGithubCircular } from "react-icons/ti";
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

const newTheme = {
    p: props => {
        const { children } = props;
        return (
            <Text mb={2} fontSize={'18px'} fontWeight='medium'>
                {children}
            </Text>
            
            
            
        );
    },
};

export default function CodeReview() {
    const { selectedFileContent } = useCode();
    const [selectedLine, setSelectedLine] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    let { reviewContent, selectedFileName, mode, suggestionContent, referLinksContent, projectName, language, description, projectId } = state || {};
    console.log(reviewContent);
    console.log("Selected file name in CodePreview:", selectedFileName);
    console.log(suggestionContent);

    const handleDownloadPdf = async () => {
        try {
            const response = await axios.post("http://localhost:8000/generate-pdf", { reviewContent, suggestionContent, referLinksContent, selectedFileName, projectName, language, description, selectedFileContent }, {
                responseType: 'blob' // important to handle binary data
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${projectName} Review.pdf`); // Specify the filename
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    const handleAskHelp = async () => {
        try {
            navigate('/ah', { state: { projectID: projectId, projectName: projectName, fileName: selectedFileName, language: language, description: description, mode: mode, code: selectedFileContent, review: reviewContent, suggestions: suggestionContent, referLinks: referLinksContent } });
        } catch (error) {
            console.error("Error navigating to Ask Help:", error);
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
                <NavBarUser button1={false} button2={true} button3={true} button4={true} />
            </div>

            <div className="flex flex-row flex-grow">

                <div className="w-1/6 p-4 mt-3 ml-2 mr-2 bg-[#EBEBEB] rounded-lg ">
                    <div className="mb-4">
                        <Breadcrumb spacing='2px' separator={<ChevronRightIcon color='gray.500' />}>
                            <BreadcrumbItem>
                                <BreadcrumbLink as={Link} to="/db">DashBoard</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem>
                                <BreadcrumbLink>Code Preview</BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbItem isCurrentPage>
                                <BreadcrumbLink>Code Review</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div>
                        <FileList onSelectFile={() => { }} selectedFileName={selectedFileName} mode={mode} />
                    </div>
                </div>

                <div className="w-5/6 p-4 mt-3 ml-2 mr-2 h-auto font-bold  bg-[#EBEBEB] color-[#898989]">
                    <Tabs position="relative" isFitted variant="enclosed" defaultIndex={1}>
                        <TabList mb='1em'>
                            <Tab>Preview</Tab>
                            <Tab>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <div className="flex flex-col " overflowY="auto">
                                    <div className="flex justify-end mb-2">
                                        <Tooltip hasArrow label='Ask a help from Qauliry Assuarence Engineer' bg='blue.200' placement='bottom'>
                                            <Button colorScheme="blue" size="lg" className="w-48"
                                                onClick={handleAskHelp}>
                                                <BsFillQuestionSquareFill className="mr-2" />Ask the QAE
                                            </Button>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Text className="text-xl font-bold mr-2">Code - </Text>
                                        <Box bg='white' p={4} className="mt-2 mb-8">
                                            {selectedFileContent ? (
                                                <pre className="line-numbers text-lg">
                                                    {addLineNumbersToCode(selectedFileContent)}
                                                </pre>
                                            ) : (
                                                <Flex alignItems="center" justifyContent="center" className="mt-20">
                                                    <div><CircularProgress isIndeterminate color='blue.300' /></div>
                                                </Flex>
                                            )}
                                        </Box>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                
                                <div className="flex flex-col  " >
                                    <div className="flex justify-end mb-2 space-x-2" overflowY="auto">
                                        <Tooltip hasArrow label='Ask a help from Qauliry Assuarence Engineer' bg='blue.200' placement='bottom'>
                                            <Button colorScheme="blue" size="lg" className="w-48"
                                                onClick={handleAskHelp}>
                                                <BsFillQuestionSquareFill className="mr-2" />Ask the QAE
                                            </Button>
                                        </Tooltip>
                                        
                                        <Tooltip hasArrow label='Download review in pdf format' bg='blue.200' placement='bottom'>
                                            <Button colorScheme="blue" size="lg" className="w-48"
                                                onClick={handleDownloadPdf}>
                                                <IoMdDownload className="mr-2" /> Download
                                            </Button>
                                        </Tooltip>
                                        
                                        <Tooltip hasArrow label='Ask questions from chatQA' bg='blue.200' placement='bottom'>
                                            <Button colorScheme="teal" size="lg" className="w-48" onClick={onOpen}>
                                                <TiSocialGithubCircular className="mr-2" /> Ask From ChatQA
                                            </Button>
                                        </Tooltip>
                                    </div>
                                    <div>
                                    <Box overflowY="auto">
                                        <Text className="text-2xl font-bold mr-2 text-gray-800 ">Review </Text>
                                        <Box bg='white' p={4} className="mt-2 mb-8 rounded-lg " overflowX="auto">
                                            {reviewContent ? (
                                                <Box as="pre">
                                                    <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
                                                        {reviewContent}
                                                    </ReactMarkdown>
                                                </Box>
                                            ) : (
                                                <Text>There is an error </Text>
                                            )}
                                        </Box>

                                        <Text className="text-2xl font-bold mr-2 text-gray-800 ">Suggestions </Text>
                                        <Box bg='white' p={4} className="mt-2 mb-8 rounded-lg " overflowX="auto">
                                            {suggestionContent ? (
                                                <Box as="pre">
                                                    <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
                                                        {suggestionContent}
                                                    </ReactMarkdown>
                                                </Box>
                                            ) : (
                                                <Text>There is an error </Text>
                                            )}
                                        </Box>

                                        <Text className="text-2xl font-bold mr-2 text-gray-800">Reference links</Text>
                                        <Box bg='white' p={4} className="mt-2 mb-8 rounded-lg " overflowX="auto">
                                            {referLinksContent ? (
                                                <Box as="pre">
                                                    <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
                                                        {referLinksContent}
                                                    </ReactMarkdown>
                                                </Box>
                                            ) : (
                                                <Text>There is an error </Text>
                                            )}
                                        </Box>
                                        </Box>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>

            </div>
            <Chatbot isOpen={isOpen} onClose={onClose} />
        </div>
    );
}
