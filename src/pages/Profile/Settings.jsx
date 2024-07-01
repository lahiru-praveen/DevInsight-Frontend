import React, { useState, useEffect } from 'react';
import {
  Box,
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
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaFingerprint } from 'react-icons/fa';
import { TbFaceId, TbFingerprintScan } from 'react-icons/tb';
import { IoPersonRemove, IoPersonAddSharp, IoSettingsOutline } from 'react-icons/io5';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Settings = () => {
  const [profile, setProfile] = useState({
    email: sessionStorage.getItem('email') || '',
  });
  const [password, setPassword] = useState('');
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onClose: onPasswordModalClose } = useDisclosure();
  const { isOpen: isChangePasswordModalOpen, onOpen: onChangePasswordModalOpen, onClose: onChangePasswordModalClose } = useDisclosure();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // useEffect(() => {
  //   const storedEmail = sessionStorage.getItem('email');
  //   if (storedEmail) {
  //     setEmail(storedEmail);
  //   }
  // }, []);


  const handleRemoveFaceData = async () => {
    const storedEmail = sessionStorage.getItem('email');
    if (!storedEmail) {
      alert('User not logged in');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/remove-face-data', {
        email: storedEmail,
      });
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
      setIsPasswordConfirmed(true);
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
      const token = sessionStorage.getItem('token');
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
                    <Button leftIcon={<IoPersonRemove />} mt={5} onClick={handleRemoveFaceData} colorScheme="green" variant="outline">
                      Remove Face Data
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Button leftIcon={<TbFingerprintScan />} size="md" width="45%" colorScheme="yellow" variant="outline">
                  Fingerprint
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Link to="/face-register">
                      <Button leftIcon={<FaFingerprint />} colorScheme="green" variant="outline">
                        Register Your Fingerprint
                      </Button>
                    </Link>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </Flex>
        </Box>
        <Box>
       
        <Text fontSize="md" fontWeight="bold" mb={4}>Password settings</Text>
        <Button size="sm" colorScheme="teal" variant="outline" onClick={onPasswordModalOpen} >
              Change Password
          </Button>
        </Box>
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
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Account Settings</Text>
          <Stack spacing={4}>
            <Button colorScheme="teal" size="sm" variant="outline" onClick={() => {
              if (window.confirm('Are you sure you want to deactivate your profile?')) {
                handleDeactivate(profile.email, sessionStorage.getItem('token'));
              }
            }}>
              Deactivate
            </Button>
            <Button size="sm" colorScheme="teal" variant="outline" onClick={() => {
              if (window.confirm('Are you sure you want to delete your profile? Your account will be erased from our system.')) {
                handleDelete(profile.email);
              }
            }}>
              Delete Account
            </Button>
            
          </Stack>
        </Box>
      </Stack>
      <Modal isCentered isOpen={isPasswordModalOpen} onClose={onPasswordModalClose} size="md">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
        <ModalContent>
          <ModalHeader>Confirm Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handlePasswordConfirmation}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={onPasswordModalClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Settings;
