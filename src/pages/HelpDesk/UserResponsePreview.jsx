// import { useState } from 'react';
// import QAECPNav from "../../components/QAE/QAECPNav.jsx";
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
// import axios from 'axios';
//
// function UserResponsePreview() {
//     const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Step 1: State variable for modal visibility
//
//     // Function to handle button click
//     const handleButtonClick = () => {
//         // Step 2: Show confirmation modal
//         setShowConfirmationModal(true);
//         // Execute your additional function here
//         // For example:
//         // yourAdditionalFunction();
//     };
//
//     // Function to confirm submission
//     const confirmSubmission = async () => {
//         // Step 3: Perform submission logic here
//         try {
//             // Add your axios request here
//             console.log('Feedback submitted');
//             // Add any additional logic after successful feedback submission
//         } catch (error) {
//             console.error('Failed to submit feedback:', error);
//             // Log error details
//             console.error('Error details:', error.response);
//         }
//         // Step 4: Hide confirmation modal
//         setShowConfirmationModal(false);
//     };
//
//     // Function to cancel submission
//     const cancelSubmission = () => {
//         // Step 5: Hide confirmation modal
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
//         <div>
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
//                         How to add a variable inside the function
//                     </p>
//                     {/* Render the "Send Feedback" button */}
//                     <div
//                         className="mt-10 ml-80 flex items-center space-x-5 p-2 text-white justify-center w-40 rounded-lg bg-blue-500"
//                         onClick={handleButtonClick}
//                     >
//                         Send Feedback
//                     </div>
//
//                 </div>
//             </div>
//
//             {showConfirmationModal && (
//                 <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
//                     <div className="bg-white rounded-lg text-2xl shadow-lg p-8 w-100"> {/* Adjust the width here */}
//                         <p>Are you sure you want to submit?</p>
//                         <div className="mt-4 flex justify-end">
//                             <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={confirmSubmission}>Yes</button>
//                             <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelSubmission}>No</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//         </div>
//     );
// }
//
// export default UserResponsePreview;
//
// import { useState } from 'react';
// import QAECPNav from "../../components/QAE/QAECPNav.jsx";
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
// import axios from 'axios';
//
// function UserResponsePreview() {
//     const [selectedRating, setSelectedRating] = useState(0);
//     const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Step 1: State variable for modal visibility
//
//     // Function to handle star click
//     const handleStarClick = (rating) => {
//         setSelectedRating(rating);
//     };
//
//     // Function to handle button click
//     const handleButtonClick = () => {
//         // Check if a rating is selected
//         if (selectedRating === 0) {
//             alert("Please select a rating before submitting.");
//             return;
//         }
//         // Step 2: Show confirmation modal
//         setShowConfirmationModal(true);
//     };
//
//     // Function to confirm submission
//     const confirmSubmission = async () => {
//         // Step 3: Perform submission logic here
//         try {
//             // Submit the selected rating
//             console.log('Rating submitted:', selectedRating);
//             // Add any additional logic after successful submission
//         } catch (error) {
//             console.error('Failed to submit rating:', error);
//             // Log error details
//             console.error('Error details:', error.response);
//         }
//         // Step 4: Hide confirmation modal
//         setShowConfirmationModal(false);
//     };
//
//     // Function to cancel submission
//     const cancelSubmission = () => {
//         // Step 5: Hide confirmation modal
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
//     // Render stars based on the selected rating
//     const renderStars = () => {
//         const stars = [];
//         for (let i = 1; i <= 5; i++) {
//             stars.push(
//                 <span
//                     key={i}
//                     className={i <= selectedRating ? "text-yellow-500 cursor-pointer" : "text-gray-300 cursor-pointer"}
//                     onClick={() => handleStarClick(i)}
//                 >
//                     ★
//                 </span>
//             );
//         }
//         return stars;
//     };
//
//     return (
//         <div>
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
//                         How to add a variable inside the function
//                     </p>
//                     {/* Render the star rating */}
//                     <div className="mt-10 ml-80 flex items-center space-x-1 p-2 text-white justify-center w-40 rounded-lg bg-blue-500">
//                         {renderStars()}
//                     </div>
//
//                 </div>
//             </div>
//
//             {showConfirmationModal && (
//                 <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
//                     <div className="bg-white rounded-lg text-2xl shadow-lg p-8 w-100"> {/* Adjust the width here */}
//                         <p>Are you sure you want to submit?</p>
//                         <div className="mt-4 flex justify-end">
//                             <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={confirmSubmission}>Yes</button>
//                             <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelSubmission}>No</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//         </div>
//     );
// }
//
// export default UserResponsePreview;
// import { useState } from 'react';
// import QAECPNav from "../../components/QAE/QAECPNav.jsx";
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
// import axios from 'axios';
//
// function UserResponsePreview() {
//     const [isFeedbackClicked, setIsFeedbackClicked] = useState(false);
//     const [selectedRating, setSelectedRating] = useState(0);
//     const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Step 1: State variable for modal visibility
//
//     // Function to handle button click
//     const handleButtonClick = () => {
//         setIsFeedbackClicked(true);
//     };
//
//     // Function to handle star click
//     const handleStarClick = (rating) => {
//         setSelectedRating(rating);
//     };
//
//     // Function to confirm submission
//     const confirmSubmission = async () => {
//         // Step 3: Perform submission logic here
//         try {
//             // Submit the selected rating
//             console.log('Rating submitted:', selectedRating);
//             // Add any additional logic after successful submission
//         } catch (error) {
//             console.error('Failed to submit rating:', error);
//             // Log error details
//             console.error('Error details:', error.response);
//         }
//         // Step 4: Hide confirmation modal
//         setShowConfirmationModal(false);
//     };
//
//     // Function to cancel submission
//     const cancelSubmission = () => {
//         // Step 5: Hide confirmation modal
//         setShowConfirmationModal(false);
//     };
//
//     return (
//         <div>
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
//                                 {/* Render your code preview here */}
//                             </TabPanel>
//                             <TabPanel>
//                                 <p>Reviewed Code</p>
//                             </TabPanel>
//                         </TabPanels>
//                     </Tabs>
//                 </div>
//                 <div className="px-4 bg-gray-200 rounded-lg mx-4 py-4">
//                     <p>
//                         How to add a variable inside the function
//                     </p>
//                     {/* Render the text box or "Send Feedback" button based on visibility */}
//                     {!isFeedbackClicked ? (
//                         <div
//                             className="mt-10 ml-80 flex items-center space-x-5 p-2 text-white justify-center w-40 rounded-lg bg-blue-500"
//                             onClick={handleButtonClick}
//                         >
//                             Send FeedBack
//                         </div>
//                     ) : (
//                         <div className="mt-10 ml-80 flex items-center space-x-1 p-2 text-white justify-center w-40 rounded-lg bg-blue-500">
//                             {/* Render the star rating */}
//                             {[1, 2, 3, 4, 5].map((rating) => (
//                                 <span
//                                     key={rating}
//                                     className={rating <= selectedRating ? "text-yellow-500 cursor-pointer" : "text-gray-300 cursor-pointer"}
//                                     onClick={() => handleStarClick(rating)}
//                                 >
//                                     ★
//                                 </span>
//                             ))}
//                         </div>
//                     )}
//
//                 </div>
//             </div>
//
//             {showConfirmationModal && (
//                 <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
//                     <div className="bg-white rounded-lg text-2xl shadow-lg p-8 w-100"> {/* Adjust the width here */}
//                         <p>Are you sure you want to submit?</p>
//                         <div className="mt-4 flex justify-end">
//                             <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={confirmSubmission}>Yes</button>
//                             <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelSubmission}>No</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//
//         </div>
//     );
// }
//
// export default UserResponsePreview;
import { useState } from 'react';
import QAECPNav from "../../components/QAE/QAECPNav.jsx";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from 'axios';

function UserResponsePreview() {
    const [isFeedbackClicked, setIsFeedbackClicked] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Step 1: State variable for modal visibility

    // Function to handle button click
    const handleButtonClick = () => {
        setIsFeedbackClicked(true);
    };

    // Function to handle star click
    const handleStarClick = (rating) => {
        setSelectedRating(rating);
    };

    // Function to confirm submission
    const confirmSubmission = async () => {
        // Step 3: Perform submission logic here
        try {
            // Submit the selected rating
            console.log('Rating submitted:', selectedRating);
            // Add any additional logic after successful submission
        } catch (error) {
            console.error('Failed to submit rating:', error);
            // Log error details
            console.error('Error details:', error.response);
        }
        // Step 4: Hide confirmation modal
        setShowConfirmationModal(false);
    };

    // Function to cancel submission
    const cancelSubmission = () => {
        // Step 5: Hide confirmation modal
        setShowConfirmationModal(false);
    };

    // Function to handle star click and display confirmation modal
    const handleStarAndConfirmation = (rating) => {
        setSelectedRating(rating);
        setShowConfirmationModal(true);
    };

    return (
        <div>
            <QAECPNav />
            <div className="grid grid-cols-2 divide-x py-4 px-4 mx-4">
                <div className="bg-gray-200 rounded-lg ">
                    <Tabs variant="enclosed" colorScheme="blue" height={"1100"}>
                        <TabList>
                            <Tab>Preview</Tab>
                            <Tab>Review</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {/* Render your code preview here */}
                            </TabPanel>
                            <TabPanel>
                                <p>Reviewed Code</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
                <div className="px-4 bg-gray-200 rounded-lg mx-4 py-4">
                    <p>
                        How to add a variable inside the function
                    </p>
                    {/* Render the text box or "Send Feedback" button based on visibility */}
                    {!isFeedbackClicked ? (
                        <div
                            className="mt-10 ml-80 flex items-center space-x-5 p-2 text-white justify-center w-40 rounded-lg bg-blue-500"
                            onClick={handleButtonClick}
                        >
                            Send FeedBack
                        </div>
                    ) : (
                        <div className="mt-10 ml-80 flex items-center space-x-1 p-2 text-white justify-center w-40 rounded-lg bg-blue-500">
                            {/* Render the star rating */}
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <span
                                    key={rating}
                                    className={rating <= selectedRating ? "text-yellow-500 cursor-pointer" : "text-gray-300 cursor-pointer"}
                                    onClick={() => handleStarAndConfirmation(rating)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    )}

                </div>
            </div>

            {showConfirmationModal && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg text-2xl shadow-lg p-8 w-100"> {/* Adjust the width here */}
                        <p>Are you sure you want to submit?</p>
                        <div className="mt-4 flex justify-end">
                            <button className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                                    onClick={confirmSubmission}><a
                                href="/uhr">Yes</a></button>
                            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelSubmission}>No</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default UserResponsePreview;
