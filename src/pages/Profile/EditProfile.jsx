import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ChakraProvider,
  Button,
  Avatar,
  Text,Heading,
  Divider,
  FormControl,FormLabel,
  Input,
  Tag,
  Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,
  Box,
  VStack,
  Icon,
  Alert,AlertIcon,AlertTitle,AlertDescription,
  Switch,
  Flex,
  useColorModeValue,
  Checkbox,
  Stack,
  Badge,
  Select,
  NumberInput,NumberInputStepper, NumberInputField, NumberIncrementStepper, NumberDecrementStepper,
  
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';
import { getUserProfile, createUserProfile } from './api';
import 'cropperjs/dist/cropper.css';
import BackButton from '../../components/Profile_page/BackButton';

const predefinedSkills = ['python', 'javascript', 'java', 'html', 'c','cs', 'cpp', 'php', 'ruby', 'swift', 'go', 'typescript','css'];

const EditProfile = ({ token, isOpen, onClose, onSave }) => {
  const [profile, setProfile] = useState({
    lastName: '',
    firstName: '',
    username: '',
    email: '',
    company: '',
    companyEmail: '',
    experience: 0,
    level: '',
    role: '',
    skills: [],
    profilePicture: '',
    user_Id: '',
    profileStatus: 'Active',
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const token = sessionStorage.getItem('access_token');
        const data = await getUserProfile(email, token);
        setProfile(data);
      } catch (error) {
        setError(error.detail);
      }
    };

    fetchProfile();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };


  const handleExperienceChange = (value) => {
    setProfile((prevProfile) => ({ ...prevProfile, experience: parseInt(value) || 0 }));
  };

  const handleSave = async () => {
    try {
      if (!profile.email) {
        throw new Error('User email is missing');
      }
      await createUserProfile(profile.email, profile, token);
      onSave(profile);
      console.log(profile)
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
      setError(null);
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
            <FormControl>
              <FormLabel>Profile Picture</FormLabel>
              {profile.profilePicture && (
                <Box mt={4} mb={4} width="150px" height="150px" mx="auto">
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
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={profile.username}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                isReadOnly
              />
            </FormControl>
            <Box align="left" size="md" width="100%">
            <Text size="md" as='b'>Experience level</Text>
            <Select name="level" value={profile.level || "Beginner"} onChange={handleInputChange}>
              <option name="level" value="Beginner" className="text-gray-900">Beginner</option>
              <option name="level" value="Intermediate" className="text-gray-900">Intermediate</option>
              <option name="level" value="Expert" className="text-gray-900">Expert</option>
            </Select>
          </Box>

          <Box width="100%">
            <Text size="md" as='b'>Experiance in years</Text>
            <NumberInput  step={1} maxW='100px' name="experience" mr='2rem'  max={40} min={0} value={profile.experience} onChange={handleExperienceChange}>
             <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
           </NumberInputStepper>
             </NumberInput>
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
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [skills, setSkills] = useState(predefinedSkills.reduce((acc, skill) => {
    acc[skill] = profile.skills.includes(skill);
    return acc;
  }, {}));

  const [selectedSkills, setSelectedSkills] = useState({});
  

  useEffect(() => {
    // Initialize selectedSkills state based on profile skills
    const initialSelectedSkills = predefinedSkills.reduce((acc, skill) => {
      acc[skill] = profile.skills.includes(skill);
      return acc;
    }, {});
    setSelectedSkills(initialSelectedSkills);
  }, [profile.skills]);

  const handleSkillChange = (skill) => {
    setSelectedSkills(prevSkills => ({
      ...prevSkills,
      [skill]: !prevSkills[skill] // Toggle the skill state
    }));
  };

  const handleSaveSkills = async () => {
    const updatedProfile = { ...profile, skills: Object.keys(selectedSkills).filter(skill => selectedSkills[skill]) };
    
    try {
      await createUserProfile(profile.email, updatedProfile, token);
      onUpdateProfile(updatedProfile);
      setIsSkillsModalOpen(false);
    } catch (error) {
      console.error('Error saving skills:', error);
    }
  };

  return (
    <Flex width="100%" height="100vh">
      <Box>
      <BackButton />
    </Box>
    <Box className=" p-6 flex flex-col" width="100%" mt="10"> 
      <Box className="relative shadow-lg rounded-lg w-full max-w-4xl mx-auto flex flex-col md:flex-row bg-white p-4">
        {/* Left Side Box */}
        <Box className="w-full md:w-1/3 h-full p-6 border-r border-gray-200">
          <Box
            className="w-64 h-64 mb-4"
            borderRadius="md"
            overflow="hidden"
            p={4}
          >
            <Avatar size="full" name={profile.username} src={profile.profilePicture} />
          </Box>
          <Divider w="100%" />
          <VStack spacing={2} className="mt-auto">
            <Text fontSize="md" color="gray.600">
              Organization
            </Text>
            <Text fontSize="md" color="gray.600" as="b">
              {profile.company}
            </Text>
            
            <Text fontSize="md" color="gray.600" as="b">
              {profile.companyEmail}
            </Text>
          </VStack>
        </Box>

        {/* Right Side Box */}
        <Box className="w-full md:w-2/3 h-full flex flex-col">
            <Button position="absolute" top={4} right={4} onClick={() => setIsModalOpen(true)} variant="link" colorScheme="teal">
              Edit Profile
            </Button>

          {/* Top Half - User Details */}
              <Box className="h-1/2 p-6 flex flex-col">
                <Button colorScheme="blue" size="md"  variant='ghost' width="20%">
                    {profile.role}
                </Button>

                <Flex>
                  <Heading as="h2" size="lg" ml={3}>
                    {profile.username}
                  </Heading>
                  <Badge ml='1' colorScheme='green' size='sm' height="45%">
                      {profile.level}
                  </Badge>
                </Flex>
                
                
                  <Box align="left" spacing={2} className="mt-4">
                  
                    <Text fontSize="md" color="gray.700" ml={4} as="b">
                      {profile.email}
                    </Text>
                  </Box><br/><br/>
                  <Flex><Text fontSize="md" color="gray.700" ml={4} mr={2}>Years of Experiance</Text>
                  <Text>
                  {profile.experience}
                  </Text> 
                   </Flex>
                  
                </Box>

          {/* Bottom Half - Skills */}
          <Box className="h-1/2 p-6 flex flex-col items-center justify-center border-t border-gray-200">
            <Text fontSize="sm" color="gray.500">
              Skills
            </Text>
            <Flex flexWrap="wrap" justifyContent="center" className="mt-4">
              {profile.skills.map((skill, index) => (
                <Box key={index} className="flex items-center m-2">
                  <Tag size="lg" colorScheme="teal" borderRadius="full" m={1}>
                    {skill}
                  </Tag>
                </Box>
              ))}
            </Flex>
            <Button
              position="absolute"
              top={60}
              right={4}
              variant="link"
              colorScheme="teal"
              onClick={() => setIsSkillsModalOpen(true)}
            >
              Edit Skills
            </Button>
          </Box>
        </Box>

        
         {/* Edit Skills Modal */}
      <Modal isOpen={isSkillsModalOpen} onClose={() => setIsSkillsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Skills</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {predefinedSkills.map((skill, index) => (
              <FormControl key={index} display="flex" alignItems="center" mb={4}>
                <FormLabel htmlFor={`switch-${skill}`} mb="0" width="100px">
                  {skill}
                </FormLabel>
                <Switch
                  id={`switch-${skill}`}
                  colorScheme={selectedSkills[skill] ? "green" : "red"}
                  isChecked={selectedSkills[skill]}
                  onChange={() => handleSkillChange(skill)}
                />
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveSkills}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setIsSkillsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>

      <EditProfile
        token={token}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onUpdateProfile}
      />
    </Box>
    </Flex>
  );
};

const ProfilePage = ({ token }) => {
  const [profile, setProfile] = useState({
    lastName: '',
    firstName: '',
    username: '',
    email: '',
    company: '',
    companyEmail: '',
    experience: 0,
    level: '',
    role: '',
    skills: [],
    profilePicture: '',
    user_Id: '',
    profileStatus: 'Active',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const token = sessionStorage.getItem('access_token');
        const data = await getUserProfile(email, token);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  return (
    <ChakraProvider>
      <Box className="min-h-screen bg-gray-100 p-6">
        <Box className="flex justify-center items-center">
          <ProfileAndSkills profile={profile} onUpdateProfile={handleUpdateProfile} token={token} />
        </Box>
      </Box>
    </ChakraProvider>
  );
};

// ProfilePage.propTypes = {
//   token: PropTypes.string.isRequired,
// };

EditProfile.propTypes = {
  token: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

ProfileAndSkills.propTypes = {
  profile: PropTypes.object.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default ProfilePage;
