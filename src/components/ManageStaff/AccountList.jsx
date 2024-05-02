// import React from 'react';
// import { Select } from '@chakra-ui/react'
// import { Input, InputGroup, InputLeftElement, InputRightAddon} from '@chakra-ui/react';
// import { Search2Icon } from "@chakra-ui/icons";
// import { Button, ButtonGroup } from '@chakra-ui/react'
// import  pp  from '../../assets/pp.jpeg';
// import React, { useState, useEffect } from "react";
// import axios from "axios";




// const MyComponent = () => {
//     const [activeMembers, setActiveMembers] = useState([]);
//     useEffect(() => {
//         const fetchActiveMembers = async () => {
//           try {
//             const response = await axios.get("http://127.0.0.1:8001/active-members");
//             console.log("Response data:", response.data);
//             setActiveMembers(response.data);
//           } catch (error) {
            
//             console.error('Error fetching active members:', error);
//           }
//         };
    
//         fetchActiveMembers();
//       }, []);

    
//   return (
//     <div className='px-20 py-5 '>
//         <h1 className="py-5 text-xl leading-tight font-bold text-gray-500">
//             Staff
//         </h1>
//         <div className='flex flex-row space-x-5 py-5'>
//             <div className='basis-1/4'>
//             <Select placeholder='Select option'>
//             <option value='option1'>Option 1</option>
//             <option value='option2'>Option 2</option>
//             <option value='option3'>Option 3</option>
//             </Select>
//             </div>

//             <div className='basis-2/4'>
//             <InputGroup>
//             <InputLeftElement children={<Search2Icon color="gray.600"/>} />
//             <Input
//                 placeholder="Search..."
//                 />
//             {/* <InputRightAddon>
//             <Button borderLeftRadius={0} borderRightRadius={3.3}>
//                 Search
//             </Button>
//             </InputRightAddon>     */}


//             </InputGroup>
//             </div>
//             <div className='basis-1/4'>
//             <Button className='w-full' colorScheme='blue'>Search</Button>
//             </div>

//         </div>
        
//     <div className="w-full overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
   
//    <div className="flow-root w">
//         <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center">
//                     <div className="flex-shrink-0">
//                         <img className="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                             Neil Sims
//                         </p>
//                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             email@windster.com
//                         </p>
//                     </div>
//                     <Button colorScheme='blue' size='xs'>
//                         Edit Role
//                     </Button>
//                 </div>
//             </li>
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center ">
//                     <div className="flex-shrink-0">
//                     <img className="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                             Bonnie Green
//                         </p>
//                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             email@windster.com
//                         </p>
//                     </div>
//                     <Button colorScheme='blue' size='xs'>
//                         Edit Role
//                     </Button>
//                 </div>
//             </li>
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center">
//                     <div className="flex-shrink-0">
//                     <img className="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                             Michael Gough
//                         </p>
//                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             email@windster.com
//                         </p>
//                     </div>
//                     <Button colorScheme='blue' size='xs'>
//                         Edit Role
//                     </Button>
//                 </div>
//             </li>
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center ">
//                     <div className="flex-shrink-0">
//                        <img className="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                             Lana Byrd
//                         </p>
//                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             email@windster.com
//                         </p>
//                     </div>
//                     <Button colorScheme='blue' size='xs'>
//                         Edit Role
//                     </Button>
//                 </div>
//             </li>
//             <li className="pt-3 pb-0 sm:pt-4">
//                 <div className="flex items-center ">
//                     <div className="flex-shrink-0">
//                     <img className="w-8 h-8 rounded-full" src={pp} alt="Neil image"/>
//                     </div>
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
//                             Thomes Lean
//                         </p>
//                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
//                             email@windster.com
//                         </p>
//                     </div>
//                     <Button colorScheme='blue' size='xs'>
//                         Edit Role
//                     </Button>
//                 </div>
//             </li>
//         </ul>
//    </div>
// </div>
// </div>

//   );
// };

// export default MyComponent;

/////working

import { Select } from '@chakra-ui/react'
import { Input, InputGroup, InputLeftElement, InputRightAddon} from '@chakra-ui/react';
import { Search2Icon } from "@chakra-ui/icons";
import { Button, ButtonGroup } from '@chakra-ui/react'
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
    useDisclosure
  } from '@chakra-ui/react';
import  pp  from '../../assets/pp.jpeg';
import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser"



const MyComponent = () => {
    const [activeMembers, setActiveMembers] = useState([]);
    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
    const [index, setIndex] = useState(null);
    const [error, setError] = useState(null);
    const [role, setRole] = useState("");
    
    
    useEffect(() => emailjs.init("PS5ghhKYxM1wwF0sO"), []);
    const handleAddInvite = async () => {
        try {
            // // Get the member whose role needs to be changed
            const memberToUpdate = activeMembers[index];
            
            // // Make a PUT request to your backend API to update the role
            // const response = await axios.put(`http://127.0.0.1:8001/active-members/${memberToUpdate.id}`, {
            //     role: role // Assuming your API expects the role to be updated
            // });

            // Update the active members state with the updated role
            setActiveMembers(prevMembers => {
                const updatedMembers = [...prevMembers];
                updatedMembers[index] = { ...memberToUpdate, role: role };
                activeMembers[index] = updatedMembers[index];
                return updatedMembers;
            });

            // Close the modal
            onClose();
        } catch (error) {
            console.error('Error updating role:', error);
            setError("Error resending invite. Please try again later.");
            // Handle error if needed
        }
        try {
            // Assuming there's an API endpoint for resending invites
            
            // Assuming the invite is updated with a new status or resent
            // You may want to fetch the updated invite after resending
            debugger
            await emailjs.send("service_pst9db1", "template_ef1od5r", {

              rolef: activeMembers[index].role,
              
              recipient: activeMembers[index].email
            });
            alert("Email successfully resent");
          } catch (error) {
            console.error("Error resending invite:", error);
            setError("Error resending invite. Please try again later.");
          }
        
    }  
    // const handleSendEmail = async (index) => {
    //     try {
    //       // Assuming there's an API endpoint for resending invites
          
    //       // Assuming the invite is updated with a new status or resent
    //       // You may want to fetch the updated invite after resending
    //       await emailjs.send("service_pst9db1", "template_bq195h8", {
    //         rolef: member[index].role,
    //         recipient: member[index].email
    //       });
    //       alert("Email successfully resent");
    //     } catch (error) {
    //       console.error("Error resending invite:", error);
    //       setError("Error resending invite. Please try again later.");
    //     }
    //   };
    useEffect(() => {
        const fetchActiveMembers = async () => {
          try {
            const response = await axios.get("http://127.0.0.1:8001/active-members");
            console.log("Response data:", response.data);
            setActiveMembers(response.data);
          } catch (error) {
            console.error('Error fetching active members:', error);
          }
        };
    
        fetchActiveMembers();
    }, []);
    const onOpenModal = (index) => {
        setIndex(index);
        onOpen();
      }

      
    
    


    return (

        
        <div className='px-20 py-5 '>
            <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Select role"
              >
                <option value="Quality assurance">Quality assurance</option>
                <option value="Developer">Developer</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddInvite}>
              Change
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            <h1 className="py-5 text-xl leading-tight font-bold text-gray-500">
                Active Members
            </h1>
            <div className='flex flex-row space-x-5 py-5'>
                <div className='basis-1/4'>
                    <Select placeholder='Select option'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </div>
                <div className='basis-2/4'>
                    <InputGroup>
                        <InputLeftElement children={<Search2Icon color="gray.600"/>} />
                        <Input placeholder="Search..." />
                    </InputGroup>
                </div>
                <div className='basis-1/4'>
                    <Button className='w-full' colorScheme='blue'>Search</Button>
                </div>
            </div>
            <div className="w-full overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flow-root w">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {activeMembers.map((member, index) => (
                            <li key={index} className="py-3 sm:py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={pp} alt={member.name} />
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {member.name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {member.email}
                                        </p>
                                    </div>
                                    <Button onClick={() => onOpenModal(index)} colorScheme='blue' size='xs'>
                                    {member.role}
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;