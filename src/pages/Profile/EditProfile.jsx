import React, { useState, useEffect, useRef } from 'react';
import {
  ChakraProvider,
  Button,
  Avatar,
  Text,
  Heading,
  Divider,
  FormControl, FormLabel,
  Input,
  HStack,
  Tag, TagLabel, TagCloseButton,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  Flex,
  Alert, AlertIcon, AlertTitle,
  Spinner,
  Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, createUserProfile, uploadProfilePicture } from './api';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const predefinedSkills = ['C', 'HTML', 'CSS', 'Python', 'Java', 'React', 'Node.js', 'FastAPI', 'Prolog'];

const EditProfile = ({ token, isOpen, onClose, onSave }) => {
  const [profile, setProfile] = useState({
    lastName: '',
    firstName: '',
    username: '',
    email: '',
    company: '',
    role: '',
    skills: [],
    profilePicture: '',
    user_Id: '',
    profileStatus: 'active',
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [skillsToAdd, setSkillsToAdd] = useState([]);
  const [skillsToRemove, setSkillsToRemove] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const data = await getUserProfile(email, token);
        setProfile(data);
        setSkillsToAdd([]);
        setSkillsToRemove([]);
      } catch (error) {
        setError(error.detail);
      }
    };

    fetchProfile();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setSkillsToAdd([...skillsToAdd, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleAddPredefinedSkill = (skill) => {
    if (!profile.skills.includes(skill) && !skillsToAdd.includes(skill)) {
      setSkillsToAdd([...skillsToAdd, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: prevProfile.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSave = async () => {
    try {
      if (!profile.email) {
        throw new Error('User email is missing');
      }
      const updatedSkills = [...profile.skills.filter(skill => !skillsToRemove.includes(skill)), ...skillsToAdd];
      const updatedProfile = { ...profile, skills: updatedSkills };
      await createUserProfile(profile.email, updatedProfile, token);
      if (croppedImage) {
        await uploadProfilePicture(profile.email, croppedImage, token);
      }
      onSave(updatedProfile);
      onClose();
    } catch (error) {
      setError(error.detail || error.message);
    }
  };

  
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(profile.profilePicture || null);
    const cropperRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({ ...prevProfile, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      setCroppedImage(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
      setImage(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && <Text color="red.500" mb={4}>{typeof error === 'string' ? error : JSON.stringify(error)}</Text>}
          <FormControl mb={4}>
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              value={profile.username}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              isReadOnly
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Profile Picture</FormLabel>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {profile.profilePicture && <Avatar src={profile.profilePicture} size="xl" mt={4} />}
                  {image && (
                    <div>
                      <Cropper
                        src={image}
                        style={{ height: 400, width: '100%' }}
                        aspectRatio={1}
                        guides={false}
                        ref={cropperRef}
                        viewMode={1}
                        dragMode="move"
                        zoomable
                        scalable
                        cropBoxResizable
                        cropBoxMovable
                      />
                      <Button mt={2} onClick={handleCrop}>Crop</Button>
                    </div>
                  )}
                  {croppedImage && (
                    <div>
                      <Avatar src={croppedImage} size="xl" mt={4} />
                      <Button mt={2} onClick={handleSave}>Save</Button>
                    </div>
                  )}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Skills</FormLabel>
            <HStack>
              <Input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
              />
              <Button onClick={handleAddSkill} colorScheme="blue">
                Add
              </Button>
            </HStack>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Selected Skills</FormLabel>
            <Box mb={2}>
              {profile.skills.map((skill, index) => (
                <Tag key={index} size="md" colorScheme="teal" borderRadius="full" mr={2}>
                  {skill}
                  <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
                </Tag>
              ))}
              {skillsToAdd.map((skill, index) => (
                <Tag key={index} size="md" colorScheme="blue" borderRadius="full" mr={2}>
                  {skill}
                  <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
                </Tag>
              ))}
            </Box>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Suggested Skills</FormLabel>
            <HStack wrap="wrap" spacing={2} mt={2}>
              {predefinedSkills.map((skill, index) => (
                <Tag
                  key={index}
                  size="lg"
                  colorScheme="blue"
                  borderRadius="full"
                  cursor="pointer"
                  onClick={() => handleAddPredefinedSkill(skill)}
                >
                  <TagLabel>{skill}</TagLabel>
                </Tag>
              ))}
            </HStack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ProfileAndSkills = ({ profile, onUpdateProfile, handleLogout, handleDeactivate, token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleUserLogout = () => {
    setIsLoggingOut(true);
    handleLogout(); // Call the handleLogout function passed from props
  };

  return (
    <Box position="relative" className="bg-gray-100 shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
      <Button
        position="absolute"
        top={4}
        right={4}
        variant="link"
        colorScheme="teal"
        onClick={() => setIsModalOpen(true)}
      >
        Edit Profile
      </Button>

      <Box mt={10} className="text-center">
        <Avatar height="200" width="200" name={profile.username} src={profile.profilePicture} className="mx-auto mb={4}" />
        <Heading as="h2" size="lg" mb={2}>
          {profile.username}
        </Heading>
        <Box mt={4} mb={4}>
          <Text fontSize="sm" color="gray.500" mb={1}>
            Email
          </Text>
          <Text fontSize="md" color="gray.700">
            {profile.email}
          </Text>
        </Box>
        <Box mt={4} mb={4}>
          <Text fontSize="sm" color="gray.500" mb={1}>
            Role
          </Text>
          <Button colorScheme="blue" size="xs" mt={2} mb={2} variant="solid">
            {profile.role}
          </Button>
        </Box>
        <Divider mt={4} mb={4} />
        <Box mt={4} mb={4}>
          <Text fontSize="sm" color="gray.600" mb={2}>
            Skills
          </Text>
          <Box className="flex flex-wrap justify-center">
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill, index) => (
                <Tag key={index} size="lg" colorScheme="teal" borderRadius="full" className="mx-2 my-1">
                  {skill}
                </Tag>
              ))
            ) : (
              <Text>No skills found</Text>
            )}
          </Box>
        </Box>
      </Box>
      <Flex justifyContent="space-between">
        <Button
          colorScheme="red"
          size="md"
          mt={4}
          onClick={() => {
            if (window.confirm('Are you sure you want to deactivate your profile?')) {
              handleDeactivate(profile.email, token);
            }
          }}
        >
          Deactivate
        </Button>

        
        <Button
          colorScheme="teal"
          size="md"
          mt={4}
          onClick={handleUserLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? <Spinner size="sm" /> : 'Log Out'}
        </Button>
      </Flex>
      <EditProfile
        token={token}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onUpdateProfile}
      />
    </Box>
  );
};

const ProfilePage = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const data = await getUserProfile(email, token);
        setProfile(data);
      } catch (error) {
        setError(error.detail);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    navigate('/login-developer');
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
      setError(error.detail || error.message);
    }
  };
  


  return (
    <ChakraProvider>
      <ProfileAndSkills
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        handleLogout={handleLogout}
        handleDeactivate={handleDeactivate}
        token={token}
      />
    </ChakraProvider>
  );
};

export default ProfilePage;
