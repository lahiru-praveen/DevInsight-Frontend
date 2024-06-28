//
// import { useState } from 'react';
// import QAECPNav from "../../components/QAE/QAECPNav.jsx";
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
// import axios from 'axios';
//
// function AskHelp() {
//     const [typedText, setTypedText] = useState('');
//     const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//
// //     // Function to handle text box change
// //     const handleTextBoxChange = (event) => {
// //         setTypedText(event.target.value);
// //     };
// //
// //     // Function to handle form submit
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         // Show confirmation modal
//         setShowConfirmationModal(true);
//     };
//
//     // Function to confirm submission
//     const confirmSubmission = async () => {
//         try {
//             // Send a POST request to the server to save the typed text
//             const response = await axios.post(
//                 'http://localhost:8000/api/sam/',
//                 { "response_text": typedText },
//                 { headers: { 'Content-Type': 'application/json' } }
//             );
//             console.log('Response saved successfully:', response.data);
//             // Clear the input field after successful submission
//             setTypedText('');
//             // Close the confirmation modal
//             setShowConfirmationModal(false);
//         } catch (error) {
//             console.error('Failed to save response:', error);
//             // Log error details
//             console.error('Error details:', error.response);
//         }
//     };

//     // Function to cancel submission
//     const cancelSubmission = () => {
//         // Close the confirmation modal
//         setShowConfirmationModal(false);
//     };
//
//     // Sample code text
//     const codeText = `def divide(x, y):
//     try:
//         result = x / y
//     except ZeroDivisionError:
//         return "Error! Division by zero."
//     else:
//         return result
//
// # Handling invalid operation choice
// if operation_choice not in ('1', '2', '3', '4'):
//     print("Invalid input. Please choose a valid operation (1/2/3/4).")
//     continue`;
//
//     // Split the code text by newline characters
//     const codeLines = codeText.split('\n');
//
//     return (
//         <div className="text-2xl">
//             <QAECPNav />
//             <div className="grid grid-cols-2 divide-x py-4 px-4 mx-4">
//                 <div className="bg-gray-200 rounded-lg ">
//                     <Tabs variant="enclosed" colorScheme="blue" height={"1100"}>
//                         <TabList>
//                             <Tab>Preview</Tab>
//                             <Tab>Review</Tab>
//                         </TabList>
//                         <TabPanels>
//                             <TabPanel>
//                                 {/* Render each line of code in a separate <pre> element */}
//                                 {codeLines.map((line, index) => (
//                                     <pre key={index}>{line}</pre>
//                                 ))}
//                             </TabPanel>
//                             <TabPanel>
//                                 <p>Reviewed Code</p>
//                             </TabPanel>
//                         </TabPanels>
//                     </Tabs>
//                 </div>
//                 <div className="px-4 bg-gray-200 rounded-lg mx-4 py-4">
//                     <p>
//                         Type below the Request:
//                     </p>
//                     {/* Render the text box and submit button */}
//                     <form className="w-full" onSubmit={handleSubmit}>
//                         <div className="mb-8 mt-10 ">
//                             <input
//                                 className="shadow appearance-none border rounded w-full h-80 py-2 px-3 text-gray-700 leading-tight
//                                      focus:outline-none focus:shadow-outline"
//                                 id="response"
//                                 type="text"
//                                 placeholder="Enter The Request"
//                                 value={typedText}
//                                 onChange={handleTextBoxChange}
//                             />
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <button
//                                 className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                 type="submit"
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             {/* Confirmation modal */}
//             {showConfirmationModal && (
//                 <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
//                     <div className="bg-white rounded-lg text-2xl shadow-lg p-8 w-100">
//                         <p>Are you sure you want to submit?</p>
//                         <div className="mt-4 flex justify-end">
//                          <a href="/qhr">  <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={confirmSubmission}>Yes</button></a>
//                             <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelSubmission}>No</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
//
// export default AskHelp;
// import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
//
// function AskHelp({ codeContent, reviewContent }) {
//     return (
//         <div>
//             <NavBarUser />
//             <div className="grid grid-cols-2 divide-x py-4 px-4 mx-4">
//                 <div className="bg-gray-200 rounded-lg">
//                     <Tabs variant="enclosed" colorScheme="blue" height={"1100"}>
//                         <TabList>
//                             <Tab>Preview</Tab>
//                             <Tab>Review</Tab>
//                         </TabList>
//                         <TabPanels>
//                             <TabPanel>
//                                 <pre>{codeContent}</pre>
//                             </TabPanel>
//                             <TabPanel>
//                                 <pre>{reviewContent}</pre>
//                             </TabPanel>
//                         </TabPanels>
//                     </Tabs>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default AskHelp;
// import { useLocation } from 'react-router-dom';
// import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
//
// function AskHelp() {
//     const location = useLocation();
//     const { selectedFileContent,reviewContent } = location.state || {};
//
//     return (
//         <div>
//             <NavBarUser />
//             <div className="grid grid-cols-2 divide-x py-4 px-4 mx-4">
//                 <div className="bg-gray-200 rounded-lg">
//                     <Tabs variant="enclosed" colorScheme="blue" height={"1100"}>
//                         <TabList>
//                             <Tab>Preview</Tab>
//                             <Tab>Review</Tab>
//                         </TabList>
//                         <TabPanels>
//                             <TabPanel>
//                                 <pre>{selectedFileContent}</pre>
//                             </TabPanel>
//                             <TabPanel>
//                                 <pre>{reviewContent}</pre>
//                             </TabPanel>
//                         </TabPanels>
//                     </Tabs>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default AskHelp;
// import {useState} from "react";
// import { useLocation } from 'react-router-dom';
// import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
// import { Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react";
//
// function AskHelp() {
//     const location = useLocation();
//     const { code, review} = location.state || {};
//
//     const [typedText, setTypedText] = useState('');
//     const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//
//     // Function to handle text box change
//     const handleTextBoxChange = (event) => {
//         setTypedText(event.target.value);
//     };
//
//     // Function to handle form submit
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         // Show confirmation modal
//         setShowConfirmationModal(true);
//     };
//
//
//     return (
//         <div>
//             <NavBarUser />
//             <div className="grid grid-cols-2 divide-x py-4 px-4 mx-4">
//                 <div className="bg-gray-200 rounded-lg">
//                     <Tabs variant="enclosed" colorScheme="blue" height={"1100"}>
//                         <TabList>
//                             <Tab>Preview</Tab>
//                             <Tab>Review</Tab>
//                         </TabList>
//                         <TabPanels>
//                             <TabPanel>
//                                 {(code)}
//                             </TabPanel>
//                             <TabPanel>
//                                 {(review)}
//                             </TabPanel>
//                         </TabPanels>
//                     </Tabs>
//                 </div>
//                 <div className="px-4 bg-gray-200 rounded-lg mx-4 py-4">
//                   <div>
//                       <p> Type below the request:</p>
//                       <form className="w-full" onSubmit={handleSubmit}>
//                           <div className="mb-8 mt-10 ">
//                               <input
//                                   className="shadow appearance-none border rounded w-full h-30 py-2 px-3 text-gray-700 leading-tight
//                                                                 focus:outline-none focus:shadow-outline mb-3"
//                                   id="response"
//                                   type="text"
//                                   placeholder="Enter a subject for your request"
//                                   value={typedText}
//                                   onChange={handleTextBoxChange}
//                               />
//                               <input
//                                   className="shadow appearance-none border rounded w-full h-80 py-2 px-3 text-gray-700 leading-tight
//                                                                 focus:outline-none focus:shadow-outline"
//                                   id="response"
//                                   type="text"
//                                   placeholder="Enter the request"
//                                   value={typedText}
//                                   onChange={handleTextBoxChange}
//                               />
//                           </div>
//                           <div className="flex items-center justify-between">
//                               <button
//                                   className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                                   type="submit"
//                               >
//                                   Submit
//                               </button>
//                           </div>
//                       </form>
//                       {/* Confirmation modal */}
//                                    {showConfirmationModal && (
//                  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
//                      <div className="bg-white rounded-lg text-2xl shadow-lg p-8 w-100">
//                          <p>Are you sure you want to submit?</p>
//                          <div className="mt-4 flex justify-end">
//                           <a href="/qhr">  <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" >Yes</button></a>
//                              <a href="/ah"> <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" >No</button></a>
//                          </div>
//                      </div>
//                  </div>
//              )}
//                   </div>
//                 </div>
//             </div>
//
//         </div>
//     );
// }
//
// export default AskHelp;
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from 'axios';

function AskHelp() {
    const location = useLocation();
    const {   code, review } = location.state || {};

    const [subjectText, setSubjectText] = useState('');
    const [requestText, setRequestText] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle text box change
    const handleSubjectChange = (event) => {
        setSubjectText(event.target.value);
    };

    const handleRequestChange = (event) => {
        setRequestText(event.target.value);
    };

    // Function to handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!subjectText || !requestText) {
            setErrorMessage("Please fill in both the subject and the request to submit.");
            return;
        }
        // Hide error message and show confirmation modal
        setErrorMessage('');
        setShowConfirmationModal(true);
    };
    // Function to handle form submit
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     // Show confirmation modal
    //     setShowConfirmationModal(true);
    // };

    // // Function to confirm submission
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     // Show confirmation modal
    //     setShowConfirmationModal(true);
    // };

    // Function to confirm submission
    const confirmSubmission = async () => {
        try {
            // Send a POST request to the server to save the typed text
            const response = await axios.post(
                'http://localhost:8000/api/sam/',
                { "requestText": requestText },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log('Response saved successfully:', response.data);
            // Clear the input field after successful submission
            setRequestText('');
            // Close the confirmation modal
            setShowConfirmationModal(false);
        } catch (error) {
            console.error('Failed to save response:', error);
            // Log error details
            console.error('Error details:', error.response);
        }
    };


    return (
        <div>
            <NavBarUser />
            <div className="grid grid-cols-2 divide-x py-4 px-4 mx-4">
                <div className="bg-gray-200 rounded-lg">
                    <Tabs variant="enclosed" colorScheme="blue" height={"1100"}>
                        <TabList>
                            <Tab>Preview</Tab>
                            <Tab>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <pre>{code}</pre>
                            </TabPanel>
                            <TabPanel>
                                <pre>{review}</pre>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                <div className="px-4 bg-gray-200 rounded-lg mx-4 py-4">
                    <div>
                        <p>Type below the request:</p>
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="mb-8 mt-10">
                                <input
                                    className="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight
                                        focus:outline-none focus:shadow-outline mb-3"
                                    id="subject"
                                    type="text"
                                    placeholder="Enter a subject for your request"
                                    value={subjectText}
                                    onChange={handleSubjectChange}
                                />
                                <input
                                    className="shadow appearance-none border rounded w-full h-80 py-2 px-3 text-gray-700 leading-tight
                                        focus:outline-none focus:shadow-outline"
                                    id="request"
                                    type="text"
                                    placeholder="Enter the request"
                                    value={requestText}
                                    onChange={handleRequestChange}
                                />
                            </div>
                            {errorMessage && (
                                <div className="text-red-500 mb-4">
                                    {errorMessage}
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        {/* Confirmation modal */}
                        {showConfirmationModal && (
                            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white rounded-lg text-2xl shadow-lg p-8 w-100">
                                    <p>Are you sure you want to submit?</p>
                                    <div className="mt-4 flex justify-end">
                                        <a href="/uhr">
                                            <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={confirmSubmission}>
                                                Yes
                                            </button>
                                        </a>
                                        <a href="/ah">
                                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
                                                No
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AskHelp;
