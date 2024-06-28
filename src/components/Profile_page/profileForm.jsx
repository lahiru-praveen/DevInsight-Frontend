// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Input,
//   FormControl,
//   FormLabel,
//   Heading,
//   Divider,
//   Avatar,
//   VStack,
//   HStack,
//   Tag,
//   TagLabel,
//   TagCloseButton,
//   useToast
// } from '@chakra-ui/react';

// const ProfileForm = ({ initialProfile }) => {
//   const [name, setName] = useState(initialProfile.name);
//   const [profilePicture, setProfilePicture] = useState(initialProfile.profilePicture);
//   const [skills, setSkills] = useState(initialProfile.skills);
//   const [newSkill, setNewSkill] = useState('');
//   const [isChanged, setIsChanged] = useState(false);
//   const toast = useToast();

//   useEffect(() => {
//     const isNameChanged = name !== initialProfile.name;
//     const isProfilePictureChanged = profilePicture !== initialProfile.profilePicture;
//     const areSkillsChanged = JSON.stringify(skills) !== JSON.stringify(initialProfile.skills);
//     setIsChanged(isNameChanged || isProfilePictureChanged || areSkillsChanged);
//   }, [name, profilePicture, skills, initialProfile]);

//   const handleNameChange = (e) => setName(e.target.value);

//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setProfilePicture(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddSkill = () => {
//     if (newSkill.trim() === '') return;
//     setSkills([...skills, newSkill.trim()]);
//     setNewSkill('');
//   };

//   const handleRemoveSkill = (skillToRemove) => {
//     setSkills(skills.filter((skill) => skill !== skillToRemove));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, e.g., send data to API
//     toast({
//       title: 'Profile updated.',
//       description: 'Your profile has been successfully updated.',
//       status: 'success',
//       duration: 5000,
//       isClosable: true,
//     });
//   };

//   const handleReset = () => {
//     setName(initialProfile.name);
//     setProfilePicture(initialProfile.profilePicture);
//     setSkills(initialProfile.skills);
//     setNewSkill('');
//   };

//   return (
//     <Box border="1px" borderColor="gray.200" rounded="lg" p="6">
//       <Heading as="h2" size="lg" mb={4} textAlign="left">
//         Edit Profile
//       </Heading>
//       <Divider borderColor="gray.300" mb={4} />

//       <form onSubmit={handleSubmit}>
//         <VStack spacing={4} align="stretch">
//           <FormControl>
//             <FormLabel>Profile Picture</FormLabel>
//             <Avatar src={profilePicture} size="xl" mb={2} />
//             <Input type="file" accept="image/*" onChange={handleProfilePictureChange} />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Name</FormLabel>
//             <Input type="text" value={name} onChange={handleNameChange} />
//           </FormControl>

//           <FormControl>
//             <FormLabel>Skills</FormLabel>
//             <HStack>
//               <Input
//                 type="text"
//                 value={newSkill}
//                 onChange={(e) => setNewSkill(e.target.value)}
//                 placeholder="Add a new skill"
//               />
//               <Button onClick={handleAddSkill} colorScheme="blue">
//                 Add
//               </Button>
//             </HStack>
//             <HStack wrap="wrap" spacing={2} mt={2}>
//               {skills.map((skill, index) => (
//                 <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
//                   <TagLabel>{skill}</TagLabel>
//                   <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
//                 </Tag>
//               ))}
//             </HStack>
//           </FormControl>

//           <HStack justify="flex-end" spacing={4}>
//             <Button onClick={handleReset} colorScheme="gray" isDisabled={!isChanged}>
//               Reset
//             </Button>
//             <Button type="submit" colorScheme="blue" isDisabled={!isChanged}>
//               Save Changes
//             </Button>
//           </HStack>
//         </VStack>
//       </form>
//     </Box>
//   );
// };

// export default ProfileForm;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Divider,
  Avatar,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';

const ProfileForm = ({ initialProfile }) => {
  const [name, setName] = useState(initialProfile.name);
  const [profilePicture, setProfilePicture] = useState(initialProfile.profilePicture);
  const [isChanged, setIsChanged] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const isNameChanged = name !== initialProfile.name;
    const isProfilePictureChanged = profilePicture !== initialProfile.profilePicture;
    setIsChanged(isNameChanged || isProfilePictureChanged);
  }, [name, profilePicture, initialProfile]);

  const handleNameChange = (e) => setName(e.target.value);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicture(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to API
    toast({
      title: 'Profile updated.',
      description: 'Your profile has been successfully updated.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleReset = () => {
    setName(initialProfile.name);
    setProfilePicture(initialProfile.profilePicture);
  };

  return (
    <Box border="1px" borderColor="gray.200" rounded="lg" p="6">
      <Heading as="h2" size="lg" mb={4} textAlign="left">
        Edit Profile
      </Heading>
      <Divider borderColor="gray.300" mb={4} />

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Profile Picture</FormLabel>
            <Avatar src={profilePicture} size="xl" mb={2} />
            <Input type="file" accept="image/*" onChange={handleProfilePictureChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={handleNameChange} />
          </FormControl>

          <HStack justify="flex-end" spacing={4}>
            <Button onClick={handleReset} colorScheme="gray" isDisabled={!isChanged}>
              Reset
            </Button>
            <Button type="submit" colorScheme="blue" isDisabled={!isChanged}>
              Save Changes
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default ProfileForm;
