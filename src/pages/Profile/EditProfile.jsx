import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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
  Box,
  VStack,
  Icon,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';
import { getUserProfile, createUserProfile, uploadProfilePicture } from './api';
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
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const token = sessionStorage.getItem('access_token');
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
      setSuccessMessage('Profile updated successfully');
      onSave(updatedProfile);
      onClose();
    } catch (error) {
      setError(error.detail || error.message);
    }
  };


    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 1048576) { // Check if file size exceeds 1MB
          setError('Image size should be less than 1MB');
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfile((prevProfile) => ({ ...prevProfile, profilePicture: reader.result }));
        };
        reader.readAsDataURL(file);
        setFile(file);
        setError(null); // Clear any previous error
      }
    };

    

    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(profile.profilePicture || null);
    const cropperRef = useRef(null);

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
          <VStack spacing={4}>
          {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{typeof error === 'string' ? error : JSON.stringify(error)}</AlertDescription>
              </Alert>
            )}
            {successMessage && (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
          <FormControl >
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              name="username"
              value={profile.username}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl >
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              isReadOnly
            />
          </FormControl>
          <FormControl>
              <FormLabel>Profile Picture</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
                id="profile-picture-upload"
              />
              <Button
                as="label"
                htmlFor="profile-picture-upload"
                leftIcon={<Icon as={FiUpload} />}
                colorScheme="teal"
                variant="outline"
                width="100%"
                cursor="pointer"
              >
                {file ? file.name : "Choose Image"}
              </Button>
              {profile.profilePicture && (
                <Box mt={4} width="150px" height="150px" mx="auto">
                <Avatar
                  src={profile.profilePicture} 
                  alt="Profile Picture Preview"
                  size="xl" 
                  borderRadius="full"
                  width="100%"
                  height="100%"
                />
                </Box>
              )}
            </FormControl>

            <FormControl>
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

            <Box>
              <FormLabel>Selected Skills</FormLabel>
              <Box mb={2}>
                {profile.skills.map((skill, index) => (
                  <Tag key={index} size="md" colorScheme="teal" borderRadius="full" m={1}>
                    <TagLabel>{skill}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
                  </Tag>
                ))}
                {skillsToAdd.map((skill, index) => (
                  <Tag key={index} size="md" colorScheme="blue" borderRadius="full" m={2}>
                    <TagLabel>{skill}</TagLabel>
                    <TagCloseButton onClick={() => setSkillsToAdd(skillsToAdd.filter(s => s !== skill))} />
                  </Tag>
                ))}
              </Box>
            </Box>

            <Box>
              <FormLabel>Suggested Skills</FormLabel>
              <Box>
                {predefinedSkills.map((skill, index) => (
                  <Tag
                    key={index}
                    size="md"
                    colorScheme="gray"
                    borderRadius="full"
                    m={1}
                    cursor="pointer"
                    onClick={() => handleAddPredefinedSkill(skill)}
                  >
                    <TagLabel>{skill}</TagLabel>
                  </Tag>
                ))}
              </Box>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ProfileAndSkills = ({ profile, onUpdateProfile, token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box
      position="relative"
      bg="gray.100"
      shadow="lg"
      borderRadius="lg"
      p={6}
      maxW="xl"
      mx="auto"
      minH="calc(100vh - 2rem)"
      display="flex"
      flexDirection="column"
    >
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

      <VStack spacing={6} align="center" flex={1} justifyContent="center">
        <Avatar size="2xl" name={profile.username} src={profile.profilePicture} />
        <Heading as="h2" size="lg" textAlign="center">
          {profile.username}
        </Heading>
        <Divider w="100%" />
        <VStack align="center" spacing={2}>
          <Text fontSize="sm" color="gray.500">
            Email
          </Text>
          <Text fontSize="md" color="gray.700">
            {profile.email}
          </Text>
        </VStack>
        <Divider w="100%" />
        <VStack align="center" spacing={2}>
          <Text fontSize="sm" color="gray.500">
            Role
          </Text>
          <Button colorScheme="blue" size="xs" variant="solid">
            {profile.role}
          </Button>
        </VStack>
        <VStack align="center" spacing={2}>
          <Text fontSize="sm" color="gray.500">
            Organization
          </Text>
          <Text fontSize="md" color="gray.700">
            {profile.company}
          </Text>
        </VStack>
        <Divider w="100%" />
        <VStack align="center" spacing={2}>
          <Text fontSize="sm" color="gray.500">
            Skills
          </Text>
          <Flex flexWrap="wrap" justifyContent="center">
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill, index) => (
                <Tag key={index} size="lg" colorScheme="teal" borderRadius="full" m={1}>
                  {skill}
                </Tag>
              ))
            ) : (
              <Text>No skills found</Text>
            )}
          </Flex>
        </VStack>
      </VStack>

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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const token = sessionStorage.getItem('access_token');
        const data = await getUserProfile(email, token);
        setProfile(data);
        setLoading(false);
      } catch (error) {
        setError(error.detail);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <ChakraProvider>
      <ProfileAndSkills
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        token={token}
      />
    </ChakraProvider>
  );
};

export default ProfilePage;

// Prop validations for EditProfile component
EditProfile.propTypes = {
  token: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

// Prop validations for ProfileAndSkills component
ProfileAndSkills.propTypes = {
  profile: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    profilePicture: PropTypes.string,
  }).isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
  token: PropTypes.string, // Remove if not used
};


