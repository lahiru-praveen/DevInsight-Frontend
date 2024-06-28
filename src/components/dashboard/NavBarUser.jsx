import logo from "../../assets/Devinsight.png";
import React, { useState, useEffect } from 'react';
import {
  Avatar, Wrap, WrapItem, Button, Text,
  Menu, MenuButton, MenuList, MenuItem, MenuDivider,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,
} from '@chakra-ui/react';
import { AvatarBadge } from '@chakra-ui/react';
import { Link, useLocation } from "react-router-dom";
import { RxDividerVertical } from "react-icons/rx";

export default function NavBarUser() {
  const location = useLocation();
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    company: '',
    role: '',
  });

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
        const token = sessionStorage.getItem('access_token'); // Assuming you're storing the token in sessionStorage
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://localhost:8000/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
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
      <div className="flex flex-row items-center justify-between bg-white text-black text-xl border-2 border-solid">
        <div>
          <a href="/db">
            <img className="pl-4 h-10 w-auto" src={logo} alt="Logo" />
          </a>
        </div>
        <div className="flex items-center p-5">
          <Link to="/db">
            <Button colorScheme={location.pathname === '/db' ? 'blue' : 'gray'}>Dashboard</Button>
          </Link>
          <RxDividerVertical className="ml-1 mr-1" />
          <Link to="/cs">
            <Button colorScheme={location.pathname === '/cs' ? 'blue' : 'gray'}>Submissions</Button>
          </Link>
          <RxDividerVertical className="ml-1 mr-1" />
          <Link to="/uhr">
            <Button colorScheme={location.pathname === '/uhr' ? 'blue' : 'gray'}>Help Requests</Button>
          </Link>
          <RxDividerVertical className="ml-1 mr-1" />
          <Link to="/cu">
            <Button colorScheme={location.pathname === '/cu' ? 'blue' : 'gray'}>Help</Button>
          </Link>
        </div>
        <div className="flex flex-row">
          <div className="flex-col">
            {profile && (
              <div>
                <Text>{profile.username}</Text>
                <Text>{profile.company}</Text>
              </div>
            )}
          </div>
          <div>
            <Menu>
              <MenuButton>
                <Wrap>
                  <WrapItem className="mr-2">
                    <Avatar size="lg" name={profile.name} src={profile.profilePicture}>
                      <AvatarBadge boxSize='1.25em' bg='green.500' />
                    </Avatar>
                  </WrapItem>
                </Wrap>
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/edit-profile">Profile</MenuItem>
                <MenuDivider />
                <MenuItem as={Link} to="/settings">Settings</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
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


