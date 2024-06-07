// import React, { useState, useEffect } from 'react';
// import {
//   Button,
//   Flex,
//   Heading,
//   Text,
//   Card,
//   CardBody,
//   Input,
//   FormControl,
//   FormLabel,
//   IconButton
// } from '@chakra-ui/react';
// import { CloseIcon } from '@chakra-ui/icons';
// import { useNavigate } from 'react-router-dom';

// import ProfilePic from "../../assets/profile pic.jpg";
// import ComLogo from "../../assets/99x.png";

// import { getUserProfile, createUserProfile, uploadProfilePicture } from './api'

// // function ProfileEditPage() {
// //   // State variables to hold user details
// //   const [user, setUser] = useState({
// //     name: 'Lahiru Praveen',
// //     username: '@Lahiru_Pr',
// //     email: 'Lahiruprveen@gmail.com',
// //     role: 'DEVELOPER'
// //   });

// const EditProfile = ({ userId, token }) => {
//   const [profile, setProfile] = useState({
//     lastName: '',
//     firstName: '',
//     username: '',
//     email: '',
//     role: '',
//     skills: '',
//     profilePicture: '',
//   });

//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
 



//   // State variable to hold profile picture
//   const [profilePicture, setProfilePicture] = useState(ProfilePic);

//   // State variable to hold programming languages
//   const [languages, setLanguages] = useState(['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go']);

//   // State to handle new skill input
//   const [newSkill, setNewSkill] = useState('');

//   // State to handle edit mode
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const email = sessionStorage.getItem("email")
//         const data = await getUserProfile(email, token);
//         console.log(data);
//         setProfile(data);
//         setProfilePicture(data.profilePicture || ProfilePic);
//         setLanguages(data.skills ? data.skills.split(',') : []);
//       } catch (error) {
//         setError(error.detail);
//       }
//     };

//     fetchProfile();
//   }, [userId, token]);

//   // Handle input change for user details
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
//   };

//   // Handle new skill input change
//   const handleNewSkillChange = (e) => {
//     setNewSkill(e.target.value);
//   };

//     //Handle Logout
//     const handleLogout = () => {
//       // Clear session storage
//       sessionStorage.clear();
    
//       // Navigate to the '/si' route
//       navigate('/si');
//     };

//   // Add new skill to the languages array
//   const addSkill = () => {
//     if (newSkill.trim()) {
//       setLanguages((prevLanguages) => [...prevLanguages, newSkill.trim()]);
//       setNewSkill('');
//     }
//   };

//   // Delete skill from the languages array
//   const deleteSkill = (index) => {
//     setLanguages((prevLanguages) => prevLanguages.filter((_, i) => i !== index));
//   };

//   // Toggle edit mode
//   const toggleEditMode = () => {
//     setIsEditing(!isEditing);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedProfile = { ...profile, skills: languages.join(',') };
//       await createUserProfile(profile.email, profile, token);
//       if (file) {
//         await uploadProfilePicture(userId, file, token);
//       }
//       setMessage('Profile updated successfully');
//       setIsEditing(false);
//     } catch (error) {
//       setError(error.detail);
//     }
//   };

//   // Handle profile picture change
//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePicture(reader.result);
//         setFile(file);
//       };
//       reader.readAsDataURL(file);
//     }
//   };


 
    


//   return (
//     <Flex>
//       {/* Left side of the page */}
//       <div className="w-1/2 h-screen">
//         <Card className="ml-10 mt-10 w-5/6 h-screen" variant='outline'>
//           <CardBody className="flex flex-col justify-evenly">
//             {/* Profile picture */}
//             <img src={profilePicture} className="rounded-full w-64 h-64 mx-auto" alt="Profile" />

//             {isEditing ? (
//               <form onSubmit={handleSubmit}>
//                 <FormControl id="firstName" className="mb-3">
//                   <FormLabel>First Name</FormLabel>
//                   <Input
//                     type="text"
//                     name="firstName"
//                     value={profile.firstName}
//                     onChange={handleInputChange}
//                   />
//                 </FormControl>
//                 <FormControl id="lastName" className="mb-3">
//                   <FormLabel>Last Name</FormLabel>
//                   <Input
//                     type="text"
//                     name="lastName"
//                     value={profile.lastName}
//                     onChange={handleInputChange}
//                   />
//                 </FormControl>
//                 <FormControl id="username" className="mb-3">
//                   <FormLabel>Username</FormLabel>
//                   <Input
//                     type="text"
//                     name="username"
//                     value={profile.username}
//                     onChange={handleInputChange}
//                   />
//                 </FormControl>
//                 <FormControl id="email" className="mb-3">
//                   <FormLabel>Email</FormLabel>
//                   <Input
//                     type="email"
//                     name="email"
//                     value={profile.email}
//                     onChange={handleInputChange}
//                   />
//                 </FormControl>
//                 <FormControl id="profilePicture" className="mb-3">
//                   <FormLabel>Profile Picture</FormLabel>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleProfilePictureChange}
//                   />
//                 </FormControl>
//                 <Button type="submit" colorScheme="blue">
//                   Save Changes
//                 </Button>
//               </form>
//             ) : (
//               <center>
//                 {/* User information */}
//                 <Heading className="p-3">{profile.name}</Heading>
//                 <Text className='font-bold text-3xl mb-3'>{profile.username}</Text>
//                 <Text className='mb-3'>{profile.email}</Text>
//                 <Button size='xs' variant='solid' colorScheme='blue'>
//                   {profile.role}
//                 </Button>
//               </center>
//             )}

//             {/* Edit profile button */}
//             <div className="mt-20">
//               <Button w={'full'} variant='solid' colorScheme='blue' onClick={toggleEditMode}>
//                 {isEditing ? 'Cancel' : 'Edit Profile'}
//               </Button>
//             </div>
//           </CardBody>
//         </Card>
//       </div>

//       {/* Right side of the page */}
//       <div className="w-1/2">
//         {/* Company card */}
//         <Card className="h-2/5 mt-10 mb-10 ml-10 w-5/6" variant='outline'>
//           <CardBody>
//             {/* Company logo */}
//             <div className="float-left mr-4 mt-16">
//               <img src={ComLogo} alt="Company Logo" width="200" height="100" />
//             </div>
//             <Text className='text-right mr-10'>99x</Text><br/>
//             <Text className='text-right mr-10'>125ILM</Text><br/>
//             <Text className='text-right mr-10'>99Xprvt</Text><br/>
//             <a href="https://99x.io" className="text-right"> 99x - Creating impactful digital products | 99x</a>
//           </CardBody>
//         </Card>

//         {/* Programming languages card */}
//         <Card className="h-2/5 mt-10 ml-10 w-5/6" variant='outline'>
//           <CardBody>
//             <Heading>Skills</Heading><br/>
//             <Flex wrap='wrap'>
//               {/* Display programming languages as buttons with delete option */}
//               {languages.map((language, index) => (
//                 <Flex key={index} align="center" m='1'>
//                   <Button variant='outline' colorScheme='blue'>
//                     {language}
//                   </Button>
//                   {isEditing && (
//                     <IconButton
//                       aria-label="Delete skill"
//                       icon={<CloseIcon />}
//                       size="xs"
//                       ml="2"
//                       onClick={() => deleteSkill(index)}
//                     />
//                   )}
//                 </Flex>
//               ))}
//             </Flex>
//             {isEditing && (
//               <FormControl mt="4">
//                 <FormLabel>New Skill</FormLabel>
//                 <Flex>
//                   <Input
//                     type="text"
//                     value={newSkill}
//                     onChange={handleNewSkillChange}
//                   />
//                   <Button ml="2" onClick={addSkill} colorScheme="blue">
//                     Add
//                   </Button>
//                 </Flex>
//               </FormControl>
//             )}
//             <div className="mt-20">
//               <Button w={'full'} variant='solid' colorScheme='red'>
//                 Deactivate
//               </Button>
//             </div>
//             <div className="mt-20">
//               <Button w={'full'} variant='solid' colorScheme='blue' onClick={handleLogout}>
//                 Log Out
//               </Button>
//             </div>
//           </CardBody>
//         </Card>
//       </div>
//     </Flex>
//   );
// }

// export default EditProfile;



import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Heading,
  Text,
  Card,
  CardBody,
  Input,
  FormControl,
  FormLabel,
  IconButton
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

import ProfilePic from "../../assets/profile pic.jpg";
import ComLogo from "../../assets/99x.png";

import { getUserProfile, createUserProfile, uploadProfilePicture } from './api'

const EditProfile = ({ userId, token }) => {
  const [profile, setProfile] = useState({
    lastName: '',
    firstName: '',
    username: '',
    email: '',
    role: '',
    skills: '',
    profilePicture: '',
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // State variable to hold profile picture
  const [profilePicture, setProfilePicture] = useState(ProfilePic);

  // State variable to hold programming languages
  const [languages, setLanguages] = useState(['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go']);

  // State to handle new skill input
  const [newSkill, setNewSkill] = useState('');

  // State to handle edit mode
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = sessionStorage.getItem("email")
        const data = await getUserProfile(email, token);
        console.log(data);
        setProfile(data);
        setProfilePicture(data.profilePicture || ProfilePic);
        setLanguages(data.skills ? data.skills.split(',') : []);
      } catch (error) {
        setError(error.detail);
      }
    };

    fetchProfile();
  }, [userId, token]);

  // Handle input change for user details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Handle new skill input change
  const handleNewSkillChange = (e) => {
    setNewSkill(e.target.value);
  };

  // Handle Logout
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Navigate to the '/si' route
    navigate('/si');
  };

  // Add new skill to the languages array
  const addSkill = () => {
    if (newSkill.trim()) {
      setLanguages((prevLanguages) => [...prevLanguages, newSkill.trim()]);
      setNewSkill('');
    }
  };

  // Delete skill from the languages array
  const deleteSkill = (index) => {
    setLanguages((prevLanguages) => prevLanguages.filter((_, i) => i !== index));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = { ...profile, skills: languages.join(',') };
      await createUserProfile(profile.email, profile, token);
      if (file) {
        await uploadProfilePicture(userId, file, token);
      }
      setMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setError(error.detail);
    }
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Flex>
      {/* Left side of the page */}
      <div className="w-1/2 h-screen">
        <Card className="ml-10 mt-10 w-5/6 h-screen" variant='outline'>
          <CardBody className="flex flex-col justify-evenly">
            {/* Profile picture */}
            <img src={profilePicture} className="rounded-full w-64 h-64 mx-auto" alt="Profile" />

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <FormControl id="username" className="mb-3">
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="profilePicture" className="mb-3">
                  <FormLabel>Profile Picture</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue">
                  Save Changes
                </Button>
              </form>
            ) : (
              <center>
                {/* User information */}
                <Heading className="p-3">{profile.name}</Heading>
                <Text className='font-bold text-3xl mb-3'>{profile.username}</Text>
                <Text className='mb-3'>{profile.email}</Text>
                <Button size='xs' variant='solid' colorScheme='blue'>
                  {profile.role}
                </Button>
              </center>
            )}

            {/* Edit profile button */}
            <div className="mt-20">
              <Button w={'full'} variant='solid' colorScheme='blue' onClick={toggleEditMode}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </CardBody>
          
        </Card>
      </div>

      {/* Right side of the page */}
      <div className="w-1/2">
        {/* Company card */}
        <Card className="h-2/5 mt-10 mb-10 ml-10 w-5/6" variant='outline'>
          <CardBody>
            {/* Company logo */}
            <div className="float-left mr-4 mt-16">
              <img src={ComLogo} alt="Company Logo" width="200" height="100" />
            </div>
            <Text className='text-right mr-10'>99x</Text><br/>
            <Text className='text-right mr-10'>125ILM</Text><br/>
            <Text className='text-right mr-10'>99Xprvt</Text><br/>
            <a href="https://99x.io" className="text-right"> 99x - Creating impactful digital products | 99x</a>
          </CardBody>
        </Card>

        {/* Programming languages card */}
        <Card className="h-2/5 mt-10 ml-10 w-5/6" variant='outline'>
          <CardBody>
            <Heading>Skills</Heading><br/>
            <Flex wrap='wrap'>
              {/* Display programming languages as buttons with delete option */}
              {languages.map((language, index) => (
                <Flex key={index} align="center" m='1'>
                  <Button variant='outline' colorScheme='blue'>
                    {language}
                  </Button>
                  {isEditing && (
                    <IconButton
                      aria-label="Delete skill"
                      icon={<CloseIcon />}
                      size="xs"
                      ml="2"
                      onClick={() => deleteSkill(index)}
                    />
                  )}
                </Flex>
              ))}
            </Flex>
            {isEditing && (
              <FormControl mt="4">
                <FormLabel>New Skill</FormLabel>
                <Flex>
                  <Input
                    type="text"
                    value={newSkill}
                    onChange={handleNewSkillChange}
                  />
                  <Button ml="2" onClick={addSkill} colorScheme="blue">
                    Add
                  </Button>
                </Flex>
              </FormControl>
            )}
          </CardBody>
          <Flex justify="space-between" p={4}>
            <Button w={'48%'} variant='solid' colorScheme='red'>
              Deactivate
            </Button>
            <Button w={'48%'} variant='solid' colorScheme='blue' onClick={handleLogout}>
              Log Out
            </Button>
          </Flex>
        </Card>
      </div>
    </Flex>
  );
}

export default EditProfile;


