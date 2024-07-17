import { useState } from 'react';
import { Card, Text, Flex, CardHeader } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ToolTip from "../../context/ToolTip.jsx";
import { Icon } from "@chakra-ui/icons";
import { FcExpand } from 'react-icons/fc';
import { VscBlank } from 'react-icons/vsc';
import RequestModal from '../HelpDesk/RequestModals.jsx';

export default function Requests({ request, drop }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const { p_id, p_name, r_id, r_subject, r_content, r_status, date, qae } = request;

    const dropType = drop === 0
        ? <Icon as={FcExpand} boxSize={25} className="mr-2" onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }} />
        : <Icon as={VscBlank} boxSize={25} className="mr-2" />;

    const getStatusColor = (status) => {
        return status === 'Pending' ? 'red.500' : status === 'Completed' ? 'green.500' : 'black';
    };

    return (
        <>
            <div>
                <Card bg="#f5f5f5" mb={2} mt={1} borderRadius="md">
                    <Flex flexDirection="row" >
                        <CardHeader mr={4} w="150px">
                            <Text fontWeight="500" fontSize="16px" color="gray.700">{p_id}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="260px">
                            <Text fontWeight="500" fontSize="16px" color="gray.700">{p_name}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="130px">
                            <Text fontWeight="500" fontSize="16px" color="gray.700">{r_id}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="300px">
                            <Text fontWeight="500" fontSize="16px" color="gray.700">{r_subject}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="500px">
                            <Text fontWeight="500" w="200px" fontSize="16px" color="gray.700" isTruncated>{r_content}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="500px">
                            <Text fontWeight="bold" fontSize="16px" color="gray.700" isTruncated>{qae}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="150px">
                            <Text fontWeight="500" fontSize="16px"  color={getStatusColor(r_status)}>{r_status}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="200px">
                            <Text fontWeight="500" fontSize="16px" color="gray.700">{date}</Text>
                        </CardHeader>
                        <CardHeader>
                            <ToolTip tooltip="Expand the request">
                                {dropType}
                            </ToolTip>
                        </CardHeader>
                    </Flex>
                </Card>
            </div>
            <RequestModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} p_name={p_name} subject={r_subject} request={r_content} r_id={r_id} p_id={p_id} qae={qae}/>
        </>
    );
}

Requests.propTypes = {
    request: PropTypes.shape({
        p_id: PropTypes.number.isRequired,
        p_name: PropTypes.string.isRequired,
        r_id: PropTypes.number.isRequired,
        r_subject: PropTypes.string.isRequired,
        r_content: PropTypes.string.isRequired,
        r_status: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        qae: PropTypes.string.isRequired
    }).isRequired,
    drop: PropTypes.number.isRequired
};
