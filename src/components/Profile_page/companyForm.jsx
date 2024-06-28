import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Divider,
  Image,
  VStack,
  HStack,
  useToast
} from '@chakra-ui/react';

const CompanyForm = ({ initialCompany }) => {
  const { companyName, companyPhoneNumber, companyAddress, companyPhoto } = initialCompany;

  const [name, setName] = useState(companyName);
  const [phoneNumber, setPhoneNumber] = useState(companyPhoneNumber);
  const [address, setAddress] = useState(companyAddress);
  const [photo, setPhoto] = useState(companyPhoto);
  const [isChanged, setIsChanged] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const isNameChanged = name !== companyName;
    const isPhoneNumberChanged = phoneNumber !== companyPhoneNumber;
    const isAddressChanged = address !== companyAddress;
    const isPhotoChanged = photo !== companyPhoto;
    setIsChanged(isNameChanged || isPhoneNumberChanged || isAddressChanged || isPhotoChanged);
  }, [name, phoneNumber, address, photo, companyName, companyPhoneNumber, companyAddress, companyPhoto]);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to API
    toast({
      title: 'Company profile updated.',
      description: 'The company profile has been successfully updated.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleReset = () => {
    setName(companyName);
    setPhoneNumber(companyPhoneNumber);
    setAddress(companyAddress);
    setPhoto(companyPhoto);
  };

  return (
    <Box border="1px" borderColor="gray.200" rounded="lg" p="6">
      <Heading as="h2" size="lg" mb={4} textAlign="left">
        Edit Company Profile
      </Heading>
      <Divider borderColor="gray.300" mb={4} />

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Company Photo</FormLabel>
            <Box boxSize="100px" bg="gray.100" borderRadius="md" mb={2}>
              <Image src={photo} alt={name} objectFit="cover" borderRadius="md" />
            </Box>
            <Input type="file" accept="image/*" onChange={handlePhotoChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Company Name</FormLabel>
            <Input type="text" value={name} onChange={handleNameChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" value={address} onChange={handleAddressChange} />
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

export default CompanyForm;
