import { useState, useEffect } from 'react';
import { Text, Flex, Box } from '@chakra-ui/react';
import axios from "axios";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import {FaCode} from "react-icons/fa";
import {CiFileOn} from "react-icons/ci";

export default function SubmissionNav() {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:8000/pre-sub');
                if (result.status === 200) {
                    setSubmissions(result.data);
                } else {
                    console.error("Failed to fetch data:", result.message);
                }
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };
        fetchData().then(r => console.log(r));
    }, []);

    return (
        <div className="flex flex-col h-screen bg-[#EBEBEB] mt-4 ml-2">
            <div className="mt-4 ml-2 mr-2">
                <h1 className="text-xl font-bold mb-4">Previous Submission List</h1>
                <Flex alignItems="center" p={2} borderBottom="1px solid #ccc">
                    <Box as="span" mr={2}>
                        <BsFileEarmarkMedicalFill />
                    </Box>
                    <Text as="span" fontSize="sm" className="font-bold">Project Name</Text>
                    <Text as="span" fontSize="sm" ml="auto" className="font-bold">Submitted Date</Text>
                </Flex>
                {submissions.map((submission, index) => (
                    <Flex key={index} alignItems="center" p={2} borderBottom="1px solid #ccc" className="mb-2">
                        <Box as="span" mr={2}>
                            {submission.mode === 1 ? <FaCode /> : (submission.mode === 2 ? <CiFileOn/> : <BsFileEarmarkMedicalFill/>)}
                        </Box>
                        <Text as="span" fontSize="sm">{submission.p_name}</Text>
                        <Text as="span" fontSize="sm" ml="auto">{submission.submission_date}</Text>
                    </Flex>
                ))}
            </div>
        </div>
    );
}

