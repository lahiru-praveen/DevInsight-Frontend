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
  Spinner, // Import Spinner component for loading indication
  useToast,
  Tooltip
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
  const [inviteCount, setInviteCount] = useState(0);
  const toast = useToast();
 
  
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
      setInvites(response.data.invitations);
      setInviteCount(response.data.invitations.length);}
      
    catch (error) {
      console.error("Error fetching invite table:", error);
      setError("Error fetching invite table. Please try again later.");
    }
  };


  
  
  useEffect(() => {
    
  
    fetchInviteTable();
  }, [adminEmail]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/delete-invite/${invites[index]._id.$oid}`);
      setInvites(invites.filter((inv, idx) => idx !== index));
      onClose1();
      toast({
        title: "Action Completed.",
        description: "Invite deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchInviteTable();
    } catch (error) {
      console.error("Error deleting invite:", error);
      toast({
        title: "Action Failed.",
        description: "Error deleting invite. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      
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
        await fetchInviteTable(); // Call fetchInviteTable to refresh the table
        onClose2();
        toast({
          title: "Invite sent.",
          description: "The invite has been sent successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("Error sending invite, response data is invalid:", response);
        toast({
          title: "Invite not sent.",
          description: "Error sending invite. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
  
    } catch (error) {
      console.error("Error sending invite:", error);
      toast({
        title: "Invite not sent.",
        description: "Error sending invite. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
        toast({
          title: "Invite resent.",
          description: "The invite resent successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("Error resending invite:", response);
        toast({
          title: "Invite not resent.",
          description: "Error resending invite. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        
      }
    } catch (error) {
      console.error("Error resending invite:", error);
      toast({
        title: "Invite not resent.",
        description: "Error resending invite. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoadingModal(false); // Hide loading modal
    }
    fetchInviteTable();
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

      <div className="flex">
      <h1 className=" text-xl leading-tight font-bold text-gray-500">Invitations</h1>
      <Tooltip hasArrow label='Number of invitations' bg='blue.200' placement='bottom'>
      <h1 className="text-xl leading-tight font-bold text-gray-500 ml-4 bg-blue-100 px-2 rounded">{inviteCount}</h1></Tooltip>
    </div>


      <div className="flex flex-row space-x-5 py-5">
        <div className="basis-3/4">
          <Tooltip hasArrow label='Search invitations' bg='blue.200' placement='bottom'>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.600" />} />
            <Input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </InputGroup>
          </Tooltip>
        </div>
        
        <div className="basis-1/4">
        <Tooltip hasArrow label='Send invitations' bg='blue.200' placement='bottom'>
          <Button onClick={onOpen2} className="w-full" colorScheme="blue">Send Invitation</Button></Tooltip>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll h-64">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="sticky top-0 bg-gray-200">
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
                    <Tooltip hasArrow label='Delete the invitation' bg='blue.200' placement='bottom'>
                    <Button onClick={() => onOpenModal(index)} colorScheme='red' size='sm' variant='outline'>Delete</Button></Tooltip>
                    
                    <Tooltip hasArrow label='Resend the invitation' bg='blue.200' placement='bottom'>
                    <Button onClick={() => handleResendInvite(invite._id.$oid)} colorScheme='blue' size='sm' variant='outline'>Resend</Button></Tooltip>
                    {/* <Tooltip hasArrow label='Resend the invitation' bg='blue.200' placement='bottom'>
                    <button onClick={() => handleResendInvite(invite._id.$oid)} className="px-3 py-1 text-blue-500 hover:text-blue-600">Resend</button></Tooltip> */}
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




