import { useState, useEffect, useRef } from 'react';
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
  Box,
  VStack,
  Icon,
  Image
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';
import { getUserProfile, createUserProfile, uploadProfilePicture } from './api';


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
  // return (
  //   <Modal isOpen={isOpen} onClose={onClose}>
  //     <ModalOverlay />
  //     <ModalContent>
  //       <ModalHeader>Edit Profile</ModalHeader>
  //       <ModalCloseButton />
  //       <ModalBody>
  //         {error && <Text color="red.500" mb={4}>{typeof error === 'string' ? error : JSON.stringify(error)}</Text>}
  //         <FormControl mb={4}>
  //           <FormLabel>First Name</FormLabel>
  //           <Input
  //             name="firstName"
  //             value={profile.firstName}
  //             onChange={handleInputChange}
  //           />
  //         </FormControl>
  //         <FormControl mb={4}>
  //           <FormLabel>Last Name</FormLabel>
  //           <Input
  //             name="lastName"
  //             value={profile.lastName}
  //             onChange={handleInputChange}
  //           />
  //         </FormControl>
  //         <FormControl mb={4}>
  //           <FormLabel>Username</FormLabel>
  //           <Input
  //             name="username"
  //             value={profile.username}
  //             onChange={handleInputChange}
  //           />
  //         </FormControl>
  //         <FormControl mb={4}>
  //           <FormLabel>Email</FormLabel>
  //           <Input
  //             name="email"
  //             value={profile.email}
  //             onChange={handleInputChange}
  //             isReadOnly
  //           />
  //         </FormControl>
  //         <FormControl mb={4}>
  //           <FormLabel>Profile Picture</FormLabel>
  //           <Input type="file" accept="image/*" onChange={handleFileChange} />
  //           {profile.profilePicture && <Avatar src={profile.profilePicture} size="xl" mt={4} />}
  //                 {image && (
  //                   <div>
  //                     <Cropper
  //                       src={image}
  //                       style={{ height: 400, width: '100%' }}
  //                       aspectRatio={1}
  //                       guides={false}
  //                       ref={cropperRef}
  //                       viewMode={1}
  //                       dragMode="move"
  //                       zoomable
  //                       scalable
  //                       cropBoxResizable
  //                       cropBoxMovable
  //                     />
  //                     <Button mt={2} onClick={handleCrop}>Crop</Button>
  //                   </div>
  //                 )}
  //                 {croppedImage && (
  //                   <div>
  //                     <Avatar src={croppedImage} size="2xl" mt={4} />
  //                     <Button mt={2} onClick={handleSave}>Save</Button>
  //                   </div>
  //                 )}
  //         </FormControl>
  //         <FormControl mb={4}>
  //           <FormLabel>Skills</FormLabel>
  //           <HStack>
  //             <Input
  //               type="text"
  //               value={newSkill}
  //               onChange={(e) => setNewSkill(e.target.value)}
  //               placeholder="Add a new skill"
  //             />
  //             <Button onClick={handleAddSkill} colorScheme="blue">
  //               Add
  //             </Button>
  //           </HStack>
  //         </FormControl>
  //         <FormControl mb={4}>
  //           <FormLabel>Selected Skills</FormLabel>
  //           <Box mb={2}>
  //             {profile.skills.map((skill, index) => (
  //               <Tag key={index} size="md" colorScheme="teal" borderRadius="full" mr={2}>
  //                 {skill}
  //                 <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
  //               </Tag>
  //             ))}
  //             {skillsToAdd.map((skill, index) => (
  //               <Tag key={index} size="md" colorScheme="blue" borderRadius="full" mr={2}>
  //                 {skill}
  //                 <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
  //               </Tag>
  //             ))}
  //           </Box>
  //         </FormControl>

  //         <FormControl mb={4}>
  //           <FormLabel>Suggested Skills</FormLabel>
  //           <HStack wrap="wrap" spacing={2} mt={2}>
  //             {predefinedSkills.map((skill, index) => (
  //               <Tag
  //                 key={index}
  //                 size="lg"
  //                 colorScheme="blue"
  //                 borderRadius="full"
  //                 cursor="pointer"
  //                 onClick={() => handleAddPredefinedSkill(skill)}
  //               >
  //                 <TagLabel>{skill}</TagLabel>
  //               </Tag>
  //             ))}
  //           </HStack>
  //         </FormControl>
  //       </ModalBody>
  //       <ModalFooter>
  //         <Button colorScheme="blue" onClick={handleSave}>
  //           Save
  //         </Button>
  //         <Button onClick={onClose}>Cancel</Button>
  //       </ModalFooter>
  //     </ModalContent>
  //   </Modal>
  // );
//before edit is up there

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
          {error && <Text color="red.500" mb={4}>{typeof error === 'string' ? error : JSON.stringify(error)}</Text>}
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
                  <Image
                    src={profile.profilePicture}
                    alt="Profile Picture Preview"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    borderRadius="full"
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
                  <Tag key={index} size="md" colorScheme="blue" borderRadius="full" m={1}>
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
  

  

  // return (
  //   <Box position="relative" className="bg-gray-100 shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
  //     <Button
  //       position="absolute"
  //       top={4}
  //       right={4}
  //       variant="link"
  //       colorScheme="teal"
  //       onClick={() => setIsModalOpen(true)}
  //     >
  //       Edit Profile
  //     </Button>

  //     <Box mt={10} className="text-center">
  //       <Avatar size="2xl" name={profile.username} src={profile.profilePicture} className="mx-auto mb={4}" />
  //       <Heading as="h2" size="lg" mb={2}>
  //         {profile.username}
  //       </Heading>
  //       <Box mt={4} mb={4}>
  //         <Text fontSize="sm" color="gray.500" mb={1}>
  //           Email
  //         </Text>
  //         <Text fontSize="md" color="gray.700">
  //           {profile.email}
  //         </Text>
  //       </Box>
  //       <Box mt={4} mb={4}>
  //         <Text fontSize="sm" color="gray.500" mb={1}>
  //           Role
  //         </Text>
  //         <Button colorScheme="blue" size="xs" mt={2} mb={2} variant="solid">
  //           {profile.role}
  //         </Button>
  //         <Box mt={4} mb={4}>
  //         <Text fontSize="sm" color="gray.600" mb={1}>
  //           Organization
  //         </Text>
  //         <Text fontSize="md" color="gray.500">
  //           {profile.company}
  //         </Text>
  //       </Box>
  //       </Box>
  //       <Divider mt={4} mb={4} />
  //       <Box mt={4} mb={4}>
  //         <Text fontSize="sm" color="gray.600" mb={2}>
  //           Skills
  //         </Text>
  //         <Box className="flex flex-wrap justify-center">
  //           {profile.skills && profile.skills.length > 0 ? (
  //             profile.skills.map((skill, index) => (
  //               <Tag key={index} size="lg" colorScheme="teal" borderRadius="full" className="mx-2 my-1">
  //                 {skill}
  //               </Tag>
  //             ))
  //           ) : (
  //             <Text>No skills found</Text>
  //           )}
  //         </Box>
  //       </Box>
  //     </Box>
      
  //     <EditProfile
  //       token={token}
  //       isOpen={isModalOpen}
  //       onClose={() => setIsModalOpen(false)}
  //       onSave={onUpdateProfile}
  //     />
  //   </Box>
  // );
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
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token');
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
