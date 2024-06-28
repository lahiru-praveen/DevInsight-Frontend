// import React, { useState, useEffect } from 'react';
// import {
//   ChakraProvider,
//   Box,
//   Button,
//   Text,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
// } from '@chakra-ui/react';
// import Bethesda from '../../assets/bethesda.svg'; // Adjust the import path as necessary
// import PropTypes from 'prop-types';

// const OrganizationModal = ({ isOpen, onClose, onSave, organization }) => {
//   const [name, setName] = useState(organization.name);
//   const [logoSrc, setLogoSrc] = useState(organization.logoSrc);
//   const [address, setAddress] = useState(organization.address);
//   const [phone, setPhone] = useState(organization.phone);

//   useEffect(() => {
//     setName(organization.name);
//     setLogoSrc(organization.logoSrc);
//     setAddress(organization.address);
//     setPhone(organization.phone);
//   }, [organization]);

//   const handleSave = () => {
//     onSave({
//       name,
//       logoSrc,
//       address,
//       phone,
//     });
//     onClose();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setLogoSrc(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Edit Organization</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <FormControl mb={4}>
//             <FormLabel>Name</FormLabel>
//             <Input value={name} onChange={(e) => setName(e.target.value)} />
//           </FormControl>
//           <FormControl mb={4}>
//             <FormLabel>Logo</FormLabel>
//             <Input type="file" accept="image/*" onChange={handleFileChange} />
//             {logoSrc && <img src={logoSrc} alt="Logo" style={{ marginTop: '16px', maxWidth: '100%' }} />}
//           </FormControl>
//           <FormControl mb={4}>
//             <FormLabel>Address</FormLabel>
//             <Input value={address} onChange={(e) => setAddress(e.target.value)} />
//           </FormControl>
//           <FormControl mb={4}>
//             <FormLabel>Phone</FormLabel>
//             <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
//           </FormControl>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" onClick={handleSave}>
//             Save
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// OrganizationModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSave: PropTypes.func.isRequired,
//   organization: PropTypes.shape({
//     name: PropTypes.string,
//     logoSrc: PropTypes.string,
//     address: PropTypes.string,
//     phone: PropTypes.string,
//   }).isRequired,
// };

// const OrganizationDetails = ({ organization, onUpdateOrganization }) => {
//   const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false);

//   return (
//     <Box position="relative" className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
//       <Button
//         position="absolute"
//         top={4}
//         right={4}
//         variant="link"
//         colorScheme="teal"
//         onClick={() => setIsOrganizationModalOpen(true)}
//       >
//         Edit Organization
//       </Button>

//       <Box mb={8} className="text-center space-y-4">
//         <Heading as="h2" size="lg" mb={4}>
//           Organization
//         </Heading>
//         <div className="flex items-center justify-center">
//           <img src={organization.logoSrc} alt="Logo" className="max-w-[300px] mx-auto" />
//         </div>
//         <Text fontSize="md" color="gray.500" mb={4}>
//           {organization.name}
//         </Text>
//         <Text fontSize="sm" color="gray.600" mb={1}>
//           Email
//         </Text>
//         <Text fontSize="md" color="gray.500" mb={4}>
//           {organization.email}
//         </Text>
//         <Text fontSize="sm" color="gray.600" mb={1}>
//           Address
//         </Text>
//         <Text fontSize="md" color="gray.500" mb={4}>
//           {organization.address}
//         </Text>
//         <Text fontSize="sm" color="gray.600" mb={1}>
//           Phone
//         </Text>
//         <Text fontSize="md" color="gray.500" mb={4}>
//           {organization.phone}
//         </Text>
//       </Box>

//       <OrganizationModal
//         isOpen={isOrganizationModalOpen}
//         onClose={() => setIsOrganizationModalOpen(false)}
//         onSave={onUpdateOrganization}
//         organization={organization}
//       />
//     </Box>
//   );
// };

// OrganizationDetails.propTypes = {
//   organization: PropTypes.shape({
//     name: PropTypes.string,
//     logoSrc: PropTypes.string,
//     email: PropTypes.string,
//     address: PropTypes.string,
//     phone: PropTypes.string,
//   }).isRequired,
//   onUpdateOrganization: PropTypes.func.isRequired,
// };

// const App = () => {
//   const [organization, setOrganization] = useState({
//     name: 'Bethesda',
//     logoSrc: Bethesda,
//     email: 'admin@bethesda.com',
//     address: '123 Tech Street, San Francisco, CA',
//     phone: '123-456-7890',
//   });

//   const handleUpdateOrganization = (updatedOrganization) => {
//     setOrganization({ ...organization, ...updatedOrganization });
//   };

//   return (
//     <ChakraProvider>
//       <Box className="bg-gray-50 min-h-screen p-4">
//         <OrganizationDetails
//           organization={organization}
//           onUpdateOrganization={handleUpdateOrganization}
//         />
//       </Box>
//     </ChakraProvider>
//   );
// };

// export default App;
// import React, { useState, useEffect } from 'react';
// import {
//   ChakraProvider,
//   Box,
//   Button,
//   Text,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
// } from '@chakra-ui/react';
// import PropTypes from 'prop-types';

// const OrganizationModal = ({ isOpen, onClose, onSave, organization }) => {
//   const [name, setName] = useState(organization.company_name);
//   const [address, setAddress] = useState(organization.company_address);
//   const [phone, setPhone] = useState(organization.phone_number);

//   useEffect(() => {
//     setName(organization.company_name);
//     setAddress(organization.company_address);
//     setPhone(organization.phone_number);
//   }, [organization]);

//   const handleSave = () => {
//     onSave({
//       company_name: name,
//       company_address: address,
//       phone_number: phone,
//     });
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Edit Organization</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <FormControl mb={4}>
//             <FormLabel>Name</FormLabel>
//             <Input value={name} onChange={(e) => setName(e.target.value)} />
//           </FormControl>
//           <FormControl mb={4}>
//             <FormLabel>Address</FormLabel>
//             <Input value={address} onChange={(e) => setAddress(e.target.value)} />
//           </FormControl>
//           <FormControl mb={4}>
//             <FormLabel>Phone</FormLabel>
//             <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
//           </FormControl>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" onClick={handleSave}>
//             Save
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// OrganizationModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSave: PropTypes.func.isRequired,
//   organization: PropTypes.shape({
//     company_name: PropTypes.string,
//     company_address: PropTypes.string,
//     phone_number: PropTypes.string,
//   }).isRequired,
// };

// const OrganizationDetails = ({ organization, onUpdateOrganization }) => {
//   const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false);

//   return (
//     <Box position="relative" className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
//       <Button
//         position="absolute"
//         top={4}
//         right={4}
//         variant="link"
//         colorScheme="teal"
//         onClick={() => setIsOrganizationModalOpen(true)}
//       >
//         Edit Organization
//       </Button>
//       <Box mb={8} className="text-center space-y-4">
//         <Heading as="h2" size="lg" mb={4}>
//           Organization
//         </Heading>
//         <Text fontSize="md" color="gray.500" mb={4}>
//           {organization.company_name}
//         </Text>
//         <Text fontSize="sm" color="gray.600" mb={1}>
//           Email
//         </Text>
//         <Text fontSize="md" color="gray.500" mb={4}>
//           {organization.admin_email}
//         </Text>
//         <Text fontSize="sm" color="gray.600" mb={1}>
//           Address
//         </Text>
//         <Text fontSize="md" color="gray.500" mb={4}>
//           {organization.company_address}
//         </Text>
//         <Text fontSize="sm" color="gray.600" mb={1}>
//           Phone
//         </Text>
//         <Text fontSize="md" color="gray.500" mb={4}>
//           {organization.phone_number}
//         </Text>
//       </Box>
//       <OrganizationModal
//         isOpen={isOrganizationModalOpen}
//         onClose={() => setIsOrganizationModalOpen(false)}
//         onSave={onUpdateOrganization}
//         organization={organization}
//       />
//     </Box>
//   );
// };

// OrganizationDetails.propTypes = {
//   organization: PropTypes.shape({
//     company_name: PropTypes.string,
//     admin_email: PropTypes.string,
//     company_address: PropTypes.string,
//     phone_number: PropTypes.string,
//   }).isRequired,
//   onUpdateOrganization: PropTypes.func.isRequired,
// };

// const App = () => {
//   const [organization, setOrganization] = useState({
//     company_name: '',
//     admin_email: '',
//     company_address: '',
//     phone_number: '',
//   });

//   useEffect(() => {
//     const fetchOrganizationData = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/get-organization-data?admin_email=buwanekamara@gmail.com`);
//         const data = await response.json();
//         setOrganization(data);
//       } catch (error) {
//         console.error('Error fetching organization data:', error);
//       }
//     };

//     fetchOrganizationData();
//   }, []);

//   const handleUpdateOrganization = async (updatedOrganization) => {
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/update-company?admin_email=${organization.admin_email}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedOrganization),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error updating organization:', errorData.detail);
//         return;
//       }
  
//       const updatedData = await response.json();
//       setOrganization({ ...organization, ...updatedOrganization });
//     } catch (error) {
//       console.error('Error updating organization:', error);
//     }
//   };
//   return (
//     <ChakraProvider>
//       <Box className="bg-gray-50 min-h-screen p-4">
//         <OrganizationDetails
//           organization={organization}
//           onUpdateOrganization={handleUpdateOrganization}
//         />
//       </Box>
//     </ChakraProvider>
//   );
// };

// export default App;
// v2
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const OrganizationModal = ({ isOpen, onClose, onSave, organization }) => {
  const [name, setName] = useState(organization.company_name);
  const [address, setAddress] = useState(organization.company_address);
  const [phone, setPhone] = useState(organization.phone_number);
  const [logoUrl, setLogoUrl] = useState(organization.logo_url);

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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Organization</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Address</FormLabel>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Phone</FormLabel>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Logo URL</FormLabel>
            <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
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
  }).isRequired,
};

const OrganizationDetails = ({ organization, onUpdateOrganization }) => {
  const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false);

  return (
    <Box position="relative" className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto mt-8">
      <Button
        position="absolute"
        top={4}
        right={4}
        variant="link"
        colorScheme="teal"
        onClick={() => setIsOrganizationModalOpen(true)}
      >
        Edit Organization
      </Button>
      <Box mb={8} className="text-center space-y-4">
        <Heading as="h2" size="lg" mb={4}>
          Organization
        </Heading>
        {organization.logo_url && (
          <Box mb={4}>
            <img src={organization.logo_url} alt={`${organization.company_name} logo`} style={{ maxWidth: '100px', margin: '0 auto' }} />
          </Box>
        )}
        <Text fontSize="md" color="gray.500" mb={4}>
          {organization.company_name}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={1}>
          Email
        </Text>
        <Text fontSize="md" color="gray.500" mb={4}>
          {organization.admin_email}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={1}>
          Address
        </Text>
        <Text fontSize="md" color="gray.500" mb={4}>
          {organization.company_address}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={1}>
          Phone
        </Text>
        <Text fontSize="md" color="gray.500" mb={4}>
          {organization.phone_number}
        </Text>
      </Box>
      <OrganizationModal
        isOpen={isOrganizationModalOpen}
        onClose={() => setIsOrganizationModalOpen(false)}
        onSave={onUpdateOrganization}
        organization={organization}
      />
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

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/get-organization-data?admin_email=buwanekamara@gmail.com`);
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

      const updatedData = await response.json();
      setOrganization({ ...organization, ...updatedOrganization });
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