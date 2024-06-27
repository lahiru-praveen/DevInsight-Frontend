import { useEffect, useState } from 'react';
import { Card, Text, Flex, CardHeader} from '@chakra-ui/react';
import { BsFileEarmarkMedicalFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { FaCode } from 'react-icons/fa';
import { FcAssistant, FcCancel, FcDisapprove, FcExpand, FcFile, FcSms } from 'react-icons/fc';
import { VscBlank } from 'react-icons/vsc';
import { IoPeople } from 'react-icons/io5';
import SubmissionModal from './SubmissionModal.jsx';
import { Icon } from "@chakra-ui/icons";
import axios from "axios";
import ToolTip from "../../context/ToolTip.jsx";

export default function Submissions({ submission, drop }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const { _id, p_id, p_name, f_name, submission_date, language, description, code, mode } = submission;
    const [reqId, setReqId] = useState(""); // State to store req_id
    console.log(_id);
    const typeIcon = mode === 1 ?
        (<ToolTip tooltip='Code Upload'>
            <Icon as={FaCode} boxSize={25} color='blue.200' className="mr-2" />
        </ToolTip>) :
        (mode === 2 ?
            (<ToolTip tooltip='File Upload'>
                <Icon as={FcFile} boxSize={25} className="mr-2" />
            </ToolTip>)
            : (<ToolTip tooltip='Code Upload / File Upload'>
                <Icon as={BsFileEarmarkMedicalFill} boxSize={25} className="mr-2" />
            </ToolTip>));

    const file_name = f_name === '' ?
        <div className="ml-5">
            <ToolTip tooltip="No any file here">
                <Icon as={FcSms} boxSize={25} className="mr-2" />
            </ToolTip>
        </div>
        : (f_name);

    const dropType = drop === 0 ? <Icon as={FcExpand} boxSize={25} className="mr-2" onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }} /> : <Icon as={VscBlank} boxSize={25} className="mr-2" />;

    const helpType = code === 1 ?
        <ToolTip tooltip="Ask the QAE">
            <Icon as={IoPeople} boxSize={25} className="mr-2" />
        </ToolTip>
        : (reqId === "" ?
                <ToolTip tooltip="No any questons for QAE">
                    <Icon as={FcCancel} boxSize={25} className="mr-2" />
                </ToolTip>
                :
                <ToolTip tooltip="Asked help from QAE">
                    <Icon as={FcAssistant} boxSize={25} className="mr-2" />
                </ToolTip>
        );

    const lan = language === "Not given" || language === "not mentioned" ?
        <div className="ml-5">
            <ToolTip tooltip='Language not given' >
                <Icon as={FcDisapprove} boxSize={25} className="mr-2" />
            </ToolTip>
        </div>
        : language;
    const des = description === "Not given" || description === "" ?
        <div className="ml-5">
            <ToolTip tooltip='No any description given'>
                <Icon as={FcDisapprove} title="This is" boxSize={25} className="mr-2" />
            </ToolTip>
        </div>
        : description;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:8000/get-request-id/${p_id}`); // Assuming p_id is the project id
                console.log("Fetch Result: ", result); // Log the entire response
                if (result.data !== null) {
                    setReqId(result.data); // Set the req_id in state
                }
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };
        fetchData().then(r => console.log(r)) ; // Fetch data when component mounts
    }, [p_id]); // Fetch data when p_id changes

    return (
        <>
            <div>
                <Card>
                    <Flex flexDirection="row" className="bg-[#EBEBEB] mb-2 mt-1">
                        <CardHeader className="mr-4 w-[50px]">
                            {typeIcon}
                        </CardHeader>
                        <CardHeader className="mr-4 w-[150px]">
                            <Text className="font-bold" fontSize="16px">{p_id}</Text>
                        </CardHeader>
                        <CardHeader className="mr-4 w-[350px]">
                            <Text className="font-bold" fontSize="16px">{p_name}</Text>
                        </CardHeader>
                        <CardHeader className="mr-4 w-[300px]">
                            <Text className="font-bold" fontSize="16px">{file_name}</Text>
                        </CardHeader>
                        <CardHeader className="mr-4 w-[200px]">
                            <Text className="font-bold" fontSize="16px">{submission_date}</Text>
                        </CardHeader>
                        <CardHeader className="mr-4 w-[200px]">
                            <Text className="font-bold" fontSize="16px">{lan}</Text>
                        </CardHeader>
                        <CardHeader className="mr-4 w-[600px]">
                            <Text className="font-bold w-[600px]" fontSize="16px" isTruncated  >{des}</Text>
                        </CardHeader>
                        <CardHeader>
                            {helpType}
                        </CardHeader>
                        <CardHeader>
                            <ToolTip tooltip="Expand the submission">
                                {dropType}
                            </ToolTip>
                        </CardHeader>
                    </Flex>
                </Card>
            </div>
            <SubmissionModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                p_name={p_name}
                code={code}
                des={description}
                entity_id={p_id}
            />

        </>
    );
}

// Add prop type validation
Submissions.propTypes = {
    submission: PropTypes.shape({
        _id: PropTypes.shape({
            $oid: PropTypes.string.isRequired
        }).isRequired,
        p_id: PropTypes.number.isRequired,
        p_name: PropTypes.string.isRequired,
        f_name: PropTypes.string.isRequired,
        submission_date: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        mode: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
    }).isRequired,
    drop: PropTypes.number.isRequired
};