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
        <div className="flex flex-col h-[100vh]">
            <div className="h-[10vh] bg-black ">
                <h1>Helllo</h1>
            </div>

            <div className="flex flex-row h-[90vh]">
                <div className="bg-blue-500 basis-1/6">
                    <PreviousSubmissionRight1/>
                </div>

                <div className="basis-5/6 p-[15px] flex flex-col">
                    <div className="flex flex-row justify-end mb-4">
                        <Button isDisabled border='2px' size="md" borderColor='blue.500' textColor='blue.500'>
                            Submit
                        </Button>
                    </div>

                    <div className="p-[15px] grow">
                        <Tabs isFitted variant='enclosed'>
                            <TabList mb='1em'>
                                <Tab _selected={{color: 'white', bg: 'blue.500' ,}} fontSize="18px">Upload File</Tab>
                                <Tab _selected={{color: 'white', bg: 'blue.500'}} fontSize="18px">Upload Code</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                <div className="flex flex-col"></div>
                                    <div><Textarea bgColor={'#EBEBEB'} color={'#646464'} height="12vh" fontSize="18px" placeholder='Enter Key words about your code'/></div>
                                    <div><Text fontSize='18px' className="font-bold mt-2">Upload the source file or Project folder </Text></div>
                                    <div>
                                        <Box onDrop={handleDrop} onDragOver={handleDragOver} mt={4} p={4} borderWidth="1px" borderRadius="md" bgColor={'#EBEBEB'} color={'#646464'} className="h-[50vh]" overflow='hidden' >
                                            {files && (
                                                <ul>
                                                    {Array.from(files).map((file, index) => (
                                                        <li key={index}>{file.name}</li>
                                                    ))}
                                                </ul>
                                            )}
                                            {!files && (
                                                <>
                                                    <div className="flex flex-col items-center justify-center h-[45vh]">
                                                        <div className="flex-row flex">
                                                            <AiOutlineFolderAdd className="size-10"/>
                                                            <AiOutlineFileAdd className="size-10"/>
                                                        </div>
                                                        <div>
                                                            <text className="font-bold">Brows from your Computer</text>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </Box>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div>
                                        <Textarea bgColor={'#EBEBEB'} color={'#646464'} height="12vh" fontSize="18px" placeholder='Enter Key words about your code'/><br/>
                                        <Text fontSize='18px' className="font-bold mt-2">Upload the source file or Project folder </Text><br/>
                                        <Select placeholder='Select Language' >
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
                                        <Textarea bgColor={'#EBEBEB'} color={'#646464'} height="43vh" fontSize="18px" placeholder='Paste code here'/>

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

