import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Box,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaUserTie } from 'react-icons/fa';
import { TbFaceId } from "react-icons/tb";
import { IoPersonRemove, IoPersonAddSharp } from "react-icons/io5";
import axios from 'axios';
import Webcam from "react-webcam";

const Settings = () => {
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPasswordModalOpen, onOpen: onPasswordModalOpen, onClose: onPasswordModalClose } = useDisclosure();
  const webcamRef = useRef(null);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedemail = sessionStorage.getItem('email');
        const storedpassword = sessionStorage.getItem('password');
        if (!storedemail) {
          console.error('No user email found in session storage');
          return;
        }

        console.log(`Found user email in session storage: ${storedemail}`);
        const response = await axios.get(`http://localhost:8000/api/user/${storedemail}`);
        setUser(response.data);

        if (!storedpassword) {
          console.error('No user password found in session storage');
          return;
        }
        console.log(`Found user password in session storage: ${storedpassword}`);
        
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSave = async () => {
    const storedemail = sessionStorage.getItem('email');
    if (!storedemail) {
      alert('User not logged in');
      return;
    }
    try {
      for (let i = 0; i < capturedImages.length; i++) {
        const response = await axios.post("http://localhost:8000/api/save-face-image", {
          email: storedemail,
          image: capturedImages[i],
        });
        console.log(response.data);
      }
      alert("Images saved successfully!");
      setCapturedImages([]);
      onClose();
    } catch (error) {
      console.error("Error saving images", error);
      alert("Failed to save images.");
    }
  };

  const handleRemoveFaceData = async () => {
    const storedemail = sessionStorage.getItem('email');
    if (!storedemail) {
      alert('User not logged in');
      return;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/remove-face-data", {
        email: storedemail,
      });
      console.log(response.data);
      alert("Face data removed successfully!");
    } catch (error) {
      console.error("Error removing face data", error);
      alert("Failed to remove face data.");
    }
  };

  const handlePasswordConfirmation = () => {
    const storedpassword = sessionStorage.getItem('password');
    if (password === storedpassword) {
      setIsPasswordConfirmed(true);
      onPasswordModalClose();
    } else {
      alert('Password is incorrect');
    }
  };

  const handleDeactivateAccount = async () => {
    // Your code for deactivating account
  };

  const handleDeleteAccount = async () => {
    // Your code for deleting account
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImages((prevImages) => [...prevImages, imageSrc]);
    }
  }, [webcamRef]);

  return (
    <Box position="relative" className="bg-gray-100 shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
      <Stack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Settings
        </Text>

        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Security & Privacy
          </Text>
          
          <Text fontSize="md" fontWeight="bold" mb={4}>
            Biometrics
          </Text>
          {!isPasswordConfirmed ? (
            <Button leftIcon={<TbFaceId />} onClick={onPasswordModalOpen}>Face Recognition</Button>
          ) : (
            
            <>
              <Button leftIcon={<IoPersonAddSharp />} colorScheme="green" onClick={onOpen}>Register Your Face</Button><br/>
              <Button leftIcon={<IoPersonRemove />}  mt={5} colorScheme="red" onClick={handleRemoveFaceData}>Remove Face Data</Button>
            </>
            
          )}

          <Modal isOpen={isPasswordModalOpen} onClose={onPasswordModalClose} size="md">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Password</ModalHeader>
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
                <Button variant="ghost" onClick={onPasswordModalClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Capture Your Face</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width="100%"
                  height="100%"
                />
                <Button mt={4} onClick={capture}>Capture</Button>
                <div>
                  {capturedImages.map((imgSrc, index) => (
                    <img key={index} src={imgSrc} alt={`captured-${index}`} width={100} />
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSave}>
                  Save
                </Button>
                <Button variant="ghost" onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Connected Accounts
          </Text>
          <Stack spacing={4}>
            <Button leftIcon={<FaGithub />} size="sm" colorScheme="gray">
              Connect GitHub
            </Button>
            <Button leftIcon={<FaLinkedin />} size="sm" colorScheme="gray">
              Connect LinkedIn
            </Button>
          </Stack>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Account Settings
          </Text>
          <Stack direction="row" justifyContent="space-around">
            <Button
              size="md"
              colorScheme="teal"
              onClick={handleDeactivateAccount}
              isLoading={isDeactivating}
            >
              Deactivate Account
            </Button>
            <Button
              size="md"
              colorScheme="red"
              onClick={handleDeleteAccount}
              isLoading={isDeleting}
            >
              Delete Account
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Settings;
