import { useState } from 'react';
import {
    Card,
    Text,
    Flex,
    CardHeader,
} from '@chakra-ui/react';
import { BsFileEarmarkMedicalFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { FaCode, FaFileCode } from 'react-icons/fa';
import {
    FcApproval,
    FcAssistant,
    FcCancel,
    FcDisapprove,
    FcExpand,
    FcFile,
    FcHighPriority,
    FcInspection,
    FcSms
} from 'react-icons/fc';
import { VscBlank } from 'react-icons/vsc';
import { MdRateReview } from 'react-icons/md';
import { IoPeople } from 'react-icons/io5';
import SubmissionModal from './SubmissionModal.jsx';

export default function Submissions({ submission, drop }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const { p_id, p_name, f_name, submission_date, language, description, code, mode } = submission;

    const typeIcon = mode === 1 ? <FaCode size="25px" /> : (mode === 2 ? <FcFile size="25px" /> : <BsFileEarmarkMedicalFill size="25px" />);
    const file_name = f_name === '' ? <FcSms size="25px" /> : (f_name);
    const dropType = drop === 0 ? <FcExpand size="25px" onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }} /> : <VscBlank size="25px" />;
    const codeType = code === 1 ? <FaFileCode size="25px" /> : (code === "" ? <FcHighPriority size="25px" /> : <FcApproval size="25px" />);
    const reviewType = code === 1 ? <MdRateReview size="25px" /> : (code === "" ? <FcHighPriority size="25px" /> : <FcInspection size="25px" />);
    const helpType = code === 1 ? <IoPeople size="25px" /> : (code === "" ? <FcCancel size="25px" /> : <FcAssistant size="25px" />);
    const lan = language === "Not given" ? <FcDisapprove size="25px" /> : language;
    const des = description === "Not given" ? <FcDisapprove size="25px" /> : description;

    return (
        <>
            <Card>
                <Flex flexDirection="row" className="bg-[#EBEBEB] mb-2 mt-1">
                    <CardHeader className="mr-4 w-[100px]">
                        {typeIcon}
                    </CardHeader>
                    <CardHeader className="mr-4 w-[150px]">
                        <Text className="font-bold" fontSize="16px">{p_id}</Text>
                    </CardHeader>
                    <CardHeader className="mr-4 w-[250px]">
                        <Text className="font-bold" fontSize="16px">{p_name}</Text>
                    </CardHeader>
                    <CardHeader className="mr-4 w-[250px]">
                        <Text className="font-bold" fontSize="16px">{file_name}</Text>
                    </CardHeader>
                    <CardHeader className="mr-4 w-[300px]">
                        <Text className="font-bold" fontSize="16px">{submission_date}</Text>
                    </CardHeader>
                    <CardHeader className="mr-4 w-[200px]">
                        <Text className="font-bold" fontSize="16px">{lan}</Text>
                    </CardHeader>
                    <CardHeader className="mr-4 w-[600px]">
                        <Text className="font-bold" fontSize="16px">{des}</Text>
                    </CardHeader>
                    <CardHeader>
                        {codeType}
                    </CardHeader>
                    <CardHeader>
                        {reviewType}
                    </CardHeader>
                    <CardHeader>
                        {helpType}
                    </CardHeader>
                    <CardHeader>
                        {dropType}
                    </CardHeader>
                </Flex>
            </Card>

            <SubmissionModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                p_name={p_name}
                code={code}
                des ={description}
            />
        </>
    );
}

// Add prop type validation
Submissions.propTypes = {
    submission: PropTypes.shape({
        p_id: PropTypes.string.isRequired, // Update the prop type for p_id
        p_name: PropTypes.string.isRequired,
        f_name: PropTypes.string.isRequired,
        submission_date: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        mode: PropTypes.number.isRequired, // Add prop type for mode
        code: PropTypes.string.isRequired,
    }).isRequired,
    drop: PropTypes.number.isRequired
};