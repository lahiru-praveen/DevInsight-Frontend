import { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  Alert,
  AlertIcon,
  Text,
  Spinner // Import Spinner component for loading indication
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const InviteTable = () => {
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const [isLoadingModal, setLoadingModal] = useState(false); // State for loading modal
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [invites, setInvites] = useState([]);
  const [company,setCompany] = useState('');
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [query, setQuery] = useState("");
  const [inputError, setInputError] = useState("");
  const adminEmail = sessionStorage.getItem('email');

  
  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/get-organization-name?organization_email=${adminEmail}`);
        setCompany(response.data);
        console.log(response.data);
        sessionStorage.setItem('company', response.data);
      } catch (error) {
        console.error("Error fetching company name:", error);
      }
    };

    fetchCompanyName();
  }, [adminEmail]);
  


  const fetchInviteTable = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/get-invitations?organization_email=${adminEmail}`);
      console.log("Fetched data:", response.data.invitations);
      setInvites(response.data.invitations);}
    catch (error) {
      console.error("Error fetching invite table:", error);
      setError("Error fetching invite table. Please try again later.");
    }
  };

  useEffect(() => {
    fetchInviteTable();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/delete-invite/${invites[index]._id.$oid}`);
      setInvites(invites.filter((inv, idx) => idx !== index));
      onClose1();
    } catch (error) {
      console.error("Error deleting invite:", error);
      setError("Error deleting invite. Please try again later.");
    }
  };

  const handleSendInvite = async () => {
    try {
      setLoadingModal(true); // Show loading modal
      if (!email || !email.trim()) {
        setInputError("Email is required");
        return;
      }
      if (!role) {
        setInputError("Role must be selected");
        return;
      }
  
      setInputError(""); 
  
      const emailExists = invites.some(invite => invite.user_email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        setInputError("Email already exists in invites");
        return;
      }
  
      const invite_accepted = false;
      const newInvite = {
        invite_accepted: invite_accepted,
        organization_email: adminEmail,
        organization_name: company,
        user_email: email,
        role: role,
        sent_date: new Date().toISOString()
      };
      console.log(newInvite);
      const response = await axios.post(`http://127.0.0.1:8000/send-invite`, newInvite);
      console.log(response.data);
      
      if (response.data.message === "Invite sent successfully") {
        await fetchInviteTable();
        onClose2();
      } else {
        console.error("Error sending invite, response data is invalid:", response);
        setError("Error sending invite. Please try again later.");
      }
      
    } catch (error) {
      console.error("Error sending invite:", error);
      setError("Error sending invite. Please try again later.");
    } finally {
      setLoadingModal(false); // Hide loading modal
    }
  };

  const handleResendInvite = async (inviteId) => {
    try {
      setLoadingModal(true); // Show loading modal
      const response = await axios.post(`http://127.0.0.1:8000/resend-invite/${inviteId}`);
      console.log(response.data);
      if (response.data.message === "Invite resent successfully") {
        alert("Invite resent successfully");
      } else {
        console.error("Error resending invite:", response);
        setError("Error resending invite. Please try again later.");
      }
    } catch (error) {
      console.error("Error resending invite:", error);
      setError("Error resending invite. Please try again later.");
    } finally {
      setLoadingModal(false); // Hide loading modal
    }
  };

  const onOpenModal = (index) => {
    setIndex(index);
    onOpen1();
  };

  const filteredInvites = invites.filter(invite => {
    return (
      invite.user_email.toLowerCase().includes(query.toLowerCase()) ||
      invite.role.toLowerCase().includes(query.toLowerCase()) ||
      (invite.sent_date && invite.sent_date.toLowerCase().includes(query.toLowerCase()))
    );
  });

  return (
    <div className="px-20 py-20">
      {error && <Alert status="error" mb={4}>{error}</Alert>}

      <Modal isOpen={isOpen1} onClose={onClose1} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Invitation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Do you really want to delete the Invitation?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleDelete}>Yes</Button>
            <Button variant="ghost" onClick={onClose1}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen2} onClose={onClose2} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Invite</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {inputError && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {inputError}
              </Alert>
            )}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)} placeholder="Select role">
                <option value="Quality assurance">Quality assurance</option>
                <option value="Developer">Developer</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSendInvite}>Send Invite</Button>
            <Button onClick={onClose2}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Loading Modal */}
      <Modal isOpen={isLoadingModal} onClose={() => setLoadingModal(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody textAlign="center">
            <Spinner size="xl" />
            <Text mt={4}>Sending invitation...</Text>
          </ModalBody>
        </ModalContent>
      </Modal>

      <div>
        <h1 className="py-5 text-xl leading-tight font-bold text-gray-500">Invitations</h1>
      </div>

      <div className="flex flex-row space-x-5 py-5">
        <div className="basis-3/4">
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.600" />} />
            <Input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </InputGroup>
        </div>
        
        <div className="basis-1/4">
          <Button onClick={onOpen2} className="w-full" colorScheme="blue">Send Invitation</Button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll h-64">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvites.map((invite, index) => (
              <tr key={index} className={index % 2 === 0 ? "even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" : "odd:bg-white odd:dark:bg-gray-900 border-b dark:border-gray-700"}>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">{invite.user_email}</td>
                <td className="px-6 py-4">{invite.role}</td>
                <td className="px-6 py-4">{invite.sent_date ? new Date(invite.sent_date).toLocaleString() : 'N/A'}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => onOpenModal(index)} className="px-3 py-1 text-red-500 hover:text-red-600">Delete</button>
                    <button onClick={() => handleResendInvite(invite._id.$oid)} className="px-3 py-1 text-blue-500 hover:text-blue-600">Resend</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InviteTable;




//working best

// import React, { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   useDisclosure,
//   FormErrorMessage
// } from '@chakra-ui/react';
// import { Select } from '@chakra-ui/react';
// import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
// import { Search2Icon } from "@chakra-ui/icons";
// import { Button } from '@chakra-ui/react';
// import emailjs from "@emailjs/browser";

// export const InviteTable = () => {
//   const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
//   const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
//   const initialRef = useRef(null);
//   const finalRef = useRef(null);
//   const [invites, setInvites] = useState([]);
//   const [error, setError] = useState(null);
//   const [emailError, setEmailError] = useState(""); // State for email error message
//   const [roleError, setRoleError] = useState(""); // State for role error message
//   const [index, setIndex] = useState(null);
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const emailRef = useRef("");
//   const roleRef = useRef("");
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const fetchInviteTable = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:8001/invite-table");
//         console.log(response.data); // Add this line to debug the response
//         setInvites(response.data);
//       } catch (error) {
//         console.error("Error fetching invite table:", error);
//         setError("Error fetching invite table. Please try again later.");
//       }
//     };

//     fetchInviteTable();
//   }, []);

//   useEffect(() => emailjs.init("PS5ghhKYxM1wwF0sO"), []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if email and role are provided
//     if (!email) {
//       setEmailError("Email is required.");
//       return;
//     }
//     if (!role) {
//       setRoleError("Role is required.");
//       return;
//     }

//     const serviceId = "service_pst9db1";
//     const templateId = "template_bq195h8";
//     try {
//       await emailjs.send(serviceId, templateId, {
//         rolef: role,
//         recipient: email
//       });
//       alert("Email successfully sent");
//       onClose2(); // Close the modal after sending the email
//     } catch (error) {
//       console.error("Error sending email:", error);
//       alert("Error sending email. Please try again later.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://127.0.0.1:8001/invites/${invites[index].id}`);
//       setInvites(invites.filter(inv => inv.id !== invites[index].id));
//       onClose1();
//     } catch (error) {
//       console.error("Error deleting invite:", error);
//       setError("Error deleting invite. Please try again later.");
//     }
//   };

//   const onOpenModal = (index) => {
//     setIndex(index);
//     onOpen1();
//   };

//   const handleAddInvite = async () => {
//     // Check if email and role are provided
//     if (!email) {
//       setEmailError("Email is required.");
//       return;
//     }
//     if (!role) {
//       setRoleError("Role is required.");
//       return;
//     }

//     // Check if email already exists in invites
//     const emailExists = invites.some(invite => invite.email === email);
//     if (emailExists) {
//       setEmailError("This email is already invited.");
//       return;
//     }

//     const currentDate = new Date().toISOString();
//     try {
//       const response = await axios.post("http://127.0.0.1:8001/add-invite", { email, role, date: currentDate });
//       const newInvite = { id: response.data.id, email, role, date: currentDate }; // Adjust based on your backend response
//       setInvites([...invites, newInvite]);
//       onClose2();
//     } catch (error) {
//       console.error("Error adding invite:", error);
//     }
//   };

//   const handleResend = async (index) => {
//     try {
//       await emailjs.send("service_pst9db1", "template_bq195h8", {
//         rolef: invites[index].role,
//         recipient: invites[index].email
//       });
//       alert("Email successfully resent");
//     } catch (error) {
//       console.error("Error resending invite:", error);
//       setError("Error resending invite. Please try again later.");
//     }
//   };

//   const filteredInvites = invites.filter(invite => {
//     return (
//       invite.email.toLowerCase().includes(query.toLowerCase()) ||
//       invite.role.toLowerCase().includes(query.toLowerCase()) ||
//       (invite.date && invite.date.toLowerCase().includes(query.toLowerCase())) // Adjusted to check if invite.device exists
//     );
//   });

//   return (
//     <div className="px-20 py-20">
//       <Modal isOpen={isOpen1} onClose={onClose1}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Delete Invitation</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             Do you really want to delete the Invitation?
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme='blue' mr={3} onClick={() => handleDelete()}>
//               Yes
//             </Button>
//             <Button variant='ghost' onClick={onClose1}>Close</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       <Modal isOpen={isOpen2} onClose={onClose2}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Send Invite</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl isInvalid={emailError}>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   setEmailError(""); // Clear error when typing
//                 }}
//                 type="email"
//                 placeholder="Enter email"
//               />
//               {emailError && <FormErrorMessage>{emailError}</FormErrorMessage>}
//             </FormControl>

//             <FormControl mt={4} isInvalid={roleError}>
//               <FormLabel>Role</FormLabel>
//               <Select
//                 value={role}
//                 onChange={(e) => {
//                   setRole(e.target.value);
//                   setRoleError(""); // Clear error when selecting a role
//                 }}
//                 placeholder="Select role"
//               >
//                 <option value="Quality assurance">Quality assurance</option>
//                 <option value="Developer">Developer</option>
//               </Select>
//               {roleError && <FormErrorMessage>{roleError}</FormErrorMessage>}
//             </FormControl>
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleAddInvite}>
//               Add Invite
//             </Button>
//             <Button colorScheme="blue" onClick={handleSubmit}>
//               Send Email
//             </Button>
//             <Button onClick={onClose2}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       <div>
//         <h1 className="py-5 text-xl leading-tight font-bold text-gray-500">
//           Invitations
//         </h1>
//       </div>
//       <div className='flex flex-row space-x-5 py-5'>
//         <div className='basis-2/4'>
//           <InputGroup>
//             <InputLeftElement children={<Search2Icon color="gray.600"/>} />
//             <Input
//               placeholder="Search..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </InputGroup>
//         </div>
//         <div className='basis-1/4'>
//           <Button className='w-full' colorScheme='blue' variant='outline'>Search</Button>
//         </div>
//         <div className='basis-1/4'>
//           <Button onClick={onOpen2} className='w-full' colorScheme='blue'>Send Invitation</Button>
//         </div>
//       </div> 

//       <div className="overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll h-64">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="sticky top-0 bg-white">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredInvites.map((invite, index) => (
//               <tr
//                 key={index}
//                 className={
//                   index % 2 === 0
//                     ? "even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
//                     : "odd:bg-white odd:dark:bg-gray-900 border-b dark:border-gray-700"
//                 }
//               >
//                 <td className="px-6 py-4 whitespace-nowrap dark:text-white">
//                   {invite.email}
//                 </td>
//                 <td className="px-6 py-4">{invite.role}</td>
//                 <td className="px-6 py-4">{invite.date ? new Date(invite.date).toLocaleString() : 'N/A'}</td>
//                 <td className="px-6 py-4">
//                 <div className="flex justify-end space-x-2">
//                   <button
//                     onClick={() => onOpenModal(index)}
//                     className="px-3 py-1 text-red-500 hover:text-red-600"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => handleResend(index)}
//                     className="px-3 py-1 text-blue-500 hover:text-blue-600"
//                   >
//                     Resend
//                   </button>
//                 </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };




// import React, { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   FormControl,
//   FormLabel,
//   useDisclosure,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Select,
//   Button,
// } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";

// export const InviteTable = () => {
//   const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
//   const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
//   const initialRef = useRef(null);
//   const finalRef = useRef(null);
//   const [invites, setInvites] = useState([]); // Ensure invites is initialized as an empty array
//   const [error, setError] = useState(null);
//   const [index, setIndex] = useState(null);
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [query, setQuery] = useState("");
//   const organization_email = 'devinsight@gmail.com';

//   useEffect(() => {
//     const fetchInviteTable = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/get-invitations?organization_email=${organization_email}`);
//         console.log("Fetched data:", response.data); // Debug response data
//         setInvites(response.data);
        
        
//       }catch (error) {
//         console.error("Error fetching invite table:", error);
//         setError("Error fetching invite table. Please try again later.");
//       }
//     };

//     fetchInviteTable();
//   }, []);

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/invites/${invites[index]._id}`);
//       setInvites(invites.filter((inv, idx) => idx !== index));
//       onClose1();
//     } catch (error) {
//       console.error("Error deleting invite:", error);
//       setError("Error deleting invite. Please try again later.");
//     }
//   };

//   const handleSendInvite = async () => {
//     try {
//       const newInvite = { user_email: email, role, sent_date: new Date().toISOString() };
//       const response = await axios.post(`http://127.0.0.1:8000/invites`, newInvite);
//       if (response.data) {
//         setInvites([...invites, response.data]); // Ensure new invite is added to state
//       } else {
//         console.error("Error sending invite, response data is invalid:", response);
//         setError("Error sending invite. Please try again later.");
//       }
//       onClose2();
//     } catch (error) {
//       console.error("Error sending invite:", error);
//       setError("Error sending invite. Please try again later.");
//     }
//   };

//   const onOpenModal = (index) => {
//     setIndex(index);
//     onOpen1();
//   };
  
//   const filteredInvites = invites.filter(invite => {

//     return (
//       invite.user_email.toLowerCase().includes(query.toLowerCase()) ||
//       invite.role.toLowerCase().includes(query.toLowerCase()) ||
//       (invite.sent_date && invite.sent_date.toLowerCase().includes(query.toLowerCase()))
//     );
//   });

//   return (
//     <div className="px-20 py-20">
//       <Modal isOpen={isOpen1} onClose={onClose1} initialFocusRef={initialRef} finalFocusRef={finalRef}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Delete Invitation</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             Do you really want to delete the Invitation?
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleDelete}>Yes</Button>
//             <Button variant="ghost" onClick={onClose1}>Close</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       <Modal isOpen={isOpen2} onClose={onClose2} initialFocusRef={initialRef} finalFocusRef={finalRef}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Send Invite</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <FormLabel>Email</FormLabel>
//               <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Role</FormLabel>
//               <Select value={role} onChange={(e) => setRole(e.target.value)} placeholder="Select role">
//                 <option value="Quality assurance">Quality assurance</option>
//                 <option value="Developer">Developer</option>
//               </Select>
//             </FormControl>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={handleSendInvite}>Send Invite</Button>
//             <Button onClick={onClose2}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       <div>
//         <h1 className="py-5 text-xl leading-tight font-bold text-gray-500">Invitations</h1>
//       </div>

//       <div className="flex flex-row space-x-5 py-5">
//         <div className="basis-2/4">
//           <InputGroup>
//             <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.600" />} />
//             <Input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
//           </InputGroup>
//         </div>
//         <div className="basis-1/4">
//           <Button className="w-full" colorScheme="blue" variant="outline">Search</Button>
//         </div>
//         <div className="basis-1/4">
//           <Button onClick={onOpen2} className="w-full" colorScheme="blue">Send Invitation</Button>
//         </div>
//       </div>

//       <div className="overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll h-64">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="sticky top-0 bg-white">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
//               <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredInvites.length > 0 && filteredInvites.map((invite, index) => (
//               <tr key={index} className={index % 2 === 0 ? "even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" : "odd:bg-white odd:dark:bg-gray-900 border-b dark:border-gray-700"}>
//                 <td className="px-6 py-4 whitespace-nowrap dark:text-white">{invite.user_email}</td>
//                 <td className="px-6 py-4">{invite.role}</td>
//                 <td className="px-6 py-4">{invite.sent_date ? new Date(invite.sent_date).toLocaleString() : 'N/A'}</td>
//                 <td className="px-6 py-4">
//                   <div className="flex justify-end space-x-2">
//                     <button onClick={() => onOpenModal(index)} className="px-3 py-1 text-red-500 hover:text-red-600">Delete</button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default InviteTable;
