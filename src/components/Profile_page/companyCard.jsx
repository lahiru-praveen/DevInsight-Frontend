import React from 'react';
import { Box, Text, Heading, Divider, Image } from '@chakra-ui/react';

const CompanyCard = ({ company }) => {
  const { companyName, companyUserName, companyEmail, companyPhoneNumber, companyAddress, companyPhoto } = company;

  return (
    <Box border="1px" borderColor="gray.200" rounded="lg" p="6">
      <Box mb={4}>
        <Heading as="h2" size="lg" mb={2} textAlign="left">
          Company 
        </Heading>
        <Divider borderColor="gray.300" />
      </Box>
      <Box display="flex" alignItems="center" p="4">
        <Box boxSize="100px" bg="gray.100" borderRadius="md" mr={4}>
          <Image src={companyPhoto} alt={companyName} objectFit="cover" borderRadius="md" />
        </Box>
        <Box flex="1" textAlign="right">
          <Box mb={2}>
            <Text fontSize="sm" color="gray.500" mb={1}>
              Company Name
            </Text>
            <Text fontSize="lg" color="black" mb={1}>
              {companyName}
            </Text>
          </Box>
          <Box mb={2}>
            <Text fontSize="sm" color="gray.500" mb={1}>
              Username
            </Text>
            <Text fontSize="lg" color="black" mb={1}>
              {companyUserName}
            </Text>
          </Box>
          <Box mb={2}>
            <Text fontSize="sm" color="gray.500" mb={1}>
              Email
            </Text>
            <Text fontSize="lg" color="black" mb={1}>
              {companyEmail}
            </Text>
          </Box>
          <Box mb={2}>
            <Text fontSize="sm" color="gray.500" mb={1}>
              Phone
            </Text>
            <Text fontSize="lg" color="black" mb={1}>
              {companyPhoneNumber}
            </Text>
          </Box>
          <Box mb={2}>
            <Text fontSize="sm" color="gray.500" mb={1}>
              Address
            </Text>
            <Text fontSize="lg" color="black" mb={1}>
              {companyAddress}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyCard;
