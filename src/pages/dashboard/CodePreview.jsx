import { useState, useEffect } from 'react';
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs.css';
import {Tabs, TabList, TabPanels, Tab, TabPanel, Button} from '@chakra-ui/react'
import FileList from "../../components/dashboard/FileList.jsx";
import CodeReviewPageHeading from "../../components/dashboard/CodeReviewPageHeading.jsx";

export default function CodePreview() {
    const [selectedFileContent, setSelectedFileContent] = useState('');
    const [selectedFileName, setSelectedFileName] = useState('');

    useEffect(() => {
        if (selectedFileName !== '') {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/files/${selectedFileName}`);
                    setSelectedFileContent(response.data);
                } catch (error) {
                    console.error("Error fetching file content:", error);
                }
            };

            fetchData();
        }
    }, [selectedFileName]);

    return (
        <div className="flex flex-col h-screen">
            <div>
                <CodeReviewPageHeading/>
            </div>

            <div className="flex flex-row flex-grow">
                <div className="w-1/6 p-4 mt-3 ml-2 mr-2 bg-[#EBEBEB]">
                    <FileList onSelectFile={(fileName) => setSelectedFileName(fileName)} />
                </div>
                <div className="w-5/6 p-4 mt-3 ml-2 mr-2 h-auto font-bold bg-[#EBEBEB] color-[#898989]">
                    <Tabs isFitted variant='enclosed'>
                        <TabList mb='1em'>
                            <Tab>Preview</Tab>
                            <Tab isDisabled>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel className="flex flex-col">
                                <div className="flex justify-end mb-2">
                                    <Button colorScheme="blue" border='2px' size="sm" type={"submit"}>
                                        Review
                                    </Button>
                                </div>
                                <pre>
                                    <code className="hljs" dangerouslySetInnerHTML={{__html: hljs.highlightAuto(selectedFileContent).value}}/>
                                </pre>
                            </TabPanel>
                            <TabPanel>
                                Hello
                            </TabPanel>
                        </TabPanels>
                    </Tabs>


                </div>
            </div>
        </div>
    );
}
