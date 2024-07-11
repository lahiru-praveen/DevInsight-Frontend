

import { useState, useEffect } from "react";
import axios from "axios";
import {Select, Input, InputGroup, InputLeftElement, Button, Avatar, Alert, AlertIcon, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, useDisclosure, Text, Skeleton, Stack, useToast, Tooltip, Box} from '@chakra-ui/react';
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
    const organization_email = sessionStorage.getItem('email');
    const [MemberCount, setMemeberCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const fetchActiveMembers = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/get-members-by-organization-email/${organization_email}`);
                console.log(response.data);
                const activeMembers = response.data.filter(member => member.profileStatus !== 'Deactive');
                setActiveMembers(activeMembers);
                setMemeberCount(activeMembers.length);
                setFilteredMembers(activeMembers);
                setIsLoading(false);
                setHasFetched(true);
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
                organization_email: organization_email, // getting email from session storage
                email: memberToUpdate.email,
                new_role: role,
                username: memberToUpdate.username
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
                toast({
                    title: "Role Updated.",
                    description: "User Role have been successfully updated",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
            } else {
                setError("Error updating role. Please try again later.");
            }
        } catch (error) {
            console.error('Error updating role:', error);
            setError("Error updating role. Please try again later.");
            toast({
                title: "Role update failed.",
                description: "Error updating role. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
        } finally {
            onLoadingModalClose(); // Hide loading modal
        }
    };

    const handleBlockOrUnblock = async (member, action) => {
        try {
            onLoadingModalOpen(); // Show loading modal

            // Call the API endpoint to block or unblock the member
            const response = await axios.put('http://127.0.0.1:8000/block-unblock-member', {
                organization_email: organization_email, //from session storage
                email: member.email,
                action: action
            });

            if (response.status === 200) {
                const updatedMembers = activeMembers.map(mem =>
                    mem.email === member.email ? { ...mem, profileStatus: action === 'block' ? 'Suspend' : 'Active' } : mem
                );
                setActiveMembers(updatedMembers);
                setFilteredMembers(updatedMembers);
                
                onLoadingModalClose();
                toast({
                    title: "Action Completed.",
                    description: "Account state successfully changed.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });

                // Show success alert
                
            } else {
                toast({
                    title: "Action Failed.",
                    description: "Error changing account state. Please try again later.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                  
            }
        } catch (error) {
            console.error('Error updating profile status:', error)
            toast({
                title: "Action Failed.",
                description: "Error changing account state. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
        } finally {
            onLoadingModalClose(); // Hide loading modal
        }
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

            
            <div className="flex">
            <h1 className=" text-xl leading-tight font-bold text-gray-500">
                Active Members 
            </h1>
            <Tooltip hasArrow label='Number of active members' bg='blue.200' placement='bottom'>
            <h1 className="text-xl leading-tight font-bold text-gray-500 ml-4 bg-blue-100 px-2 rounded">{MemberCount}</h1></Tooltip>
            </div>
            <div className='flex flex-row space-x-5 py-5'>
                <div className='basis-1/4'>
                    <Tooltip hasArrow label='Select the sorting category' bg='blue.200' placement='bottom'>
                    <Select onChange={handleRoleFilterChange} value={selectedRole}>
                        <option value='All'>All</option>
                        <option value='Quality assurance'>Quality assurance</option>
                        <option value='Developer'>Developer</option>
                    </Select>
                    </Tooltip>
                </div>
                <div className='basis-3/4'>
                    <Tooltip hasArrow label='Search the members' bg='blue.200' placement='bottom'>
                    <InputGroup>
                        <InputLeftElement children={<Search2Icon color="gray.600" />} />
                        <Input placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
                    </InputGroup>
                    </Tooltip>
                </div>
            </div>
            <div className="w-full overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flow-root w">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        <li className="flex justify-between font-semibold text-gray-700 dark:text-gray-300">
                            <div className="w-1/3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MEMBERS</div>
                            <div className="w-1/3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE</div>
                            <div className="w-1/3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</div>
                        </li>
                        <div className=' py-5'>
                        {isLoading ? (
                            <Stack>
                                <Skeleton height='40px' borderRadius='md' />
                                <Skeleton height='40px' borderRadius='md' />
                                <Skeleton height='40px' borderRadius='md' />
                            </Stack>
                                ) : (
                            <>
                                {!hasFetched && <Text>No active members</Text>}
                                {filteredMembers.length === 0 ? (
                                    <div className="text-center">
                                    <h1 className=" text-xl leading-tight font-bold text-gray-300">
                                    No Active Members
                                    </h1>
                                    </div>
                                ) : (
                                    <div >
                                        
                                            
                                                
                                                {filteredMembers.map((member, index) => (
                                                    <li key={index} className="py-2 ">
                                                        <Box bg='gray.200' w='100%' p={2} borderRadius='md'>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center w-1/3">
                                                                <div className="flex-shrink-0">
                                                                    <Avatar size='sm' src={member.profilePicture} name={`${member.username}`} />
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
                                                                <Tooltip hasArrow label='Change the member role' bg='blue.200' placement='bottom'>
                                                                <Button onClick={() => onOpenRoleModal(index)} colorScheme="blue" size="sm"
                                                                    isDisabled={member.profileStatus === 'Suspend'}>
                                                                    Change Role
                                                                </Button>
                                                                </Tooltip>
                                                                {member.profileStatus === 'Active' && (
                                                                    <Tooltip hasArrow label='Block the member' bg='blue.200' placement='bottom'>
                                                                    <Button onClick={() => handleBlockOrUnblock(member, 'block')} colorScheme="red" size="sm" ml={2}>
                                                                        Block
                                                                    </Button>
                                                                    </Tooltip>
                                                                )}
                                                                {member.profileStatus === 'Suspend' && (
                                                                    <Tooltip hasArrow label='Unblock the member' bg='blue.200' placement='bottom'>
                                                                    <Button onClick={() => handleBlockOrUnblock(member, 'unblock')} colorScheme="green" size="sm" ml={2}>
                                                                        Unblock
                                                                    </Button>
                                                                    </Tooltip>
                                                                )}
                                                            </div>
                                                        </div>
                                                        </Box>
                                                    </li>
                                                ))}
                                            
                                        
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;