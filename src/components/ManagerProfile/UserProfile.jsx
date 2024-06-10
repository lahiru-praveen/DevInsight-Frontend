import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Avatar, VStack, IconButton, ButtonGroup, Flex, Input, Button, Divider, Stack } from '@chakra-ui/react';
import { CheckIcon, EditIcon, CloseIcon } from '@chakra-ui/icons';
import { Editable, EditableInput, EditablePreview, useEditableControls } from "@chakra-ui/react"; // Import useEditableControls from Chakra UI

function Profile() {
    // Use EditableControls from Chakra UI
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
        name: 'Lahiru Praveen',
        email: 'lahirup@gmail.com',
        title: 'Manager',
        profilePic: 'path_to_image',
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
        // Call your backend API to save the profile changes
        // Here you would typically use fetch or axios to send the updated profile data to your backend
        console.log("Profile saved", { profilePic, profileName });
        setIsChanged(false);
    };

    const cancelChanges = () => {
        // Reset changes to initial values or last saved state
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
            <Box className="flex items-center justify-center min-h-screen">
                <Box className="p-8 bg-gray-100 rounded-lg shadow-lg w-96">
                    <div className="h-[40rem]">

                    <VStack spacing={6}>
                        <Box position="relative">
                            <Avatar size="2xl" name={originalProfile.name} src={profilePic} />
                            {isEditingPic && (
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePicChange}
                                    style={{ position: 'absolute', bottom: '8px', right: '8px', opacity: 0 }}
                                />
                            )}
                            <IconButton
                                icon={<EditIcon />}
                                onClick={handleEditPic}
                                style={{ position: 'absolute', bottom: '8px', right: '8px', zIndex: 1 }}
                            />
                        </Box>
                        <Divider />
                        <Editable
                            textAlign='center'
                            defaultValue={profileName}
                            fontSize='2xl'
                            isPreviewFocusable={false}
                            submitOnBlur={false} // Add this to prevent submitting on blur
                            onSubmit={handleNameChange}
                        >
                            <EditablePreview />
                            <Input as={EditableInput} />
                            <EditableControls />
                        </Editable>
                        <Divider />
                        <Box height="50px" className="text-gray-500 text-lg">{originalProfile.email}</Box>
                        <Divider />
                        <Box height="50px" className="text-xl">{originalProfile.title}</Box>
                        <Divider />
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
