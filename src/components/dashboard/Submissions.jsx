import { Card, Text, Flex, CardHeader } from "@chakra-ui/react";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import PropTypes from 'prop-types';

export default function Submissions({ submission }) {
    const { projectId, submissionDate, language, description } = submission;

    return (
        <Card>
            <Flex flexDirection="row">
                <CardHeader className="mr-4 w-[100px]">
                    <BsFileEarmarkMedicalFill />
                </CardHeader>
                <CardHeader className="mr-4 w-[150px]">
                    <Text className="font-bold" fontSize="14px">{projectId}</Text>
                </CardHeader>
                <CardHeader className="mr-4 w-[300px]">
                    <Text className="font-bold" fontSize="14px">{submissionDate}</Text>
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
        projectId: PropTypes.string.isRequired,
        submissionDate: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};
