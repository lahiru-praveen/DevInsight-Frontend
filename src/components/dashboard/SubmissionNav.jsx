import { useState, useEffect } from 'react';
import { Text, Flex, Box } from '@chakra-ui/react';
import axios from "axios";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import SubmissionModal from './SubmissionModal';
import {FcFile} from "react-icons/fc";
import ToolTip from "../../context/ToolTip.jsx";
import {Icon} from "@chakra-ui/icons";

export default function SubmissionNav() {
    const [submissions, setSubmissions] = useState([]);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const user = sessionStorage.getItem("email");


        useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:8000/pre-sub', {
                    params: {
                        user: user
                    }
                });
                if (result.status === 200) {
                    // Slice the last 10 submissions
                    const lastTenSubmissions = result.data.slice(-10);
                    setSubmissions(lastTenSubmissions);
                } else {
                    console.error("Failed to fetch data:", result.message);
                }
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };
        fetchData().then(r => console.log(r));
    }, []);

    const handleSubmissionClick = (submission) => {
        setSelectedSubmission(submission);
    };

    return (
        <div className="flex flex-col bg-[#EBEBEB] mt-4 ml-2">
            <div className="mt-4 ml-2 mr-2">
                <h1 className="text-xl font-bold mb-4">Latest Submissions</h1>
                <Flex alignItems="center" p={2} borderBottom="1px solid #ccc">
                    <Box as="span" mr={2}>
                        <BsFileEarmarkMedicalFill />
                    </Box>
                    <Text as="span" fontSize="sm" className="font-bold">Project Name</Text>
                    <Text as="span" fontSize="sm" ml="auto" className="font-bold">Submitted Date</Text>
                </Flex>
                {submissions.map((submission, index) => (
                    <Flex key={index} alignItems="center" p={2} borderBottom="1px solid #ccc" className="mb-2" onClick={() => handleSubmissionClick(submission)} style={{ cursor: 'pointer' }} >
                        <Box as="span" mr={2}>
                            {submission.mode === 1 ?
                                (<ToolTip tooltip='Code Upload'>
                                    <Icon as={FaCode} boxSize={'20px'} className="mr-2" />
                                </ToolTip>)
                                : (submission.mode === 2 ?
                                    (<ToolTip tooltip='File Upload'>
                                        <Icon as={FcFile} boxSize={'20px'} className="mr-2" />
                                    </ToolTip>)
                                : (<ToolTip tooltip='Code Upload / File Upload'>
                                    <Icon as={BsFileEarmarkMedicalFill} boxSize={'20px'} className="mr-2" />
                                 </ToolTip>)
                                )
                            }
                        </Box>
                        <Text as="span" fontSize="sm">{submission.p_name}</Text>
                        <Text as="span" fontSize="sm" ml="auto">{submission.submission_date}</Text>
                    </Flex>
                ))}
            </div>

            {/* Render the modal */}
            {selectedSubmission && (
                <SubmissionModal
                    isOpen={true} // Pass isOpen as true to open the modal
                    onClose={() => setSelectedSubmission(null)} // Close modal when onClose is triggered
                    p_name={selectedSubmission.p_name}
                    code={selectedSubmission.code}
                    des={selectedSubmission.description}
                    entity_id={selectedSubmission.p_id}
                />
            )}
        </div>
    );
}
