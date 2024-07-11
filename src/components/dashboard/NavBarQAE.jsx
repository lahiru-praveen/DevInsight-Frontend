import logo from "../../assets/Devinsight.png";
import React, { useState, useEffect } from 'react';
import {Flex, Avatar, Wrap, WrapItem, Button, Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Tabs, TabList, Tab, Box,} from '@chakra-ui/react';
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavBarQAE({ button1, button2, button3, button4, button5 }) {
    const location = useLocation();
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        company: '',
        role: '',
    });
    const tabIndex = () => {
        switch (location.pathname) {
            case '/db':
                return 0;
            case 'qhr':
                return 1
            case '/cs':
                return 2;
            case '/uhr':
                return 3;
            case '/cu':
                return 4;
            default:
                return -1;
        }
    };

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const cancelRef = React.useRef();

    const handleLogout = () => {
        setIsLoggingOut(true);
    };

    const handleLogoutConfirm = () => {
        setIsLoggingOut(false);
        sessionStorage.clear(); // Clear session storage
        window.location.href = '/login-developer'; // Redirect to the signin page
    };

    useEffect(() => {
        // Fetch user data from the database
        const fetchProfile = async () => {
            try {
                const token = sessionStorage.getItem('access_token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch('http://localhost:8000/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                console.log('User data:', userData); // Log the user data to check its content

                // Fetch user profile from the database based on the email
                const email = userData.email;
                if (!email) {
                    throw new Error('Email is undefined');
                }

                const profileResponse = await fetch(`http://localhost:8000/api/profile/${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });

                if (!profileResponse.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const profileData = await profileResponse.json();
                console.log('Profile data:', profileData); // Log the profile data to check its content
                setProfile(profileData); // Update user data in state
            } catch (error) {
                console.error('Error fetching profile data:', error);
                // Handle error, show error message, etc.
                // Redirect to the sign-in page if no token is found
                if (error.message === 'No token found') {
                    window.location.href = '/login-developer';
                }
            }
        };

        fetchProfile();
    }, []);

    return (
        <>
            <Box bg="gray-800" px={4} className="shadow-md">
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <Box>
                        <img src={logo}  alt="Logo" className="h-10"/>
                    </Box>

                    <Box textAlign="center" color="gray.600">
                        <Tabs index={tabIndex()} variant="soft-rounded" colorScheme='blue'>
                            <TabList>
                                <Tab as={Link} to="/db" isDisabled={button1}
                                     colorScheme={location.pathname === '/db' ? 'blue' : 'gray'}>Dashboard</Tab>
                                <Tab as={Link} to="/qhr" isDisabled={button5}
                                     colorScheme={location.pathname === '/cu' ? 'blue' : 'gray'}>Requests</Tab>
                                <Tab as={Link} to="/cs" isDisabled={button2}
                                     colorScheme={location.pathname === '/cs' ? 'blue' : 'gray'}>Submissions</Tab>
                                <Tab as={Link} to="/uhr" isDisabled={button3}
                                     colorScheme={location.pathname === '/uhr' ? 'blue' : 'gray'}>Help Requests</Tab>
                                <Tab as={Link} to="/cu" isDisabled={button4}
                                     colorScheme={location.pathname === '/cu' ? 'blue' : 'gray'}>Help</Tab>
                            </TabList>
                        </Tabs>
                    </Box>


                    <Flex alignItems="center">
                        {profile && (
                            <Box textAlign="right" mr={3}>
                                <Text fontWeight="bold" color="black">
                                    {profile.username}
                                </Text>
                                <Text fontSize="sm" color="gray.300">
                                    {profile.company}
                                </Text>
                            </Box>
                        )}


                        <Menu>
                            <MenuButton>
                                <Wrap>
                                    <WrapItem className="mr-2">
                                        <Avatar size="md" name={profile.name} src={profile.profilePicture}>

                                        </Avatar>
                                    </WrapItem>
                                </Wrap>
                            </MenuButton>
                            <MenuList>
                                <Box px="4" py="2">
                                    <Text fontWeight="bold" color="black">
                                        {profile.username}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        {profile.email}
                                    </Text>
                                </Box>
                                <MenuDivider />
                                <MenuItem as={Link} to="/edit-profile">Profile</MenuItem>
                                <MenuDivider/>
                                <MenuItem as={Link} to="/settings">Settings</MenuItem>
                                <MenuDivider/>
                                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>


                </Flex>
            </Box>
            {isLoggingOut && (
                <AlertDialog
                    isOpen={true}
                    leastDestructiveRef={cancelRef}
                    onClose={() => setIsLoggingOut(false)}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Logging Out
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                Are you sure you want to log out?
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={() => setIsLoggingOut(false)}>
                                    Cancel
                                </Button>
                                <Button colorScheme="red" onClick={handleLogoutConfirm} ml={3}>
                                    Log Out
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            )}
        </>
    );
}

NavBarQAE.propTypes = {
    button1: PropTypes.bool,
    button2: PropTypes.bool,
    button3: PropTypes.bool,
    button4: PropTypes.bool,
    button5: PropTypes.bool,
};

NavBarQAE.defaultProps = {
    button1: false,
    button2: false,
    button3: false,
    button4: false,
    button5: false,
};




