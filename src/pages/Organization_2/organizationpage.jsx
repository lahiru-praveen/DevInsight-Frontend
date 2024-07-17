
import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Icon,
  VStack
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';
import { Divider } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import BackButton from '../../components/Profile_page/BackButton';

const OrganizationModal = ({ isOpen, onClose, onSave, organization }) => {
  const [name, setName] = useState(organization.company_name);
  const [address, setAddress] = useState(organization.company_address);
  const [phone, setPhone] = useState(organization.phone_number);
  const [logoUrl, setLogoUrl] = useState(organization.logo_url);
  const [selectedFile, setSelectedFile] = useState(null);
  

  useEffect(() => {
    setName(organization.company_name);
    setAddress(organization.company_address);
    setPhone(organization.phone_number);
    setLogoUrl(organization.logo_url);
  }, [organization]);

  const handleSave = () => {
    onSave({
      company_name: name,
      company_address: address,
      phone_number: phone,
      logo_url: logoUrl,
    });
    onClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('admin_email', organization.admin_email);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload-logo', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setLogoUrl(data.logo_url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Organization</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Logo</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
                id="file-upload"
              />
              <Button
                as="label"
                htmlFor="file-upload"
                leftIcon={<Icon as={FiUpload} />}
                colorScheme="teal"
                variant="outline"
                width="100%"
                cursor="pointer"
              >
                {selectedFile ? selectedFile.name : "Choose Image"}
              </Button>
              {logoUrl && (
                <Box mt={4} width="150px" height="150px" mx="auto">
                  <Image
                    src={logoUrl}
                    alt="Logo Preview"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    borderRadius="md"
                  />
                </Box>
              )}
            </FormControl>
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

OrganizationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  organization: PropTypes.shape({
    company_name: PropTypes.string,
    company_address: PropTypes.string,
    phone_number: PropTypes.string,
    logo_url: PropTypes.string,
    admin_email: PropTypes.string,
  }).isRequired,
};



const OrganizationDetails = ({ organization, onUpdateOrganization }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box bg="gray.100" >
      <Box ml={-5} mt={-5}>
      <BackButton />
    </Box>
    <Box 
      position="relative" 
      bg="white" 
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
        Edit Organization
      </Button>

      <VStack spacing={6} align="center" flex={1} justifyContent="center">
        {organization.logo_url && (
          <Box width="150px" height="150px">
            <Image 
              src={organization.logo_url} 
              alt={`${organization.company_name} logo`} 
              objectFit="cover"
              width="100%"
              height="100%"
              borderRadius="md"
            />
          </Box>
        )}
        <Heading as="h2" size="lg" textAlign="center">
          {organization.company_name}
        </Heading>
        <Divider w="100%" />
        <VStack align="center" spacing={2}>
          <Text fontSize="sm" color="gray.500">
            Email
          </Text>
          <Text fontSize="md" color="gray.700">
            {organization.admin_email}
          </Text>
        </VStack>
        <Divider w="100%" />
        <VStack align="center" spacing={2}>
          <Text fontSize="sm" color="gray.500">
            Address
          </Text>
          <Text fontSize="md" color="gray.700" textAlign="center">
            {organization.company_address}
          </Text>
        </VStack>
        <Divider w="100%" />
        <VStack align="center" spacing={2}>
          <Text fontSize="sm" color="gray.500">
            Phone
          </Text>
          <Text fontSize="md" color="gray.700">
            {organization.phone_number}
          </Text>
        </VStack>
      </VStack>
      
      <OrganizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onUpdateOrganization}
        organization={organization}
      />
    </Box>
    </Box>
  );
};
OrganizationDetails.propTypes = {
  organization: PropTypes.shape({
    company_name: PropTypes.string,
    admin_email: PropTypes.string,
    company_address: PropTypes.string,
    phone_number: PropTypes.string,
    logo_url: PropTypes.string,
  }).isRequired,
  onUpdateOrganization: PropTypes.func.isRequired,
};


const App = () => {
  const [organization, setOrganization] = useState({
    company_name: '',
    admin_email: '',
    company_address: '',
    phone_number: '',
    logo_url: '',
  });
  const orgemail = sessionStorage.getItem("email");

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/get-organization-data?admin_email=${orgemail}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrganization(data);
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };

    fetchOrganizationData();
  }, []);

  const handleUpdateOrganization = async (updatedOrganization) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/update-company?admin_email=${organization.admin_email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrganization),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating organization:', errorData.detail);
        return;
      }

      // Update local state with the updated organization data
      const updatedData = await response.json();
      setOrganization({ ...organization, ...updatedData });
    } catch (error) {
      console.error('Error updating organization:', error);
    }
  };

  return (
    <ChakraProvider>
      <Box className="bg-gray-50 min-h-screen p-4">
        <OrganizationDetails
          organization={organization}
          onUpdateOrganization={handleUpdateOrganization}
        />
      </Box>
    </ChakraProvider>
  );
};

export default App;