import { useState, useEffect } from 'react';
import {
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Textarea,
    Text,
    Box,
    Tooltip,
    Alert,
    AlertIcon, Input,
} from '@chakra-ui/react';
import { FaWindowClose } from "react-icons/fa";
import LanguageSelectMenu from "../../components/dashboard/LanguageSelectMenu.jsx";
import {useNavigate} from "react-router-dom";
import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
import NavBarQAE from "../../components/dashboard/NavBarQAE.jsx";
import axios from "axios";
import {MdDriveFolderUpload} from "react-icons/md";
import { FaFlagCheckered } from "react-icons/fa";
import { IoCloudUpload } from "react-icons/io5";
import {AiFillFileAdd} from "react-icons/ai";
import SubmissionNav from "../../components/dashboard/SubmissionNav.jsx";
import {CheckIcon, Icon, WarningTwoIcon} from "@chakra-ui/icons";
import ToolTip from "../../context/ToolTip.jsx";

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
    const allowedExtensions = ['.txt', '.py','.java','.html','.php','.rb','.cs','.cpp','.css','.go','.rs','.swift','.js','.jsx','.c','.ts'];
    const WORD_LIMIT = 150;
    const [fileAlerts, setFileAlerts] = useState([]);
    const [alertLanguageMessage, setAlertLanguageMessage] = useState('');
    const [alertLanguageStatus, setAlertLanguageStatus] = useState('');
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const [availabilityMessage, setAvailabilityMessage] = useState('');
    const [projectNames, setProjectNames] = useState([]);
    const [prName,setPrName] = useState('')
    const [availablePrName,setAvailablePrName] = useState('')
    const email = sessionStorage.getItem("email");
    const role = sessionStorage.getItem('role');

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const handlePrNameChange = (event) => {
        const newPrName = event.target.value;
        setPrName(newPrName);

        if (newPrName !== '') {
            setIsCheckingAvailability(true);
            setSubmitEnabled(false);

            const formattedNewPrName = newPrName.toLowerCase();
            const formattedProjectNames = projectNames.map(name => name.toLowerCase());

            const projectExists = formattedProjectNames.includes(formattedNewPrName);
            if (projectExists ) {
                setAvailabilityMessage(`The project name ${newPrName} already exists on this account.`);
                setAvailablePrName('');
            } else {
                setAvailabilityMessage(`${newPrName} is available.`);
                setAvailablePrName(prName);
            }
            setIsCheckingAvailability(false);
        } else {
            setAvailabilityMessage('');
        }
    };

    useEffect(() => {
        const fetchProjectNames = async () => {
            try {
                const response = await axios.get("http://localhost:8000/project-names", {
                    params: {
                        user: email
                    }
                });
                setProjectNames(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching project names:", error);
            }
        };

        fetchProjectNames();
    }, []);

    const handleDrop = (event) => {
        event.preventDefault();
        const fileList = event.dataTransfer.items;

        const droppedFiles = [];
        const newAlerts = []; // Move the declaration outside the loop

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
                    newAlerts.push({ message: `Sorry, this extension is not allowed.  |  File - ${file.name}  |  Invalid file extension - ${extension}`, status: 'warning' });
                }
            }
        }

        // Add dropped files to the existing files state
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
        setFileAlerts((prevAlerts) => [...prevAlerts, ...newAlerts]);
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

    const handleTextAreaChange = (event, identifier) => {
        // Check word limit
        const text = event.target.value;
        const words = text.split(/\s+/);
        if (words.length <= WORD_LIMIT) {
            setValues({
                ...values,
                [identifier]: text
            });
        } else {
            // If word limit is exceeded, truncate the input
            const truncatedText = words.slice(0, WORD_LIMIT).join(' ');
            setValues({
                ...values,
                [identifier]: truncatedText
            });
        }
    };

    const calculateHeight = (text) => {
        const numberOfLines = text.split('\n').length;
        return numberOfLines * 20; // Adjust this value according to your needs
    };

    const handleFileInputChange = (event) => {
        const selectedFiles = Array.from(event.target.files);

        // Filter selected files to allow only allowed extensions and store alerts for invalid files
        const filteredFiles = [];
        const newAlerts = [];

        selectedFiles.forEach(file => {
            const extension = file.name.split('.').pop().toLowerCase();
            if (allowedExtensions.includes('.' + extension)) {
                filteredFiles.push(file);
            } else {
                newAlerts.push({ message: `Sorry, this extension is not allowed.  |  File - ${file.name}  |  Invalid file extension - ${extension}`, status: 'warning' });
            }
        });

        // Add filtered files to the files state and new alerts to the fileAlerts state
        setFiles(prevFiles => [...prevFiles, ...filteredFiles]);
        setFileAlerts(prevAlerts => [...prevAlerts, ...newAlerts]);
    };

    const handleFileAlertClose = (index) => {
        setFileAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index));
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
                    navigate("/cp", {state : {code: "No Code", mode: 2 , language: "", description: values.value0, projectName: prName, user: email}});
                    console.log("File uploaded successfully!");
                }
            }

            // Handle code submission
            if (values.value2.trim() !== '') {
                const response_code_upload = await axios.post("http://localhost:8000/upload-code");
                console.log("Code uploaded successfully!",response_code_upload);
                navigate('/cp', {state: {code: values.value2, mode: 1, language: selectedLanguage, description: values.value1,projectName: prName, user: email}});
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
                            setAlertLanguageMessage("Language matches");
                            setAlertLanguageStatus('success');
                        } else {
                            setAlertLanguageMessage("Language does not match");
                            setAlertLanguageStatus('error');                        }
                    })
                    .catch(error => console.error(error));
                setAlertLanguageMessage("There was an error processing your request");
                setAlertLanguageStatus('warning');
            } else {
                setAlertLanguageMessage("Please select a language and enter code before checking.");
                setAlertLanguageStatus('error');
            }
        } catch (error) {
            setAlertLanguageMessage("An error occurred while checking the language.");
            setAlertLanguageStatus('warning');
        }
    };

    // Enable submit button if files are chosen or "Paste code here" textarea is filled
    useEffect(() => {
        const isProjectNameAvailable = availablePrName !== '';
        const areFilesOrCodeAvailable = files.length > 0 || values.value2.trim() !== '';
        const isProjectNameEmpty = prName.trim() === ''; // Check if project name input is empty

        if (!isProjectNameEmpty && isProjectNameAvailable && areFilesOrCodeAvailable) {
            setSubmitEnabled(true);
        } else {
            setSubmitEnabled(false);
        }
    }, [availablePrName, files, values.value2, prName]);

    return (
        <div className="flex flex-col h-screen ">
            <div>
                {role === 'Developer' ?
                    <NavBarUser button1={false} button2={false} button3={false} button4={false}/> :
                    <NavBarQAE button1={false} button2={false} button3={false} button4={false} button5={false}/>
                };
            </div>

            <div className="flex flex-row  flex-grow">
                <div className="w-1/6 h-full bg-[#EBEBEB] ml-2 flex-grow">
                    <SubmissionNav/>
                </div>

                <form onSubmit={handleSubmit} className="w-5/6 p-4 flex flex-col">

                    <div>
                        <div className="flex items-center">
                            <Text className="text-xl font-bold mr-2 mb-2">Project Name</Text>
                            <Text color="red.400" className="text-xl">*</Text>
                        </div>
                        <div className="mb-4">
                            <Input value={prName} onChange={handlePrNameChange} focusBorderColor='blue.400'
                                   placeholder='Enter a name for Project / Submission' variant='filled'/>
                            {isCheckingAvailability ? (
                                <Text className="text-gray-600">Checking availability...</Text>
                            ) : (
                                availabilityMessage === `${prName} is available.` ? (
                                    <Text className="text-green-400 font-bold"><Icon as={CheckIcon} color='green.400'
                                                                                     className="mr-2"/>{availabilityMessage}
                                    </Text>
                                ) : (availabilityMessage === `The project name ${prName} already exists on this account.` ? (
                                        <Text className="text-red-500 font-bold"><Icon as={WarningTwoIcon}
                                                                                       color='red.500'
                                                                                       className="mr-2"/>{availabilityMessage}
                                        </Text>) : (<Text> </Text>)
                                )
                            )}
                        </div>
                    </div>

                    {fileAlerts.length > 0 && (
                        fileAlerts.map((alert, index) => (
                            <Alert key={index} status={alert.status} closeable>
                                <AlertIcon/>
                                {alert.message}
                                <Icon as={FaWindowClose} boxSize={5} color='red' size="sm"
                                      onClick={() => handleFileAlertClose(index)} ml="auto" mr={-2}/>
                            </Alert>
                        ))
                    )}

                    <div className="flex justify-end mb-4">
                        <Tooltip hasArrow label='Submit the codes/files' bg='blue.200' placement='bottom'>
                            <Button isDisabled={!submitEnabled} border='2px' size="lg" colorScheme='blue'
                                    className="w-64" type={"submit"}>
                                <Icon as={MdDriveFolderUpload} boxSize={6} color='white' className="mr-2"/>Submit
                            </Button>
                        </Tooltip>
                    </div>

                    {alertLanguageMessage && (
                        <Alert status={alertLanguageStatus}>
                            <AlertIcon/>
                            {alertLanguageMessage}
                        </Alert>
                    )}

                    <div className="p-4">
                        <Tabs isFitted variant='enclosed'>
                            <TabList mb='1em'>
                                <Tab _selected={{color: 'white', bg: 'blue.500'}} fontSize="18px"
                                     isDisabled={values.value2.trim() !== ''}>Upload File</Tab>
                                <Tab _selected={{color: 'white', bg: 'blue.500'}} fontSize="18px"
                                     isDisabled={files.length > 0}>Upload Code</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <div className="flex flex-col">
                                        <Textarea bgColor={'#EBEBEB'} color={'#646464'} fontSize="18px"
                                                  placeholder='Enter Key words about your code' value={values.value0}
                                                  onChange={(event) => handleTextAreaChange(event, 'value0')}
                                                  style={{
                                                      minHeight: `${6 * 20}px`,
                                                      height: calculateHeight(values.value0)
                                                  }}/>
                                        <div className="flex justify-between mt-2">
                                            <Text fontSize="14px"
                                                  color={values.value0.split(/\s+/).length >= WORD_LIMIT ? 'red' : 'inherit'}>
                                                {values.value0.split(/\s+/).length}/{WORD_LIMIT} words
                                            </Text>
                                            {values.value0.split(/\s+/).length >= WORD_LIMIT &&
                                                <span className="text-red-500">Maximum words limit reached!</span>}
                                        </div>
                                        <div className="flex flex-row">
                                            <Text className="text-xl font-bold mt-2 mr-3" fontSize='18px'>
                                                Upload The Source File or Project Files
                                            </Text>
                                            <Text color="red.400" className="text-xl mt-2">*</Text>
                                        </div>

                                        <div className="flex-grow">
                                            <Box onDrop={handleDrop} onDragOver={handleDragOver} borderStyle="dashed"
                                                 mt={4} p={5} borderColor="gray.300" borderWidth="5px" borderRadius="md"
                                                 bgColor={'#EBEBEB'} color={'#646464'} fontSize="18px"
                                                 className="flex-grow"
                                                 style={{minHeight: "45vh"}} overflow='hidden' position="relative">
                                                <div>
                                                    <label htmlFor="fileInput">
                                                        Browse for files:
                                                        <ToolTip tooltip="Browse files for preview">
                                                            <Icon as={AiFillFileAdd} boxSize={12}
                                                                  backgroundColor='white' className="p-2 ml-4 mb-4"/>
                                                        </ToolTip>
                                                    </label>
                                                    <input id="fileInput" type="file" style={{display: 'none'}}
                                                           onChange={handleFileInputChange} multiple/>
                                                    {files.length === 0 && (
                                                        <div className="text-red-300 font-bold">No File Has
                                                            Chosen:</div>
                                                    )}
                                                </div>
                                                {files.length > 0 ? (
                                                    <div>
                                                        <div className="text-red-300 font-bold">Files Chosen:
                                                            <Tooltip hasArrow label='Cansel all selected files'
                                                                     bg='blue.200' placement='bottom'>
                                                                <Button size="sm" onClick={handleClearFiles}
                                                                        borderColor='blue.500' textColor='blue.500'
                                                                        className="border-2 ml-3" bgColor="'#EBEBEB'">
                                                                    Cancel
                                                                </Button>
                                                            </Tooltip>

                                                        </div>
                                                        <ul>
                                                            {files.map((file, index) => (
                                                                <li className="flex" key={index}>
                                                                    <div className="pt-1">
                                                                        <ToolTip tooltip="Remove this file">
                                                                            <FaWindowClose color={'red'}
                                                                                           onClick={() => handleFileRemove(index)}/>
                                                                        </ToolTip>
                                                                    </div>
                                                                    <div className="pl-4 text-red-400">{file.name}</div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center">
                                                        <div className="flex-row flex">
                                                            <Icon as={IoCloudUpload} boxSize={20} className="mr-2"/>
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
                                        <Textarea bgColor={'#EBEBEB'} color={'#646464'} height="auto" fontSize="18px"
                                                  placeholder='Enter Key words about your code' value={values.value1}
                                                  onChange={(event) => handleTextAreaChange(event, 'value1')}
                                                  style={{
                                                      minHeight: `${6 * 20}px`,
                                                      height: calculateHeight(values.value1)
                                                  }}/>
                                        <div className="flex justify-between mt-2">
                                            <Text fontSize="14px"
                                                  color={values.value1.split(/\s+/).length >= WORD_LIMIT + 1 ? 'red' : 'inherit'}>
                                                {values.value1.split(/\s+/).length}/{WORD_LIMIT} words
                                            </Text>
                                            {values.value1.split(/\s+/).length + 1 >= WORD_LIMIT &&
                                                <span className="text-red-500">Maximum words limit reached!</span>}
                                        </div>
                                        <div className="flex flex-grow relative mb-2">
                                            <div>
                                                <LanguageSelectMenu onLanguageChange={handleLanguageChange}
                                                                    selectedLanguage="Not given"/>
                                            </div>
                                            <div className="flex justify-end flex-grow">
                                                <Tooltip hasArrow
                                                         label='Through this, you can check whether the code langugae is the same as the language you selected'
                                                         bg='blue.200' placement='bottom'>
                                                    <Button onClick={checkLanguage} border='2px' size="md"
                                                            colorScheme='blue' className="w-60 mb-2" type={"submit"}>
                                                        <Icon as={FaFlagCheckered} boxSize={5} color='white'
                                                              className="mr-2"/>
                                                        Check The Language
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </div>

                                        <div className="flex flex-row">
                                            <Text className="text-xl font-bold mt-2 mr-3" fontSize='18px'>
                                                Enter the Code
                                            </Text>
                                            <Text color="red.400" className="text-xl mt-2">*</Text>
                                        </div>


                                        <div className="flex-grow relative">
                                            <Textarea bgColor={'#EBEBEB'} color={'#646464'} fontSize="18px"
                                                      placeholder='Paste code here' value={values.value2}
                                                      name={values.value2}
                                                      onChange={(event) => handleChange(event, 'value2')} style={{
                                                height: calculateHeight(values.value2),
                                                minHeight: '27rem'
                                            }}/>

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
