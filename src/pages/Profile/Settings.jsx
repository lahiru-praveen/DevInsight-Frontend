import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Divider,
  Button,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Switch,
  SimpleGrid,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { TbFaceId } from 'react-icons/tb';
import { IoPersonRemove, IoPersonAddSharp, IoSettingsOutline } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import gemini from '../../assets/Gemini.png';
import gpt from '../../assets/Gpt.png';

const Settings = () => {
  const [profile, setProfile] = useState({
    email: sessionStorage.getItem('email') || '',
  });
  
  const [password, setPassword] = useState('');
  const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onClose: onPasswordModalClose } = useDisclosure();
  const {
    isOpen: isDeactivateAlertOpen,
    onOpen: onDeactivateAlertOpen,
    onClose: onDeactivateAlertClose
  } = useDisclosure();
  const {
    isOpen: isDeleteAlertOpen,
    onOpen: onDeleteAlertOpen,
    onClose: onDeleteAlertClose
  } = useDisclosure();

  const cancelRef = useRef();
  const navigate = useNavigate();

  const [llm, setLlm] = useState(sessionStorage.getItem('llm') || 'gemini');

  useEffect(() => {
    sessionStorage.setItem('llm', llm);
  }, [llm]);

  const handleRemoveFaceData = async (email) => {
    try {
      const response = await axios.post('http://localhost:8000/api/remove_face_data', { email });
      console.log(response.data);
      alert('Face data removed successfully!');
    } catch (error) {
      console.error('Error removing face data', error);
      alert('Failed to remove face data.');
    }
  };

  const handlePasswordConfirmation = () => {
    const storedPassword = sessionStorage.getItem('password');
    if (password === storedPassword) {
      onPasswordModalClose();
      navigate(`/change-password`);
    } else {
      alert('Password is incorrect');
    }
  };

  const handleConnectLinkedIn = async () => {
    try {
      const linkedinUrl = 'https://www.linkedin.com/feed/';
      window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error connecting LinkedIn:', error);
      alert('Failed to connect LinkedIn.');
    }
  };

  const handleConnectGitHub = async () => {
    try {
      const githubUrl = 'https://github.com/';
      window.open(githubUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error connecting GitHub:', error);
      alert('Failed to connect GitHub.');
    }
  };

  const handleDeactivate = async (email, token) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user_deactivate/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail);
      }
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      navigate('/login-developer');
    } catch (error) {
      console.error('Error deactivating account:', error);
    }
  };

  const handleDelete = async (email) => {
    try {
      const token = sessionStorage.getItem('access_token');
      if (!token) {
        throw new Error('User is not authenticated');
      }
      const response = await fetch(`http://127.0.0.1:8000/api/profile_delete/${email}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        navigate('/');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }
    } catch (error) {
      console.error('An error occurred while deleting the user:', error);
    }
  };

  const handleSwitchChange = (value) => {
    setLlm(value);
  };

  return (
    <Box position="relative" className="bg-gray-100 shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
      <Stack spacing={6}>
        <Flex alignItems="center">
          <IoSettingsOutline size="32" style={{ marginRight: '8px' }} />
          <Text fontSize="3xl" fontWeight="bold">Settings</Text>
        </Flex>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Security & Privacy</Text>
          <Text fontSize="md" fontWeight="bold" mb={4}>Biometrics Login</Text>
          <Flex justifyContent="space-between">
            <Popover>
              <PopoverTrigger>
                <Button leftIcon={<TbFaceId />} size="md" width="45%" colorScheme="red" variant="outline">
                  Face Recognition
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Link to="/face-register">
                      <Button leftIcon={<IoPersonAddSharp />} colorScheme="green" variant="outline">
                        Register Your Face
                      </Button>
                    </Link>
                    <br />
                    <Button leftIcon={<IoPersonRemove />} mt={5} onClick={() => handleRemoveFaceData(profile.email)} colorScheme="green" variant="outline">
                      Remove Face Data
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </Flex>
        </Box>
        <Box>
          <Text fontSize="md" fontWeight="bold" mb={4}>Password settings</Text>
          <Button size="md" width="45%" colorScheme="teal" variant="outline" onClick={onPasswordModalOpen}>
            Change Password
          </Button>
        </Box>
        <Divider borderColor="gray" borderWidth="1px" />
        <Box>
          <Text fontSize="md" fontWeight="bold" mb={4}>LLM Settings</Text>
          <FormControl as={SimpleGrid} columns={{ base: 1, md: 2 }} spacing={4}>
            <Box textAlign="center">
              <Image src={gemini} alt="Gemini Logo" height="40px" width="100px" objectFit="contain" mb={8} />
              <FormLabel htmlFor="Gemini">Gemini:</FormLabel>
              <Switch
                id="Gemini"
                size="lg"
                isChecked={llm === 'gemini'}
                onChange={() => handleSwitchChange('gemini')}
              />
            </Box>
            <Box textAlign="center">
              <Image src={gpt} alt="Gpt-3.5-Turbo Logo" height="60px" width="60px" objectFit="contain" mb={2} />
              <FormLabel htmlFor="Gpt-3.5">Gpt-3.5-Turbo:</FormLabel>
              <Switch
                id="Gpt-3.5"
                size="lg"
                isChecked={llm === 'openai'}
                onChange={() => handleSwitchChange('openai')}
              />
            </Box>
          </FormControl>
        </Box>
        <Divider borderColor="gray" borderWidth="1px" />
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Links</Text>
          <Stack spacing={4}>
            <Button leftIcon={<FaGithub />} size="sm" colorScheme="teal" onClick={handleConnectGitHub} variant="outline">
              Connect GitHub
            </Button>
            <Button leftIcon={<FaLinkedin />} size="sm" colorScheme="teal" onClick={handleConnectLinkedIn} variant="outline">
              Connect LinkedIn
            </Button>
          </Stack>
        </Box>
        <Divider borderColor="gray" borderWidth="1px" />
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Account Settings</Text>
          <Stack spacing={4}>
            <Button colorScheme="teal" size="sm" variant="outline" onClick={onDeactivateAlertOpen}>
              Deactivate Account
            </Button>
            <Button colorScheme="red" size="sm" variant="outline" onClick={onDeleteAlertOpen}>
              Delete Account
            </Button>
          </Stack>
        </Box>
      </Stack>
      {/* Change Password Modal */}
      <Modal isOpen={isPasswordModalOpen} onClose={onPasswordModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter your password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlePasswordConfirmation}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={onPasswordModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Deactivate Account Alert */}
      <AlertDialog
        isOpen={isDeactivateAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeactivateAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deactivate Account
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeactivateAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleDeactivate(profile.email, sessionStorage.getItem('access_token'))} ml={3}>
                Deactivate
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {/* Delete Account Alert */}
      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Account
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(profile.email)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Settings;
