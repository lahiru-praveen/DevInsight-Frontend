import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, VStack, IconButton, ButtonGroup, Flex, Input, Button, Center, Icon, Text } from '@chakra-ui/react';
import { CheckIcon, EditIcon, CloseIcon } from '@chakra-ui/icons';
import { Editable, EditableInput, EditablePreview, useEditableControls } from "@chakra-ui/react";
import { MdPhotoCamera } from "react-icons/md";

function Profile() {
    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls();

        return isEditing ? (
            <ButtonGroup justifyContent='center' size='sm'>
                <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent='center'>
                <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
            </Flex>
        );
    }

    const originalProfile = {
        name: '99x',
        email: '99x@gmail.com',
        title: 'JksA234',
        profilePic: '', // Use an empty string or a default image path if necessary
    };

    const [profilePic, setProfilePic] = useState(originalProfile.profilePic);
    const [profileName, setProfileName] = useState(originalProfile.name);
    const [isEditingPic, setIsEditingPic] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePic(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleEditPic = () => {
        setIsEditingPic(true);
    };

    const handleSubmitPic = () => {
        setIsEditingPic(false);
        checkForChanges();
    };

    const handleCancelPic = () => {
        setIsEditingPic(false);
    };

    const handleNameChange = (value) => {
        setProfileName(value);
        checkForChanges();
    };

    const saveProfile = () => {
        console.log("Profile saved", { profilePic, profileName });
        setIsChanged(false);
    };

    const cancelChanges = () => {
        setProfilePic(originalProfile.profilePic);
        setProfileName(originalProfile.name);
        setIsChanged(false);
        console.log("Changes canceled");
    };

    const checkForChanges = () => {
        const hasChanged = profilePic !== originalProfile.profilePic || profileName !== originalProfile.name;
        setIsChanged(hasChanged);
    };

    useEffect(() => {
        checkForChanges();
    }, [profilePic, profileName]);

    return (
        <ChakraProvider>
            <Box className="flex items-center justify-center min-h-screen bg-white">
                <Box className="p-8 bg-gray-100 rounded-lg shadow-lg w-96">
                    <div className='h-[40rem]'>
                        <Box position="relative" width="full" height="200px" className="bg-gray-200 flex items-center justify-center rounded-md overflow-hidden mb-6">
                            {profilePic ? (
                                <img src={profilePic} alt="Profile" className="object-cover w-full h-full" />
                            ) : (
                                <Center width="full" height="full" color="gray.500">
                                    <Icon as={MdPhotoCamera} w={12} h={12} />
                                </Center>
                            )}
                            {isEditingPic && (
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                    position="absolute"
                                    width="full"
                                    height="full"
                                    opacity="0"
                                    cursor="pointer"
                                />
                            )}
                            {!isEditingPic && (
                                <IconButton
                                    icon={<EditIcon />}
                                    onClick={handleEditPic}
                                    position="absolute"
                                    bottom="8px"
                                    right="8px"
                                />
                            )}
                        </Box>
                        <VStack spacing={6} className="mt-6">
                            <Box width="full" p={4} bg="white" rounded="md" shadow="md">
                                <Text fontWeight="bold" mb={2}>Name</Text>
                                <Editable
                                    textAlign='center'
                                    defaultValue={profileName}
                                    fontSize='lg'
                                    isPreviewFocusable={false}
                                    submitOnBlur={false}
                                    onSubmit={handleNameChange}
                                >
                                    <EditablePreview />
                                    <Input as={EditableInput} />
                                    <EditableControls />
                                </Editable>
                            </Box>
                            <Box width="full" p={4} bg="white" rounded="md" shadow="md">
                                <Text fontWeight="bold" mb={2}>Email</Text>
                                <Text fontSize='lg'>{originalProfile.email}</Text>
                            </Box>
                            <Box width="full" p={4} bg="white" rounded="md" shadow="md">
                                <Text fontWeight="bold" mb={2}>Organization Code</Text>
                                <Text fontSize='lg'>{originalProfile.title}</Text>
                            </Box>
                            <ButtonGroup spacing={4}>
                                <Button colorScheme="teal" onClick={saveProfile} isDisabled={!isChanged}>Save Changes</Button>
                                <Button colorScheme="red" onClick={cancelChanges} isDisabled={!isChanged}>Cancel</Button>
                            </ButtonGroup>
                        </VStack>
                    </div>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default Profile;
