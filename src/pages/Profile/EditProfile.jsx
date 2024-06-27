


import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Avatar,
  Text,
  Heading,
  Divider,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, createUserProfile, uploadProfilePicture } from './api';

const predefinedSkills = ['C', 'C#', 'C++', 'Python', 'Java', 'React', 'Node.js'];

const EditProfile = ({ userId, token, isOpen, onClose, onSave}) => {
  const [profile, setProfile] = useState({
    lastName: '',
    firstName: '',
    username: '',
    email: '',
    company: '',
    role: '',
    skills: [],
    profilePicture: '',
    profileStatus: 'active',
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const data = await getUserProfile(email, token);
        setProfile(data);
        setSkills(data.skills ? data.skills.split(',') : []);
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
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleAddPredefinedSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSave = async () => {
    try {
      const updatedProfile = { ...profile, skills: skills }; // No need to join with commas
      await createUserProfile(profile.email, updatedProfile, token);
      if (file) {
        await uploadProfilePicture(userId, file, token);
      }
      onSave(updatedProfile);
      onClose();
    } catch (error) {
      setError(error.detail);
    }
  };

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
            <HStack wrap="wrap" spacing={2} mt={2}>
              {skills.map((skill, index) => (
                <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
                  <TagLabel>{skill}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
                </Tag>
              ))}
            </HStack>
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

const ProfileAndSkills = ({ profile, onUpdateProfile, handleLogout, handleDeactivate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box position="relative" className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
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

      <Box mb={8} className="text-center">
        <Avatar size="2xl" name={profile.username} src={profile.profilePicture} className="mx-auto mb-4" />
        <Heading as="h2" size="lg" mb={2}>
          {profile.username}
        </Heading>
        <Box mt={4} mb={4}>
          <Text fontSize="sm" color="gray.600" mb={1}>
            Email
          </Text>
          <Text fontSize="md" color="gray.500">
            {profile.email}
          </Text>
        </Box>
        <Box mt={4} mb={4}>
          <Text fontSize="sm" color="gray.600" mb={1}>
            Role
          </Text>
          <Button colorScheme="blue" size="md">
            {profile.role}
          </Button>
        </Box>
        <Box mt={4} mb={4}>
          <Text fontSize="sm" color="gray.600" mb={1}>
            Organization
          </Text>
          <Text fontSize="md" color="gray.500">
            {profile.company}
          </Text>
        </Box>
        <Divider borderColor="gray.300" mt={4} />
      </Box>

      <Box mb={8} className="text-center">
        <Heading as="h2" size="lg" mb={4}>
          Skills
        </Heading>
        <Box p="4">
          <HStack spacing={4} flexWrap="wrap">
            {profile.skills.map((skill, index) => (
              <Tag key={index} size="lg" colorScheme="teal" borderRadius="full" mb={2}>
                <TagLabel>{skill}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </Box>
        <Divider borderColor="gray.300" mt={4} />

        <Flex justify="space-between" p={4}>
        <Button onClick={handleDeactivate} colorScheme="red" width="48%">
          Deactivate
        </Button>
        <Button w="48%" variant="solid" colorScheme="blue" onClick={handleLogout}>
          Log Out
        </Button>
      </Flex>
      </Box>

      

      <EditProfile
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onUpdateProfile}
        userId={profile.id}
        token={profile.token}
        handleLogout={handleLogout}
        handleDeactivate={handleDeactivate}
      />
    </Box>
  );
};

const ProfilePage = () => {
  const [profile, setProfile, token] = useState({
    lastName: '',
    firstName: '',
    username: '',
    email: '',
    role: '',
    company: '',
    skills: [],
    profilePicture: '',
    profileStatus: 'active',
  });

  // const organization = {
  //   name: 'Tech Company',
  // };

  const navigate = useNavigate();

  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const data = await getUserProfile(email, token);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [token]);

     // Handle Logout
     const handleLogout = () => {
      // Clear session storage
      sessionStorage.clear();
       // Navigate to the signin page
      navigate('/si');
    };
  
    const handleDeactivate = async () => {
      if (profile.profileStatus === 'Active') {
          // Update the profile status to "Suspend"
          const updatedProfile = { ...profile, profileStatus: 'Suspend' };
  
          // Make an API call to update the profile status
          try {
              const response = await fetch('http://localhost:8000/api/update_profile_status', {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(updatedProfile),
              });
  
              if (!response.ok) {
                  throw new Error('Failed to update profile status');
              }
  
              // Show success message
              alert('Your account has been successfully deactivated. To reactivate your account login using your old email and password. You will be able to use the site like you used to. We hope you come back soon. Thank you!');
  
              // Navigate to /si
              navigate('/si');
  
          } catch (error) {
              console.error('Error updating profile status:', error);
              // Handle error, show error message, etc.
          }
      }
  };
  
    

  return (
    <ChakraProvider>
      <Box className="bg-gray-50 min-h-screen p-4">
        <ProfileAndSkills
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          handleLogout={handleLogout} 
          handleDeactivate={handleDeactivate} 
        />
      </Box>
    </ChakraProvider>
  );
};



export default ProfilePage;




