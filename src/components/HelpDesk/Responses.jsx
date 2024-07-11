import { useState } from 'react';
import { Card, Text, Flex, CardHeader } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ToolTip from "../../context/ToolTip.jsx";
import { Icon } from "@chakra-ui/icons";
import { FcExpand } from 'react-icons/fc';
import { VscBlank } from 'react-icons/vsc';
import RequestModal from '../HelpDesk/RequestModals.jsx';
import ResponseModals from "./ResponseModals.jsx";
export default function Responses({ request, drop }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const { user, response_content, response_status, response_date } = response;

    const dropType = drop === 0
        ? <Icon as={FcExpand} boxSize={25} className="mr-2" onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }} />
        : <Icon as={VscBlank} boxSize={25} className="mr-2" />;

    const getStatusColor = (status) => {
        return status === 'Pending' ? 'red.500' : status === 'Completed' ? 'green.500' : 'black';
    };

    return (
        <>
            <div>
                <Card>
                    <Flex flexDirection="row" bg="#EBEBEB" mb={2} mt={1}>
                        <CardHeader mr={4} w="150px">
                            <Text fontWeight="bold" fontSize="16px">{p_id}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="350px">
                            <Text fontWeight="bold" fontSize="16px">{p_name}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="300px">
                            <Text fontWeight="bold" fontSize="16px">{r_id}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="200px">
                            <Text fontWeight="bold" fontSize="16px">{r_subject}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="600px">
                            <Text fontWeight="bold" w="600px" fontSize="16px" isTruncated>{r_content}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="350px">
                            <Text fontWeight="bold" fontSize="16px" color={getStatusColor(r_status)}>{r_status}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="200px">
                            <Text fontWeight="bold" fontSize="16px">{date}</Text>
                        </CardHeader>
                        <CardHeader>
                            <ToolTip tooltip="Expand the response">
                                {dropType}
                            </ToolTip>
                        </CardHeader>
                    </Flex>
                </Card>
            </div>
            <RequestModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} p_name={p_name} subject={r_subject} request={r_content} r_id={r_id} p_id={p_id}/>
        </>
    );
}

Responses.propTypes = {
    request: PropTypes.shape({
        p_id: PropTypes.number.isRequired,
        r_id: PropTypes.number.isRequired,
        user: PropTypes.string.isRequired,
        response_content: PropTypes.string.isRequired,
        response_status: PropTypes.string.isRequired,
        reponse_date: PropTypes.string.isRequired,
    }).isRequired,
    drop: PropTypes.number.isRequired
};
