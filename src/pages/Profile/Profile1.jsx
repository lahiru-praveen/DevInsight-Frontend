import React from 'react';
import { Box, Heading, Flex, Avatar, Text, Badge, Image, Stack } from '@chakra-ui/react';

const sharedClasses = {
  rounded: 'rounded-lg',
  p4: 'p-4',
  flex: 'flex',
  itemsCenter: 'items-center',
  textZinc: 'text-zinc-600',
  bgGreen: 'bg-green-500',
  textWhite: 'text-white',
  justifyCenter: 'justify-center',
  roundedFull: 'rounded-full',
  text2xl: 'text-2xl',
  fontBold: 'font-bold',
  ml4: 'ml-4',
  textLg: 'text-lg',
  fontSemibold: 'font-semibold',
  bgBlue: 'bg-blue-500',
  textXs: 'text-xs',
  px2: 'px-2',
  py1: 'py-1',
  bgTeal100: 'bg-teal-100',
  textTeal800: 'text-teal-800',
  textSm: 'text-sm',
  gap2: 'gap-2',
  w16: 'w-16',
  h16: 'h-16',
  w24: 'w-24',
  h24: 'h-24',
  mr4: 'mr-4',
};

const Profile = () => {
  return (
    <Box p={4}>
      <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
        <Heading as="h2" size="lg" mb={4} className="font-bold">Profile</Heading>
        <Flex alignItems="center">
          <Flex
            alignItems="center"
            justifyContent="center"
            bg="green.500"
            color="white"
            borderRadius="full"
            w={16}
            h={16}
            fontSize="2xl"
            fontWeight="bold"
          >
            BM
          </Flex>
          <Box ml={4}>
            <Text fontSize="lg" fontWeight="semibold">Buwaneka Marasinghe</Text>
            <Text color="gray.600">buwaneka@gmail.com</Text>
            <Badge colorScheme="blue" className="text-xs font-semibold px-2 py-1 rounded">ADMIN</Badge>
          </Box>
        </Flex>
      </Box>

      <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
        <Heading as="h2" size="lg" mb={4} className="font-bold">Skills</Heading>
        <Flex wrap="wrap" gap={2}>
          {['JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'HTML', 'Git', 'SQL'].map(skill => (
            <Badge key={skill} bg="teal.100" color="teal.800" fontSize="sm" className="font-semibold px-2 py-1 rounded">{skill}</Badge>
          ))}
        </Flex>
      </Box>

      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <Heading as="h2" size="lg" mb={4} className="font-bold">Company</Heading>
        <Flex>
          <Image src="https://placehold.co/100x100" alt="Company Inc." className="w-24 h-24 rounded mr-4" />
          <Stack>
            <Text fontSize="sm" color="gray.600">Company Name</Text>
            <Text fontSize="lg" fontWeight="semibold">Company Inc.</Text>
            <Text fontSize="sm" color="gray.600">Username</Text>
            <Text fontSize="lg" fontWeight="semibold">companyuser</Text>
            <Text fontSize="sm" color="gray.600">Email</Text>
            <Text fontSize="lg" fontWeight="semibold">company@example.com</Text>
            <Text fontSize="sm" color="gray.600">Phone</Text>
            <Text fontSize="lg" fontWeight="semibold">123-456-7890</Text>
            <Text fontSize="sm" color="gray.600">Address</Text>
            <Text fontSize="lg" fontWeight="semibold">123 Main Street, City, Country</Text>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Profile;
