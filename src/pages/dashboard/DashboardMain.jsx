import { useState, useEffect } from 'react';
import { Button, Tabs, TabList, TabPanels, Tab, TabPanel, Textarea, Text, Box } from '@chakra-ui/react';
import { AiOutlineFolderAdd, AiOutlineFileAdd, AiFillFileAdd } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";
import LanguageSelectMenu from "../../components/dashboard/LanguageSelectMenu.jsx";
import {useNavigate} from "react-router-dom";

export default function DashboardMain() {
    const [values, setValues] = useState({
        value0: '',
        value1: '',
        value2: ''
    });

    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [submitEnabled, setSubmitEnabled] = useState(false);

    const allowedExtensions = ['.txt', '.pdf'];

    const handleDrop = (event) => {
        event.preventDefault();
        const fileList = event.dataTransfer.items;

        const droppedFiles = [];

        // Iterate through dropped items
        for (let i = 0; i < fileList.length; i++) {
            const item = fileList[i];

            // Check if the item is a file
            if (item.kind === 'file') {
                const file = item.getAsFile();
                const extension = file.name.split('.').pop().toLowerCase();
                // Check if the file extension is allowed
                if (allowedExtensions.includes('.' + extension)) {
                    droppedFiles.push(file);
                }
            }
        }

        // Add dropped files to the existing files state
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

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

    const handleFileInputChange = (event) => {
        const selectedFiles = Array.from(event.target.files);

        // Filter selected files to allow only .txt and .pdf extensions
        const filteredFiles = selectedFiles.filter(file => {
            const extension = file.name.split('.').pop().toLowerCase();
            return allowedExtensions.includes('.' + extension);
        });

        // Add filtered files to the files state
        setFiles((prevFiles) => [...prevFiles, ...filteredFiles]);
    };

    const handleFileRemove = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const handleClearFiles = () => {
        setFiles([]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        files.forEach(file => {
            formData.append('file_uploads', file);
        });

        try {
            const endpoint = "http://localhost:8000/uploadfile/";
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                console.log("File uploaded successfully!");
                setFiles([]);
                setValues({
                    value0: '',
                    value1: '',
                    value2: ''
                });
                setSubmitEnabled(false);

            } else {
                console.error("Failed to upload file.");
            }
        } catch (error) {
            console.error(error);
        }
        navigate('/cp');
    };

    // Enable submit button if files are chosen or "Paste code here" textarea is filled
    useEffect(() => {
        if (files.length > 0 || values.value2.trim() !== '') {
            setSubmitEnabled(true);
        } else {
            setSubmitEnabled(false);
        }
    }, [files, values.value2]);

    return (
        <div className="flex flex-col h-screen">
            <div className="h-20 bg-yellow-500">
                <h1 className="text-3xl font-bold text-center">Heading component</h1>
            </div>

            <div className="flex flex-row h-auto">
                <div className="w-1/6 bg-blue-600">
                    <h1>Navigation Bar component</h1>
                </div>

                <form onSubmit={handleSubmit} className="w-5/6 p-4 flex flex-col">
                    <div className="flex justify-end mb-4">
                        <Button isDisabled={!submitEnabled} border='2px' size="md" borderColor='blue.500' textColor='blue.500' className="w-64" type={"submit"}>
                            Submit
                        </Button>
                    </div>

                    <div className="p-4">
                        <Tabs isFitted variant='enclosed'>
                            <TabList mb='1em'>
                                <Tab _selected={{ color: 'white', bg: 'blue.500' }} fontSize="18px" isDisabled={values.value2.trim() !== ''}>Upload File</Tab>
                                <Tab _selected={{ color: 'white', bg: 'blue.500' }} fontSize="18px" isDisabled={files.length > 0}>Upload Code</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <div className="flex flex-col">
                                        <Textarea bgColor={'#EBEBEB'} color={'#646464'} height="auto" fontSize="18px" placeholder='Enter Key words about your code' value={values.value0} onChange={(event) => handleChange(event, 'value0')} style={{ height: calculateHeight(values.value0) }} />
                                        <Text className="font-bold mt-2" fontSize='18px'>
                                            Upload the source file or Project folder
                                        </Text>
                                        <div>
                                            <Box onDrop={handleDrop} onDragOver={handleDragOver} mt={4} p={4} borderWidth="1px" borderRadius="md" bgColor={'#EBEBEB'} color={'#646464'} fontSize="18px" className="min-h-[30rem]" overflow='hidden'>
                                                <div>
                                                    <label htmlFor="fileInput">
                                                        <AiFillFileAdd className="size-10 p-2 bg-white"/>
                                                    </label>
                                                    <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileInputChange} multiple />
                                                    {files.length === 0 && (
                                                        <div className="text-red-300 font-bold">No File Has Chosen:</div>
                                                    )}
                                                </div>
                                                {files.length > 0 ? (
                                                    <div>
                                                        <div className="text-red-300 font-bold">Files Chosen:
                                                            <Button size="sm" onClick={handleClearFiles} borderColor='blue.500' textColor='blue.500' className="border-2 ml-3" bgColor="'#EBEBEB'">
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                        <ul>
                                                            {files.map((file, index) => (
                                                                <li className="flex" key={index}>
                                                                    <div className="pt-1"><FaWindowClose onClick={() => handleFileRemove(index)} /></div>
                                                                    <div className="pl-4 text-red-400">{file.name}</div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-[45vh]">
                                                        <div className="flex-row flex">
                                                            <AiOutlineFolderAdd className="size-10" />
                                                            <AiOutlineFileAdd className="size-10" />
                                                        </div>
                                                        <div>
                                                            <text className="font-bold">You can drag and drop files here to add them.</text>
                                                        </div>
                                                    </div>
                                                )}
                                            </Box>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="flex flex-col h-full">
                                        <Textarea bgColor={'#EBEBEB'} color={'#646464'} height="auto" fontSize="18px" placeholder='Enter Key words about your code' value={values.value1} onChange={(event) => handleChange(event, 'value1')} style={{ height: calculateHeight(values.value1) }} />
                                        <Text fontSize='18px' className="font-bold mt-3 mb-3">
                                            Enter the Code
                                        </Text>
                                        <LanguageSelectMenu/>
                                        <div className="flex-grow relative">
                                            <Textarea bgColor={'#EBEBEB'} color={'#646464'} fontSize="18px" placeholder='Paste code here' value={values.value2} onChange={(event) => handleChange(event, 'value2')} style={{ height: calculateHeight(values.value2), minHeight: '27rem' }} />
                                        </div>
                                    </div>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </form>
            </div>
        </div>
    );
}
