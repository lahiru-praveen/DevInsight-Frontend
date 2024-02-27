import { useState } from 'react';
import { Button, Tabs, TabList, TabPanels, Tab, TabPanel, Textarea, Text, Box, Select } from '@chakra-ui/react';
import { AiOutlineFolderAdd,AiOutlineFileAdd } from "react-icons/ai";
import PreviousSubmissionRight1 from "../components/dashboard/PreviousSubmissionRight1.jsx";

export default function DashboardMain() {
    const [files, setFiles] = useState(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const fileList = event.dataTransfer.files;
        setFiles(fileList);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className="h-screen">
            <div className="h-[80px] bg-black w-full">
                <h1>Helllo</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-0">
                <div className="bg-blue-500 h-full">
                    <PreviousSubmissionRight1/>
                </div>

                <div className="col-span-1 md:col-span-5 p-[15px]">
                    <div className="flex justify-end mb-4">
                        <Button isDisabled border='2px' size="md" borderColor='blue.500' textColor='blue.500'>
                            Submit
                        </Button>
                    </div>

                    <div className="p-[15px]">
                        <Tabs isFitted variant='enclosed'>
                            <TabList mb='1em'>
                                <Tab _selected={{color: 'white', bg: 'blue.500'}} fontSize="18px">Upload File</Tab>
                                <Tab _selected={{color: 'white', bg: 'blue.500'}} fontSize="18px">Upload Code</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Textarea bgColor={'#EBEBEB'} color={'#646464'} height="120px" fontSize="18px" placeholder='Enter Key words about your code'/>
                                    <Text fontSize='18px' className="font-bold">Upload the source file or Project folder </Text>
                                    <div>
                                        <Box onDrop={handleDrop} onDragOver={handleDragOver} mt={4} p={4} borderWidth="1px" borderRadius="md" bgColor={'#EBEBEB'} color={'#646464'} className="h-[450px]">
                                            {files && (
                                                <ul>
                                                    {Array.from(files).map((file, index) => (
                                                        <li key={index}>{file.name}</li>
                                                    ))}
                                                </ul>
                                            )}
                                            {!files && (
                                                <p>Drag and drop files here or click to select files</p>
                                            )}
                                        </Box>
                                        <AiOutlineFolderAdd />
                                        <AiOutlineFileAdd />
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div>
                                        <Textarea bgColor={'#EBEBEB'} color={'#646464'} height="120px" fontSize="18px" placeholder='Enter Key words about your code'/><br/>
                                        <Text fontSize='18px' className="font-bold">Upload the source file or Project folder </Text><br/>
                                        <Select placeholder='Select Language' className="w-[320px]">
                                            <option value="python">Python</option>
                                            <option value="javascript">JavaScript</option>
                                            <option value="java">Java</option>
                                            <option value="csharp">C#</option>
                                            <option value="cpp">C++</option>
                                            <option value="php">PHP</option>
                                            <option value="ruby">Ruby</option>
                                            <option value="swift">Swift</option>
                                            <option value="go">Go</option>
                                            <option value="typescript">TypeScript</option>
                                            <option value="other">Other</option>
                                        </Select><br/>
                                        <Textarea bgColor={'#EBEBEB'} color={'#646464'} height="400px" fontSize="18px" placeholder='Paste code here'/>

                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}

