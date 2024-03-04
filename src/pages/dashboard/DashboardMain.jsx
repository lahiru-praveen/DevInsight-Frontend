import { useState } from 'react';
import { Button, Tabs, TabList, TabPanels, Tab, TabPanel, Textarea, Text, Box, Select } from '@chakra-ui/react';
import { AiOutlineFolderAdd,AiOutlineFileAdd } from "react-icons/ai";

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

    const [values, setValues] = useState({
        value0: '',
        value1: '',
        value2: ''
    });

    const handleChange = (event, identifier) => {
        setValues({
            ...values,
            [identifier]: event.target.value
        });
    };

    const calculateHeight = (text) => {
        const numberOfLines = text.split('\n').length;
        return numberOfLines * 20; // Adjust this value according to your needs
    };

    return (
        <div className="flex flex-col h-[100vh]">
            <div className="h-[10vh] bg-yellow-500 ">
                <h1>Heading component</h1>
            </div>

            <div className="flex flex-row h-[90vh]">
                <div className="basis-1/6 bg-blue-600">
                    <h1>Navigation Bar component</h1>
                </div>

                <div className="basis-5/6 p-4 flex flex-col">
                    <div className="flex flex-row justify-end mb-4">
                        <Button isDisabled border='2px' size="md" borderColor='blue.500' textColor='blue.500' className="w-[281px]">
                            Submit
                        </Button>
                    </div>

                    <div className="p-4">
                        <Tabs isFitted variant='enclosed'>
                            <TabList mb='1em'>
                                {/*chose one style*/}
                                <Tab _selected={{color: 'blue.500', bg: 'white',borderColor:'blue.500'}} fontSize="18px">Upload File</Tab>
                                <Tab _selected={{color: 'white', bg: 'blue.500'}} fontSize="18px">Upload Code</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <div className="flex flex-col">
                                        <Textarea
                                            bgColor={'#EBEBEB'}
                                            color={'#646464'}
                                            height="auto"
                                            fontSize="18px"
                                            placeholder='Enter Key words about your code'
                                            value={values.value0}
                                            onChange={(event) => handleChange(event, 'value0')}
                                            style={{ height: calculateHeight(values.value0) }}
                                        />
                                        <Text className="font-bold mt-2" fontSize='18px'>
                                            Upload the source file or Project folder
                                        </Text>
                                        <div>
                                            <Box onDrop={handleDrop} onDragOver={handleDragOver} mt={4} p={4} borderWidth="1px" borderRadius="md" bgColor={'#EBEBEB'} color={'#646464'} fontSize="18px" className="min-h-[30rem]" overflow='hidden' >
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
                                                                <text className="font-bold" >Brows from your Computer</text>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </Box>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="flex flex-col h-full">
                                        <Textarea
                                            bgColor={'#EBEBEB'}
                                            color={'#646464'}
                                            height="auto"
                                            fontSize="18px"
                                            placeholder='Enter Key words about your code'
                                            value={values.value1}
                                            onChange={(event) => handleChange(event, 'value1')}
                                            style={{ height: calculateHeight(values.value1) }}
                                        />
                                        <Text fontSize='18px' className="font-bold mt-3 mb-3" >
                                            Enter the Code
                                        </Text>
                                        <div className="w-[250px]">
                                        <Select placeholder='Select Language' style={{ marginBottom: '1rem' }}>
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
                                        </Select></div>
                                        <div className="flex-grow relative">
                                            <Textarea
                                                bgColor={'#EBEBEB'}
                                                color={'#646464'}
                                                fontSize="18px"
                                                placeholder='Paste code here'
                                                value={values.value2}
                                                onChange={(event) => handleChange(event, 'value2')}
                                                style={{ height: calculateHeight(values.value2),minHeight: '27rem'  }}
                                            />
                                        </div>
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

