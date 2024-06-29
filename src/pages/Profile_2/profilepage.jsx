// import React from 'react';
// import { ChakraProvider, Box, Button, Avatar, Text, Heading, Divider, Tag, SimpleGrid } from '@chakra-ui/react';
// import OrgLogoHolder from '../../assets/Organization LOGO.png';

// const ProfileAndSkills = ({ name, email, role, avatarSrc, skills, organization }) => {
//   return (
//     <Box className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
//       {/* Profile Section */}
//       <Box mb={8} className="text-center">
//         <Avatar size="2xl" name={name} src={avatarSrc} className="mx-auto mb-4" />
//         <Heading as="h2" size="lg" mb={2}>
//           {name}
//         </Heading>
//         <Box mt={4} mb={4}>
//           <Text fontSize="sm" color="gray.600" mb={1}>
//             Email
//           </Text>
//           <Text fontSize="md" color="gray.500">
//             {email}
//           </Text>
//         </Box>
//         <Box mt={4} mb={4}>
//           <Text fontSize="sm" color="gray.600" mb={1}>
//             Role
//           </Text>
//           <Button colorScheme="blue" size="md">
//             {role}
//           </Button>
//         </Box>
//         <Box mt={4} mb={4}>
//           <Text fontSize="sm" color="gray.600" mb={1}>
//             Organization
//           </Text>
//           <Text fontSize="md" color="gray.500">
//             {organization.name}
//           </Text>
//         </Box>
//         <Divider borderColor="gray.300" mt={4} />
//       </Box>

//       {/* Skills Section */}
//       <Box mb={8} className="text-center">
//         <Heading as="h2" size="lg" mb={4}>
//           Skills
//         </Heading>
//         <Box p="4">
//           <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4}>
//             {skills.map((skill, index) => (
//               <Tag key={index} size="lg" colorScheme="teal" variant="solid">
//                 {skill}
//               </Tag>
//             ))}
//           </SimpleGrid>
//         </Box>
//         <Divider borderColor="gray.300" mt={4} />
//       </Box>
//     </Box>
//   );
// };

// const App = () => {
//   const skills = ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML', 'GraphQL', 'TypeScript', 'Redux'];
//   const organization = {
//     name: 'Tech Company',
//   };

//   // Define variables for profile
//   const name = 'Buwaneka Marasinghe';
//   const email = 'buwaneka@gmail.com';
//   const role = 'ADMIN';
//   const avatarSrc = 'path/to/your/image.png';

//   return (
//     <ChakraProvider>
//       <Box className="bg-gray-50 min-h-screen p-4">
//         <ProfileAndSkills
//           name={name}
//           email={email}
//           role={role}
//           avatarSrc={avatarSrc}
//           skills={skills}
//           organization={organization}
//         />
//       </Box>
//     </ChakraProvider>
//   );
// };

// export default App;

import React, { useState } from 'react';
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
} from '@chakra-ui/react';

const ProfileModal = ({ isOpen, onClose, onSave, profile }) => {
  const [name, setName] = useState(profile.name);
  const [avatarSrc, setAvatarSrc] = useState(profile.avatarSrc);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState(profile.skills);
  const [error, setError] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  const handleSave = () => {
    if (!name.trim()) {
      setError('Name cannot be empty');
      return;
    }

    onSave({
      name: name,
      avatarSrc: avatarSrc,
      skills: skills,
    });
    onClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setName(profile.name);
    setAvatarSrc(profile.avatarSrc);
    setSkills(profile.skills);
    setNewSkill('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Profile Picture</FormLabel>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {avatarSrc && <Avatar src={avatarSrc} size="xl" mt={4} />}
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
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ProfileAndSkills = ({ profile, organization, onUpdateProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box position="relative" className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
      {/* Edit Profile Button */}
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

      {/* Profile Section */}
      <Box mb={8} className="text-center">
        <Avatar size="2xl" name={profile.name} src={profile.avatarSrc} className="mx-auto mb={4}" />
        <Heading as="h2" size="lg" mb={2}>
          {profile.name}
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
            {organization.name}
          </Text>
        </Box>
        <Divider borderColor="gray.300" mt={4} />
      </Box>

      {/* Skills Section */}
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
      </Box>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onUpdateProfile}
        profile={profile}
      />
    </Box>
  );
};

const App = () => {
  const [profile, setProfile] = useState({
    name: 'Buwaneka Marasinghe',
    email: 'buwaneka@gmail.com',
    role: 'ADMIN',
    avatarSrc: 'path/to/your/image.png',
    skills: ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML', 'GraphQL', 'TypeScript', 'Redux'],
  });

  const organization = {
    name: 'Tech Company',
  };

  const handleUpdateProfile = (updatedProfile) => {
    setProfile({ ...profile, ...updatedProfile });
  };

  return (
    <ChakraProvider>
      <Box className="bg-gray-50 min-h-screen p-4">
        <ProfileAndSkills
          profile={profile}
          organization={organization}
          onUpdateProfile={handleUpdateProfile}
        />
      </Box>
    </ChakraProvider>
  );
};

export default App;
