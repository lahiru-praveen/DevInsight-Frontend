import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const InviteTable = () => {
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [invites, setInvites] = useState([]); // Ensure invites is initialized as an empty array
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [query, setQuery] = useState("");
  const organization_email = 'devinsight@gmail.com';

  useEffect(() => {
    const fetchInviteTable = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/get-invitations?organization_email=${organization_email}`);
        console.log("Fetched data:", response.data); // Debug response data
        setInvites(response.data);
        
      }catch (error) {
        console.error("Error fetching invite table:", error);
        setError("Error fetching invite table. Please try again later.");
      }
    };

    fetchInviteTable();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/invites/${invites[index]._id}`);
      setInvites(invites.filter((inv, idx) => idx !== index));
      onClose1();
    } catch (error) {
      console.error("Error deleting invite:", error);
      setError("Error deleting invite. Please try again later.");
    }
  };

  const handleSendInvite = async () => {
    try {
      const newInvite = { user_email: email, role, sent_date: new Date().toISOString() };
      const response = await axios.post(`http://127.0.0.1:8000/invites`, newInvite);
      if (response.data) {
        setInvites([...invites, response.data]); // Ensure new invite is added to state
      } else {
        console.error("Error sending invite, response data is invalid:", response);
        setError("Error sending invite. Please try again later.");
      }
      onClose2();
    } catch (error) {
      console.error("Error sending invite:", error);
      setError("Error sending invite. Please try again later.");
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

      <div>
        <h1 className="py-5 text-xl leading-tight font-bold text-gray-500">Invitations</h1>
      </div>

      <div className="flex flex-row space-x-5 py-5">
        <div className="basis-2/4">
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.600" />} />
            <Input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </InputGroup>
        </div>
        <div className="basis-1/4">
          <Button className="w-full" colorScheme="blue" variant="outline">Search</Button>
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
