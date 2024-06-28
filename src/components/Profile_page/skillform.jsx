import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  VStack,
  useToast,
} from '@chakra-ui/react';

const SkillsForm = ({ initialSkills, onSave }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState('');
  const toast = useToast();

  const handleAddSkill = () => {
    if (newSkill.trim() === '') return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(skills);
    toast({
      title: 'Skills updated.',
      description: 'Your skills have been successfully updated.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box border="1px" borderColor="gray.200" rounded="lg" p="6" mt="6">
      <Heading as="h3" size="md" mb={4} textAlign="left">
        Edit Skills
      </Heading>
      <Divider borderColor="gray.300" mb={4} />

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
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
            <HStack wrap="wrap" spacing={2} mt={2}>
              {skills.map((skill, index) => (
                <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
                  <TagLabel>{skill}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
                </Tag>
              ))}
            </HStack>
          </FormControl>

          <HStack justify="flex-end" spacing={4}>
            <Button type="submit" colorScheme="blue">
              Save Skills
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default SkillsForm;