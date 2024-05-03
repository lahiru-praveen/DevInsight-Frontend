import { Card, Text, Flex, CardHeader } from "@chakra-ui/react";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import PropTypes from 'prop-types';
import {FaCode} from "react-icons/fa";
import {CiFileOn} from "react-icons/ci";

export default function Submissions({ submission }) {
    const { p_id, p_name, submission_date, language, description, code, mode } = submission;
    console.log(language);
    console.log(code);
    console.log(description);


    // Define the icon based on the mode value
    const icon = mode === 1 ? <FaCode size="30px" /> : (mode === 2 ? <CiFileOn size="30px" /> : <BsFileEarmarkMedicalFill size="30px" />)

    return (
        <Card>
            <Flex flexDirection="row">
                <CardHeader className="mr-4 w-[100px]">
                    {icon} {/* Render the icon */}
                </CardHeader>
                <CardHeader className="mr-4 w-[150px]">
                    <Text className="font-bold" fontSize="14px">{p_id}</Text>
                </CardHeader>
                <CardHeader className="mr-4 w-[150px]">
                    <Text className="font-bold" fontSize="14px">{p_name}</Text>
                </CardHeader>
                <CardHeader className="mr-4 w-[300px]">
                    <Text className="font-bold" fontSize="14px">{submission_date}</Text>
                </CardHeader>
                <CardHeader className="mr-4 w-[200px]">
                    <Text className="font-bold" fontSize="14px">{language}</Text>
                </CardHeader>
                <CardHeader className="mr-4 w-[600px]">
                    <Text className="font-bold" fontSize="14px">{description}</Text>
                </CardHeader>
                <CardHeader>
                </CardHeader>
            </Flex>
        </Card>
    );
}

// Add prop type validation
Submissions.propTypes = {
    submission: PropTypes.shape({
        p_id: PropTypes.string.isRequired, // Update the prop type for p_id
        p_name: PropTypes.string.isRequired,
        submission_date: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        mode: PropTypes.number.isRequired, // Add prop type for mode
        code: PropTypes.string.isRequired
    }).isRequired,
};
