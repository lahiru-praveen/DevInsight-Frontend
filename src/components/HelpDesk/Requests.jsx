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
    const {p_id,p_name,r_id,r_subject,r_content,r_status,date } = request;

    const dropType = drop === 0 ? <Icon as={FcExpand} boxSize={25} className="mr-2" onClick={() => setModalOpen(true)} style={{ cursor: 'pointer' }} /> : <Icon as={VscBlank} boxSize={25} className="mr-2" />;

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
                            <Text fontWeight="bold" fontSize="16px">{r_status}</Text>
                        </CardHeader>
                        <CardHeader mr={4} w="200px">
                            <Text fontWeight="bold" fontSize="16px">{date}</Text>
                        </CardHeader>
                        <CardHeader>
                            <ToolTip tooltip="Expand the submission">
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

Requests.propTypes = {
    request: PropTypes.shape({
        p_id: PropTypes.number.isRequired,
        p_name: PropTypes.string.isRequired,
        r_id: PropTypes.number.isRequired,
        r_subject: PropTypes.string.isRequired,
        r_content: PropTypes.string.isRequired,
        r_status: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    }).isRequired,
    drop: PropTypes.number.isRequired
};
