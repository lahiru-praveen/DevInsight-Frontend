import { useState, useEffect } from 'react';
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react';
import FileList from "../../components/dashboard/FileList.jsx";
import CodePreviewPageHeading from "../../components/dashboard/CodePreviewPageHeading.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { GoCodeReview } from "react-icons/go";
import { useCode } from '../../context/CodeContext.jsx';

export default function CodePreview() {
    const { selectedFileContent, setSelectedFileContent } = useCode();
    const [selectedFileName, setSelectedFileName] = useState('');
    const [selectedLine, setSelectedLine] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { code, mode, description, language } = state || {};
    const des = description;
    const lan = language;
    console.log(description);
    console.log(language);

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
                const des = description; // Separate variable for description
                const lan = language; // Separate variable for language
                console.log(des);
                console.log(lan);
            } catch (error) {
                console.error("Error fetching file content:", error);
            }
        };

        if (selectedFileName !== '') {
            fetchData();
        }
    }, [mode, selectedFileName, setSelectedFileContent]);

    useEffect(() => {
        if (setSelectedFileContent) {
            hljs.highlightAll();
        }
    }, [setSelectedFileContent]);

    const handleSubmit = async () => {
        console.log(des);
        console.log(lan);
        if (des || lan) {
            navigate('/cr', { state: { description: des, language: lan } });
        } else {
            // Handle the case when description or language is missing
            console.error("Description or language is missing");
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
                <CodePreviewPageHeading/>
            </div>

            <div className="flex flex-row flex-grow">
                <div className="w-1/6 p-4 mt-3 ml-2 mr-2 bg-[#EBEBEB]">
                    <FileList onSelectFile={(fileName) => setSelectedFileName(fileName)}/>
                </div>
                <div className="w-5/6 p-4 mt-3 ml-2 mr-2 h-auto font-bold bg-[#EBEBEB] color-[#898989]">
                    <Tabs position="relative" isFitted variant="enclosed">
                        <TabList mb='1em'>
                            <Tab>Preview</Tab>
                            <Tab isDisabled>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel className="flex flex-col">
                                <div className="flex justify-end mb-2">
                                    <Button colorScheme="blue" border='2px' size="lg" className="w-64"
                                            onClick={handleSubmit} type={"submit"}>
                                        <GoCodeReview className="mr-2"/>Review
                                    </Button>
                                </div>
                                {selectedFileContent ? (
                                    <pre className="line-numbers">
                                        {addLineNumbersToCode(selectedFileContent)}
                                    </pre>
                                ) : (
                                    <div>No file or code selected</div>
                                )}
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
