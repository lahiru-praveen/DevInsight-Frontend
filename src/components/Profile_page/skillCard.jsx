
import React from 'react';
import { Box, Text, Heading, Divider, Tag, SimpleGrid } from '@chakra-ui/react';

const SkillCard = ({ skills }) => {
  return (
    <Box border="1px" borderColor="gray.200" rounded="lg" p="6">
      <Box mb={4}>
        <Heading as="h2" size="lg" mb={2} textAlign="left">
          Skills
        </Heading>
        <Divider borderColor="gray.300" />
      </Box>
      <Box p="4">
        <SimpleGrid columns={{ base: 3, sm: 5, md: 8 }} spacing={4}>
          {skills.map((skill, index) => (
            <Tag key={index} size="lg" colorScheme="teal">
              {skill}
            </Tag>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default SkillCard;
