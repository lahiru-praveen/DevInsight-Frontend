import { useState, useEffect } from 'react';
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs.css';
import {Tabs, TabList, TabPanels, Tab, TabPanel, Button, TabIndicator} from '@chakra-ui/react';
import FileList from "../../components/dashboard/FileList.jsx";
import CodePreviewPageHeading from "../../components/dashboard/CodePreviewPageHeading.jsx";
import {useLocation} from "react-router-dom";
import { GoCodeReview } from "react-icons/go";

export default function CodePreview() {
    const [selectedFileContent, setSelectedFileContent] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');
    const { state } = useLocation();
    let { code, mode } = state || {}; // Destructure state with default value to avoid errors if state is undefined

    useEffect(() => {
        if (mode === 1 && code !== '') {
            setSelectedFileContent(code);
        }
    }, [code, mode]);

    useEffect(() => {
        if (selectedFileName !== '') { //Mode === 2 then there is an error
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/files/${selectedFileName}`);
                    setSelectedFileContent(response.data);
                } catch (error) {
                    console.error("Error fetching file content:", error);
                    // Handle error more gracefully, such as showing an error message to the user
                }
            };
            fetchData().then(r => console.log(r));
        }
    }, [mode, selectedFileName]);


    useEffect(() => {
        if (selectedFileContent) {
            hljs.highlightAll(); // Highlight.js initialization
        }
    }, [selectedFileContent]);

    return (
        <div className="flex flex-col h-screen">
            <div>
                <CodePreviewPageHeading />
            </div>

            <div className="flex flex-row flex-grow">
                <div className="w-1/6 p-4 mt-3 ml-2 mr-2 bg-[#EBEBEB]">
                    <FileList onSelectFile={(fileName) => setSelectedFileName(fileName)} />
                </div>
                <div className="w-5/6 p-4 mt-3 ml-2 mr-2 h-auto font-bold bg-[#EBEBEB] color-[#898989]">
                    <Tabs  position="relative" isFitted variant="enclosed" >
                        <TabList mb='1em'>
                            <Tab>Preview</Tab>
                            <Tab isDisabled>Review</Tab>
                        </TabList>
                        <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px"/>
                        <TabPanels>
                            <TabPanel className="flex flex-col">
                                <div className="flex justify-end mb-2">
                                    <Button colorScheme="blue" border='2px' size="lg" className="w-64" type={"submit"}>
                                        <GoCodeReview className="mr-2"/>Review
                                    </Button>
                                </div>
                                {selectedFileContent ? (
                                    <pre>
                                        <code className="hljs" dangerouslySetInnerHTML={{ __html: hljs.highlightAuto(selectedFileContent).value }} />
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
        </div>
    );
}
