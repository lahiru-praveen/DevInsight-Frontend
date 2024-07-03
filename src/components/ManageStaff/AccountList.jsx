

// import { Select, Input, InputGroup, InputLeftElement, Button, Alert, AlertIcon, Spinner } from '@chakra-ui/react';
// import { Search2Icon } from "@chakra-ui/icons";
// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     FormControl,
//     FormLabel,
//     useDisclosure,
//     Text
// } from '@chakra-ui/react';
// import pp from '../../assets/pp.jpeg';
// import { useState, useEffect } from "react";
// import axios from "axios";

// const MyComponent = () => {
//     const [activeMembers, setActiveMembers] = useState([]);
//     const [filteredMembers, setFilteredMembers] = useState([]);
//     const { isOpen: isRoleModalOpen, onOpen: onRoleModalOpen, onClose: onRoleModalClose } = useDisclosure();
//     const { isOpen: isConfirmModalOpen, onOpen: onConfirmModalOpen, onClose: onConfirmModalClose } = useDisclosure();
//     const { isOpen: isLoadingModalOpen, onOpen: onLoadingModalOpen, onClose: onLoadingModalClose } = useDisclosure(); // Loading modal state
//     const [index, setIndex] = useState(null);
//     const [error, setError] = useState(null);
//     const [role, setRole] = useState("");
//     const [query, setQuery] = useState("");
//     const [selectedRole, setSelectedRole] = useState("All");
//     const [roleError, setRoleError] = useState("");
//     const [isRoleChanged, setIsRoleChanged] = useState(false);
//     const [successAlert, setSuccessAlert] = useState(false);

//     const handleAddInvite = async () => {
//         try {
//             onLoadingModalOpen(); // Show loading modal
//             const memberToUpdate = activeMembers[index];

//             // Call the API endpoint to update the member's role
//             const response = await axios.put('http://127.0.0.1:8000/update-member-role', {
//                 organization_email: "devinsight@gmail.com", // Hardcoded organization email
//                 email: memberToUpdate.email,
//                 first_name: memberToUpdate.first_name,
//                 last_name: memberToUpdate.last_name,
//                 new_role: role
//             });

//             if (response.status === 200) {
//                 const updatedMembers = activeMembers.map((member, idx) =>
//                     idx === index ? { ...member, role: role } : member
//                 );
//                 setActiveMembers(updatedMembers);
//                 setFilteredMembers(updatedMembers);
//                 setRoleError("");
//                 onRoleModalClose();
//                 onConfirmModalClose();

//                 // Show success alert
//                 setSuccessAlert(true);
//             } else {
//                 setError("Error updating role. Please try again later.");
//             }
//         } catch (error) {
//             console.error('Error updating role:', error);
//             setError("Error updating role. Please try again later.");
//         } finally {
//             onLoadingModalClose(); // Hide loading modal
//         }
//     };

//     useEffect(() => {
//         const fetchActiveMembers = async () => {
//             try {
//                 const organization_email = "devinsight@gmail.com"; // Hardcoded organization email
//                 const response = await axios.get(`http://127.0.0.1:8000/get-members-by-organization-email/${organization_email}`);
//                 console.log(response.data);
//                 setActiveMembers(response.data);
//                 setFilteredMembers(response.data);
//                 console.log(activeMembers);
//                 console.log(filteredMembers);
//             } catch (error) {
//                 console.error('Error fetching active members:', error);
//             }
//         };

//         fetchActiveMembers();
//     }, []);

//     useEffect(() => {
//         const filterMembers = () => {
//             let filteredData = activeMembers;

//             if (query) {
//                 filteredData = filteredData.filter((item) =>
//                     item.first_name.toLowerCase().includes(query.toLowerCase()) ||
//                     item.last_name.toLowerCase().includes(query.toLowerCase()) ||
//                     item.email.toLowerCase().includes(query.toLowerCase())
//                 );
//             }

//             if (selectedRole && selectedRole !== "All") {
//                 filteredData = filteredData.filter((item) => item.role === selectedRole);
//             }

//             setFilteredMembers(filteredData);
//         };

//         filterMembers();
//     }, [query, selectedRole, activeMembers]);

//     const onOpenRoleModal = (index) => {
//         setIndex(index);
//         setRole(activeMembers[index].role);
//         setIsRoleChanged(false); // Reset role changed state
//         onRoleModalOpen();
//     };

//     const handleRoleFilterChange = (e) => {
//         setSelectedRole(e.target.value);
//     };

//     const handleRoleChange = (e) => {
//         setRole(e.target.value);
//         setIsRoleChanged(e.target.value !== activeMembers[index].role); // Check if the role has changed
//     };

//     const handleConfirmChange = () => {
//         onConfirmModalOpen();
//     };

//     const closeSuccessAlert = () => {
//         setSuccessAlert(false);
//     };

//     return (
//         <div className='px-20 py-5 '>
//             <Modal
//                 isOpen={isRoleModalOpen}
//                 onClose={onRoleModalClose}
//             >
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Change Role</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody pb={6}>
//                         <FormControl mt={4}>
//                             <FormLabel>Role</FormLabel>
//                             <Select
//                                 value={role}
//                                 onChange={handleRoleChange}
//                                 placeholder="Select role"
//                             >
//                                 <option value="Quality assurance">Quality assurance</option>
//                                 <option value="Developer">Developer</option>
//                             </Select>
//                             {roleError && <Text color="red.500" fontSize="sm">{roleError}</Text>}
//                         </FormControl>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button colorScheme="blue" mr={3} onClick={handleConfirmChange} isDisabled={!isRoleChanged}>
//                             Change
//                         </Button>
//                         <Button onClick={onRoleModalClose}>Cancel</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>

//             <Modal
//                 isOpen={isConfirmModalOpen}
//                 onClose={onConfirmModalClose}
//             >
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Confirm Role Change</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <Text>Are you sure you want to change the role of {activeMembers[index]?.first_name} {activeMembers[index]?.last_name} to {role}?</Text>
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button colorScheme="blue" mr={3} onClick={handleAddInvite}>
//                             Confirm
//                         </Button>
//                         <Button onClick={onConfirmModalClose}>Cancel</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>

//             <Modal isOpen={isLoadingModalOpen} onClose={onLoadingModalClose} isCentered>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalBody textAlign="center">
//                         <Spinner size="xl" />
//                         <Text mt={4}>Changing the role...</Text>
//                     </ModalBody>
//                 </ModalContent>
//             </Modal>

//             {successAlert && (
//                 <Alert
//                 status="success"
//                 variant="subtle"
//                 flexDirection="column"
//                 alignItems="center"
//                 justifyContent="center"
//                 textAlign="center"
//                 mb={4}
//             >
//                 <AlertIcon boxSize="40px" mr={0} />
//                 <Text fontSize="lg" mt={2}>
//                     Role changed successfully!
//                 </Text>
//                 <Text
//                     as="button"
//                     onClick={closeSuccessAlert}
//                     mt={4}
//                     color="blue.500"
//                     fontSize="sm"
//                     fontWeight="bold"
//                     textDecoration="underline"
//                     _hover={{ cursor: 'pointer', textDecoration: 'none' }}
//                 >
//                     Close
//                 </Text>
//             </Alert>
//             )}

//             <h1 className="py-5 text-xl leading-tight font-bold text-gray-500">
//                 Active Members
//             </h1>
//             <div className='flex flex-row space-x-5 py-5'>
//                 <div className='basis-1/4'>
//                     <Select  onChange={handleRoleFilterChange} value={selectedRole}>
//                         <option value='All'>All</option>
//                         <option value='Quality assurance'>Quality assurance</option>
//                         <option value='Developer'>Developer</option>
//                     </Select>
//                 </div>
//                 <div className='basis-3/4'>
//                     <InputGroup>
//                         <InputLeftElement children={<Search2Icon color="gray.600" />} />
//                         <Input placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
//                     </InputGroup>
//                 </div>
                
//             </div>
//             <div className="w-full overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
//                 <div className="flow-root w">
//                     <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
//                         <li className="py-2 sm:py-4 flex justify-between font-semibold text-gray-700 dark:text-gray-300">
                        
//                             <div className="  w-1/3  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MEMBERS</div>
//                             <div className=" w-1/3  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE</div>
//                             <div className="  w-1/3  py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</div>
//                         </li>
//                         {filteredMembers.map((member, index) => (
//                             <li key={index} className="py-3 sm:py-4">
//                                 <div className="flex items-center justify-between">
//                                     <div className="flex items-center w-1/3">
//                                         <div className="flex-shrink-0">
//                                             <img className="w-8 h-8 rounded-full" src={pp} alt={`${member.first_name} ${member.last_name}`} />
//                                         </div>
//                                         <div className="flex-1 min-w-0 ms-4">
//                                             <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                                                 {`${member.first_name} ${member.last_name}`}
//                                             </p>
//                                             <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                                                 {member.email}
//                                             </p>
//                                         </div>
//                                         </div>
//                                     <p className="text-sm font-medium text-gray-900 truncate dark:text-white w-1/3">
//                                         {member.role}
//                                     </p>
//                                     <div className="w-1/3 text-right">
                                        
//                                         <button onClick={() => onOpenRoleModal(index)} className="px-3 py-1 text-blue-500 hover:text-blue-600">Change Role</button>
//                                     </div>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyComponent;

import { useState, useEffect } from "react";
import axios from "axios";
import {Select, Input, InputGroup, InputLeftElement, Button, Alert, AlertIcon, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, useDisclosure, Text} from '@chakra-ui/react';
import { Search2Icon } from "@chakra-ui/icons";
import pp from '../../assets/pp.jpeg';

const MyComponent = () => {
    const [activeMembers, setActiveMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const { isOpen: isRoleModalOpen, onOpen: onRoleModalOpen, onClose: onRoleModalClose } = useDisclosure();
    const { isOpen: isConfirmModalOpen, onOpen: onConfirmModalOpen, onClose: onConfirmModalClose } = useDisclosure();
    const { isOpen: isLoadingModalOpen, onOpen: onLoadingModalOpen, onClose: onLoadingModalClose } = useDisclosure(); // Loading modal state
    const [index, setIndex] = useState(null);
    const [error, setError] = useState(null);
    const [role, setRole] = useState("");
    const [query, setQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState("All");
    const [roleError, setRoleError] = useState("");
    const [isRoleChanged, setIsRoleChanged] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const organization_email = sessionStorage.getItem('email');

    useEffect(() => {
        const fetchActiveMembers = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/get-members-by-organization-email/${organization_email}`);
                console.log(response.data);
                const activeMembers = response.data.filter(member => member.profileStatus !== 'Deactive');
                setActiveMembers(activeMembers);
                setFilteredMembers(activeMembers);
            } catch (error) {
                console.error('Error fetching active members:', error);
            }
        };

        fetchActiveMembers();
    }, []);

    useEffect(() => {
        const filterMembers = () => {
            let filteredData = activeMembers;

            if (query) {
                filteredData = filteredData.filter((item) =>
                    item.username.toLowerCase().includes(query.toLowerCase()) ||
                    item.email.toLowerCase().includes(query.toLowerCase())
                );
            }

            if (selectedRole && selectedRole !== "All") {
                filteredData = filteredData.filter((item) => item.role === selectedRole);
            }

            setFilteredMembers(filteredData);
        };

        filterMembers();
    }, [query, selectedRole, activeMembers]);

    const onOpenRoleModal = (index) => {
        setIndex(index);
        setRole(activeMembers[index].role);
        setIsRoleChanged(false); // Reset role changed state
        onRoleModalOpen();
    };

    const handleRoleFilterChange = (e) => {
        setSelectedRole(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setIsRoleChanged(e.target.value !== activeMembers[index].role); // Check if the role has changed
    };

    const handleConfirmChange = () => {
        onConfirmModalOpen();
    };

    const handleRoleUpdate = async () => {
        try {
            onLoadingModalOpen(); // Show loading modal
            const memberToUpdate = activeMembers[index];

            // Call the API endpoint to update the member's role
            const response = await axios.put('http://127.0.0.1:8000/update-member-role', {
                organization_email: "devinsight@gmail.com", // Hardcoded organization email
                email: memberToUpdate.email,
                first_name: memberToUpdate.first_name,
                last_name: memberToUpdate.last_name,
                new_role: role
            });

            if (response.status === 200) {
                const updatedMembers = activeMembers.map((member, idx) =>
                    idx === index ? { ...member, role: role } : member
                );
                setActiveMembers(updatedMembers);
                setFilteredMembers(updatedMembers);
                setRoleError("");
                onRoleModalClose();
                onConfirmModalClose();

                // Show success alert
                setSuccessAlert(true);
            } else {
                setError("Error updating role. Please try again later.");
            }
        } catch (error) {
            console.error('Error updating role:', error);
            setError("Error updating role. Please try again later.");
        } finally {
            onLoadingModalClose(); // Hide loading modal
        }
    };

    const handleBlockOrUnblock = async (member, action) => {
        try {
            onLoadingModalOpen(); // Show loading modal

            // Call the API endpoint to block or unblock the member
            const response = await axios.put('http://127.0.0.1:8000/block-unblock-member', {
                organization_email: "devinsight@gmail.com", // Hardcoded organization email
                email: member.email,
                action: action
            });

            if (response.status === 200) {
                const updatedMembers = activeMembers.map(mem =>
                    mem.email === member.email ? { ...mem, profileStatus: action === 'block' ? 'Blocked' : 'Active' } : mem
                );
                setActiveMembers(updatedMembers);
                setFilteredMembers(updatedMembers);
                setRoleError("");
                onLoadingModalClose();

                // Show success alert
                setSuccessAlert(true);
            } else {
                setError("Error updating profile status. Please try again later.");
            }
        } catch (error) {
            console.error('Error updating profile status:', error);
            setError("Error updating profile status. Please try again later.");
        } finally {
            onLoadingModalClose(); // Hide loading modal
        }
    };

    const closeSuccessAlert = () => {
        setSuccessAlert(false);
    };

    return (
        <div className='px-20 py-5'>
            <Modal isOpen={isRoleModalOpen} onClose={onRoleModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Role</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Role</FormLabel>
                            <Select
                                value={role}
                                onChange={handleRoleChange}
                                placeholder="Select role"
                            >
                                <option value="Quality assurance">Quality assurance</option>
                                <option value="Developer">Developer</option>
                            </Select>
                            {roleError && <Text color="red.500" fontSize="sm">{roleError}</Text>}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleConfirmChange} isDisabled={!isRoleChanged}>
                            Change
                        </Button>
                        <Button onClick={onRoleModalClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isConfirmModalOpen}
                onClose={onConfirmModalClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Role Change</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Are you sure you want to change the role of {activeMembers[index]?.username} to {role}?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleRoleUpdate}>
                            Confirm
                        </Button>
                        <Button onClick={onConfirmModalClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={isLoadingModalOpen} onClose={onLoadingModalClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody textAlign="center">
                        <Spinner size="xl" />
                        <Text mt={4}>Processing...</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {successAlert && (
                <Alert
                    status="success"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    mb={4}
                >
                    <AlertIcon boxSize="40px" mr={0} />
                    <Text fontSize="lg">Action performed successfully!</Text>
                    <Text
                        as="button"
                        onClick={closeSuccessAlert}
                        mt={4}
                        color="blue.500"
                        fontSize="sm"
                        fontWeight="bold"
                        textDecoration="underline"
                        _hover={{ cursor: 'pointer', textDecoration: 'none' }}
                    >
                        Close
                    </Text>
                </Alert>
            )}

            <h1 className="py-5 text-xl leading-tight font-bold text-gray-500">
                Active Members
            </h1>
            <div className='flex flex-row space-x-5 py-5'>
                <div className='basis-1/4'>
                    <Select onChange={handleRoleFilterChange} value={selectedRole}>
                        <option value='All'>All</option>
                        <option value='Quality assurance'>Quality assurance</option>
                        <option value='Developer'>Developer</option>
                    </Select>
                </div>
                <div className='basis-3/4'>
                    <InputGroup>
                        <InputLeftElement children={<Search2Icon color="gray.600" />} />
                        <Input placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
                    </InputGroup>
                </div>
            </div>
            <div className="w-full overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flow-root w">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="py-2 sm:py-4 flex justify-between font-semibold text-gray-700 dark:text-gray-300">
                            <div className="w-1/3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MEMBERS</div>
                            <div className="w-1/3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE</div>
                            <div className="w-1/3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</div>
                        </li>
                        {filteredMembers.map((member, index) => (
                            <li key={index} className="py-3 sm:py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center w-1/3">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={member.profilePicture !== " " ? member.profilePicture : pp } alt={`${member.username} `} />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {`${member.username}`}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                {member.email}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white w-1/3">
                                        {member.role}
                                    </p>
                                    <div className="w-1/3 text-right">
                                        <Button onClick={() => onOpenRoleModal(index)} colorScheme="blue" size="sm"
                                        isDisabled={member.profileStatus === 'Blocked'}>
                                            Change Role
                                        </Button>
                                        {member.profileStatus === 'Active' && (
                                            <Button onClick={() => handleBlockOrUnblock(member, 'block')} colorScheme="red" size="sm" ml={2}>
                                                Block
                                            </Button>
                                        )}
                                        {member.profileStatus === 'Blocked' && (
                                            <Button onClick={() => handleBlockOrUnblock(member, 'unblock')} colorScheme="green" size="sm" ml={2}>
                                                Unblock
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;