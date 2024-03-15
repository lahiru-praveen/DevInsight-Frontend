import { useState, useEffect } from 'react';
import { Button, Tabs, TabList, TabPanels, Tab, TabPanel, Textarea, Text } from '@chakra-ui/react';
import LanguageSelectMenu from "../../components/dashboard/LanguageSelectMenu.jsx";
import FileUploadBox from "../../components/dashboard/FileUploadBox.jsx";

export default function DashboardMain() {
    const [values, setValues] = useState({
        value0: '',
        value1: '',
        value2: ''
    });

    const [files, setFiles] = useState([]);
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [fileTabDisabled, setFileTabDisabled] = useState(false);
    const [codeTabDisabled, setCodeTabDisabled] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Your submit logic here
    };

    useEffect(() => {
        // Enable submit button if files are chosen or textarea is filled
        setSubmitEnabled(files.length > 0 || values.value2.trim() !== '');
    }, [files, values.value2]);

    useEffect(() => {
        // Disable "Upload File" tab if textarea is filled
        setFileTabDisabled(values.value2.trim() !== '');
    }, [values.value2]);

    useEffect(() => {
        // Disable "Upload Code" tab if files are uploaded
        setCodeTabDisabled(files.length > 0);
    }, [files]);

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
                                <Tab _selected={{ color: 'white', bg: 'blue.500' }} fontSize="18px" isDisabled={fileTabDisabled}>Upload File</Tab>
                                <Tab _selected={{ color: 'white', bg: 'blue.500' }} fontSize="18px" isDisabled={codeTabDisabled}>Upload Code</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <div className="flex flex-col">
                                        <Textarea bgColor={'#EBEBEB'} color={'#646464'} height="auto" fontSize="18px" placeholder='Enter Key words about your code' value={values.value0} onChange={(event) => handleChange(event, 'value0')} style={{ height: calculateHeight(values.value0) }} />
                                        <Text className="font-bold mt-2" fontSize='18px'>
                                            Upload the source file or Project folder
                                        </Text>
                                        <FileUploadBox /> {/* Removed setFiles prop */}
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
