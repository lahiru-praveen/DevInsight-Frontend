import React, { useState } from 'react';
import {
  Box, Flex, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Devinsight from '../../assets/Devinsight.png';
import Bethesda from '../../assets/bethesda.svg';  // Ensure you have a logo image in this path

const ManagerNavBar = () => {
  const user = {
    Organizaltion_name: 'Bethesda',
    
    email: 'admin@bethesda.com',
    photo:'Bethesda',
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
          <Text fontSize="xl" fontWeight="bold">
            Member Manage Portal
          </Text>
        </Box>

        <Flex alignItems="center">
          <Box textAlign="right" mr={3}>
            <Text fontWeight="bold" color="black">
              {user.Organizaltion_name} 
            </Text>
            <Text fontSize="sm" color="gray.300">
              {user.email}
            </Text>
          </Box>
          <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Avatar size="md" name={`${user.firstName} ${user.lastName}`} src={Bethesda} />
            </MenuButton>
            <MenuList>
              <Box px="4" py="2">
                <Text fontWeight="bold" color="black">
                  {user.Organizaltion_name} 
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {user.email}
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
            <Link to="/">
              <Button colorScheme="red" mr={3}>
                Yes
              </Button>
            </Link>
            <Button variant="ghost" onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ManagerNavBar;
