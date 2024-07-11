import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  Box, Flex, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider,Image, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure, Tabs, Tab , TabList
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Devinsight from '../../assets/Devinsight.png';


const ManagerNavBar = () => {
  const adminEmail = sessionStorage.getItem('email');
  const company = sessionStorage.getItem('company');
  const image = sessionStorage.getItem('image');

  const tabIndex = () => {
    switch (location.pathname) {
        case '/ms':
            return 0;
        case '/cs':
            return 1;
        default:
            return -1;
    }
  };
 
  
  useEffect(() => {
    
    const fetchCompanyImage = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/get-organization-image?organization_email=${adminEmail}`);
        // setCompany(response.data);
        console.log(response.data)
        sessionStorage.setItem('image', response.data);
      } catch (error) {
        console.error("Error fetching company image:", error);
      }
    };
    fetchCompanyImage();
  }, [adminEmail]);

  const handleLogoutConfirm = () => {
   
    sessionStorage.clear(); // Clear session storage
    window.location.href = '/login-both'; // Redirect to the signin page
  };

 


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [logoutConfirmed, setLogoutConfirmed] = useState(false);

  return (
    <Box bg="gray-800" px={4} className="shadow-md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link to="/">
            <img src={Devinsight} alt="Logo" className="h-10" />
          </Link>
        </Box>

        <Box textAlign="center" color="gray.600">
                    <Tabs index={tabIndex()} variant="soft-rounded" colorScheme='blue'>
                        <TabList>
                            <Tab as={Link} to="/ms" 
                                 colorScheme={location.pathname === '/db' ? 'blue' : 'gray'}>Admin Portal</Tab>
                            <Tab as={Link} to="/Contact-us-manager" 
                                 colorScheme={location.pathname === '/Contact-us-manager' ? 'blue' : 'gray'}>Help</Tab>
                            
                        </TabList>
                    </Tabs>
                    </Box>

        <Flex alignItems="center">
          <Box textAlign="right" mr={3}>
            <Text fontWeight="bold" color="black">
            {company} 
            </Text>
            <Text fontSize="sm" color="gray.500">
            {adminEmail}
            </Text>
          </Box>
          <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
            <Box  width="50px" height="50px" mx="auto">
                  <Image
                    src={image}
                    alt="Logo Preview"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    borderRadius="md"
                  />
                </Box>
            </MenuButton>
            <MenuList>
              <Box px="4" py="2">
                <Text fontWeight="bold" color="black">
                  {company}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {adminEmail}
                </Text>
              </Box>
              <MenuDivider />
              <MenuItem as={Link} to="/opage" >Organization</MenuItem>
              <MenuItem as={Link} to="/settings">Settings</MenuItem>
              <MenuItem onClick={onOpen}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to logout?
          </ModalBody>
          <ModalFooter>
            
              <Button colorScheme="red" mr={3} onClick={handleLogoutConfirm}>
                Yes
              </Button>
           
            <Button variant="ghost" onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ManagerNavBar;
