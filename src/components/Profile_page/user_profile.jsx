import React from 'react';
import { Box, Button, Avatar, Text, Heading, Divider } from '@chakra-ui/react';

const ProfileCard = () => {
  return (
    <Box border="1px" borderColor="gray.200" rounded="lg" p="6">
      <Box mb={4}>
        <Heading as="h2" size="lg" mb={2} textAlign="left">
          Profile
        </Heading>
        <Divider borderColor="gray.300" />
      </Box>
      <Box display="flex" alignItems="center" p="4">
        <Avatar flexShrink={0} size="2xl" name="Buwaneka Marasinghe" src="path/to/your/image.png" />
        <Box ml="auto" textAlign="right" pl="8" spacing={4}>
          <Text fontSize="lg" fontWeight="medium" color="black" mb={1}>Buwaneka Marasinghe</Text>
          <Text fontSize="sm" color="gray.500" mb={2}>buwaneka@gmail.com</Text>
          <Button colorScheme="blue" size="sm">
            ADMIN
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileCard;
