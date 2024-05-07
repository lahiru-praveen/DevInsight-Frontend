import { useState, useEffect } from 'react';
import {Button, Tabs, TabList, TabPanels, Tab, TabPanel, Textarea, Text, Box,} from '@chakra-ui/react';
import { FaWindowClose } from "react-icons/fa";
import LanguageSelectMenu from "../../components/dashboard/LanguageSelectMenu.jsx";
import {useNavigate} from "react-router-dom";
import NavBar from "../../components/dashboard/NavBar.jsx";
import axios from "axios";
import {MdDriveFolderUpload} from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";
import { IoCloudUpload } from "react-icons/io5";
import {AiFillFileAdd} from "react-icons/ai";
import SubmissionNav from "../../components/dashboard/SubmissionNav.jsx";

export default function DashboardMain() {
    const [values, setValues] = useState({
        value0: '',
        value1: '',
        value2: ''
    });

    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('not mentioned');
    const allowedExtensions = ['.txt', '.py','.java','.html','.php','.rb','.cs','.cpp','.css','.go','.rs','.swift','.js'];

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

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
                    // File extension is allowed
                    droppedFiles.push(file);
                } else {
                    window.alert("\u26A0 \t" + " UPLOAD ERROR\n\n" + "Sorry, this extension is not allowed.\n" + "File - " + file.name + "\n" + "Invalid file extension - " + extension);
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
            if(allowedExtensions.includes('.' + extension)){
                return allowedExtensions.includes('.' + extension);
            } else {
                window.alert("\u26A0 \t" + " UPLOAD ERROR\n\n" + "Sorry, this extension is not allowed.\n" + "File - " + file.name + "\n" + "Invalid file extension - " + extension);
            }
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
        const confirmed = window.confirm("\u26A0 \t" + " CONTENT DELETION\n\n"+"Are you sure you want to clear all selected files?");
        if (confirmed) {
            setFiles([]);
            // Clear the value of the file input field
            document.getElementById('fileInput').value = '';
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(); // Initialize FormData here

        try {
            const endpoint = "http://localhost:8000/upload-file/";

            // Handle file uploads
            if (files.length > 0) {
                // Append files to FormData
                files.forEach(file => {
                    formData.append('file_uploads', file);
                });

                const file_response = await fetch(endpoint, {
                    method: "POST",
                    body: formData // Pass formData to the fetch request
                });

                if (file_response.ok) {
                    setFiles([]);
                    setValues({
                        // value0: '',
                        value1: '',
                        value2: ''
                    });
                    setSubmitEnabled(false);
                    navigate("/cp", {state : {code: "No Code", mode: 2 , language: "", description: values.value0}});
                    console.log("File uploaded successfully!");
                }
            }

            // Handle code submission
            if (values.value2.trim() !== '') {
                console.log("Code uploaded successfully!");
                navigate('/cp', {state: {code: values.value2, mode: 1, language: selectedLanguage, description: values.value1}});
                setSubmitEnabled(false);
            }

        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const checkLanguage = async (event) => {
        event.preventDefault();

        try {
            if (values.value2.trim() !== "" && selectedLanguage !== "") {
                const requestData = {
                    language: selectedLanguage,
                    code: values.value2
                };

                axios.post("http://localhost:8000/detect-language/", requestData)
                    .then(res => {
                        console.log(res.data);
                        if (res.data === 1) {
                            alert("\u2714 \t " + "Language matches");
                        } else {
                            alert("\u26A0 \t" + " INSERTED INFORMATION ERROR\n\n" +"Language does not match");
                        }
                    })
                    .catch(error => console.error(error));
            } else {
                alert("\u26A0 \t" + " INSERTED INFORMATION ERROR\n\n" + "Please select a language and enter code before checking.");
            }
        } catch (error) {
            console.log("An error occurred:", error);
        }
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
            <div className=" bg-yellow-500">
                <NavBar/>
            </div>

            <div className="flex flex-row ">
                <div className="w-1/6 bg-[#EBEBEB] mt-4 ml-2 ">
                    <SubmissionNav/>
                </div>

                <form onSubmit={handleSubmit} className="w-5/6 p-4 flex flex-col">
                    <div className="flex justify-end mb-4">
                        <Button isDisabled={!submitEnabled} border='2px' size="lg" colorScheme='blue' className="w-64" type={"submit"}>
                            <MdDriveFolderUpload className="mr-2" />Submit
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
                                        <Textarea bgColor={'#EBEBEB'} color={'#646464'} fontSize="18px" placeholder='Enter Key words about your code' value={values.value0} onChange={(event) => handleChange(event, 'value0')} style={{ height: calculateHeight(values.value0) }} />
                                        <Text className="font-bold mt-2" fontSize='18px'>
                                            Upload The Source File or Project Files
                                        </Text>
                                        <div>
                                            <Box onDrop={handleDrop} onDragOver={handleDragOver} borderStyle="dashed" mt={4} p={5} borderColor="gray.300" borderWidth="5px" borderRadius="md" bgColor={'#EBEBEB'} color={'#646464'} fontSize="18px" className="min-h-[30rem]" overflow='hidden' position="relative">
                                                {/*<Box position="absolute" top="10px" left="10px" right="10px" bottom="10px" borderWidth="5px" borderStyle="dashed" borderRadius="md" borderColor="gray.300"></Box>*/}
                                                <div>
                                                    <label htmlFor="fileInput">
                                                        Choose File<AiFillFileAdd className="size-10 p-2 bg-white"/>
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
                                                            <IoCloudUpload className="size-20" />
                                                        </div>
                                                        <div>
                                                            <Text className="font-bold">Drop Files here</Text>
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
                                        <LanguageSelectMenu onLanguageChange={handleLanguageChange}/>
                                        <div className="flex-grow relative">
                                            <div className="flex justify-end">
                                                 <Button onClick={checkLanguage} border='2px' size="md" colorScheme='blue' className="w-44 mb-2" type={"submit"}>
                                                    <FaFlagCheckered className="mr-2" />Check
                                                </Button>
                                            </div>
                                            <Textarea bgColor={'#EBEBEB'} color={'#646464'} fontSize="18px" placeholder='Paste code here' value={values.value2} name={values.value2} onChange={(event) => handleChange(event, 'value2')} style={{ height: calculateHeight(values.value2), minHeight: '27rem' }} />
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
