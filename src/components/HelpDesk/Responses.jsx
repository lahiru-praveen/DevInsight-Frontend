import { useState } from 'react';
import { Card, Text, Flex, CardHeader } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ToolTip from "../../context/ToolTip.jsx";
import { Icon } from "@chakra-ui/icons";
import { FcAdvance } from "react-icons/fc";
import { VscBlank } from 'react-icons/vsc';
import RequestModal from '../HelpDesk/RequestModals.jsx';
import ResponseModal from "./ResponseModals.jsx";

export default function Responses({ response, drop }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const { p_id, user, p_name, req_id, req_date, req_subject, req_content, res_status, res_date, response_content  } = response;
    console.log(p_id,response_content);
    const dropType = drop === 0
        ? <Icon as={FcAdvance} boxSize={25} className="mr-2" onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }} />
        : <Icon as={VscBlank} boxSize={25} className="mr-2" />;

    const getStatusColor = (status) => {
        return status === 'Pending' ? 'red.500' : status === 'Completed' ? 'green.500' : 'black';
    };

    return (
        <>
            <div>
                <Card bg="#f5f5f5" mb={2} mt={1} borderRadius="md">
                    <Flex flexDirection="row">
                        <CardHeader mr={4} w="300px">
                            <Text fontWeight="500" w="300px" fontSize="16px" color="gray.700" isTruncated>{user}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="300px">
                            <Text fontWeight="500" fontSize="16px" color="gray.700">{p_name}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="150px">
                            <Text fontWeight="500" fontSize="16px" color="gray.700">{req_id}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="150px">
                            <Text fontWeight="500" fontSize="12px" color="gray.700">{req_date}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="300px">
                            <Text fontWeight="500" fontSize="16px" color="gray.700">{req_subject}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="400px">
                            <Text fontWeight="500" w="400px" fontSize="16px" color="gray.700" isTruncated>{req_content}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="200px">
                            <Text fontWeight="500" fontSize="16px"  color={getStatusColor(res_status)}>{res_status}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="150px">
                            <Text fontWeight="500" fontSize="12px" color="gray.700">{res_date}</Text>
                        </CardHeader>
                        <CardHeader>
                            <ToolTip tooltip="Expand the Request">
                                {dropType}
                            </ToolTip>
                        </CardHeader>
                    </Flex>
                </Card>
            </div>
            <ResponseModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} p_id={p_id} p_name={p_name} r_id={req_id} subject={req_subject} request={req_content} response={response_content}  />
        </>
    );
}

Responses.propTypes = {
    response: PropTypes.shape({
        p_id: PropTypes.number.isRequired,
        user: PropTypes.string.isRequired,
        p_name: PropTypes.string.isRequired,
        req_id: PropTypes.number.isRequired,
        req_subject: PropTypes.string.isRequired,
        req_date: PropTypes.string.isRequired,
        req_content: PropTypes.string.isRequired,
        res_status: PropTypes.string.isRequired,
        res_date: PropTypes.string.isRequired,
        response_content: PropTypes.string.isRequired,
    }).isRequired,
    drop: PropTypes.number.isRequired
};
