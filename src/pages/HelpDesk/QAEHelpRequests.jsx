// // // import { useState } from 'react';
// // // import PropTypes from 'prop-types';
// // // import { items } from "../../components/HelpDesk/QAERequestsData.jsx";
// // // import NavBar from "../../components/HelpDesk/NavBar.jsx";
// // //
// // // function QAEHelpRequests() {
// // //     const [expandedRow, setExpandedRow] = useState(null);
// // //
// // //     const handleRowClick = (index) => {
// // //         setExpandedRow(expandedRow === index ? null : index);
// // //     };
// // //
// // //     return (
// // //         <div>
// // //             <NavBar/>
// // //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// // //             <div className="p-3 mx-10 mt-20 font-inter">
// // //                 <div className="flex w-full items-center justify-between">
// // //                     <div className="w-1/4 text-left pl-10"><p>Request</p></div>
// // //                     <div className="w-1/4 text-left">Request</div>
// // //                     <div className="w-1/6 text-left">Request</div>
// // //                     <div className="w-1/4 text-left">Request</div>
// // //
// // //                 </div>
// // //             </div>
// // //             <div>
// // //                 {items.map((item, index) => (
// // //                     <div key={index}
// // //                          className={`bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left ${expandedRow === index ?
// // //                              'bg-blue-200 text-black border-y-15 border-x-15 rounded-lg' : ''}`}
// // //                          onClick={() => handleRowClick(index)}>
// // //
// // //                         <div className="flex w-full items-center justify-between">
// // //                             <div className="w-1/4 text-left pl-10"><p>{item.id}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.description}</p></div>
// // //                             <div className="w-1/6 text-left"><p>{item.title}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.status}</p></div>
// // //                             <div className=" text-left border bg-red-500 rounded-lg px-2 py-1 text-white"><p>Delete</p>
// // //                             </div>
// // //                             <div className=" text-left border bg-blue-500 rounded-lg px-2 py-1 text-white"><p><a
// // //                                 href="/qcp">Open</a></p>
// // //                             </div>
// // //                         </div>
// // //
// // //                     </div>
// // //                 ))}
// // //         </div>
// // //         </div>
// // //     );
// // // }
// // //
// // // QAEHelpRequests.propTypes = {
// // //     items: PropTypes.arrayOf(
// // //         PropTypes.shape({
// // //             id: PropTypes.string.isRequired,
// // //             title: PropTypes.string.isRequired,
// // //             description: PropTypes.string.isRequired,
// // //             status: PropTypes.string.isRequired,
// // //         })
// // //     ).isRequired,
// // // };
// // //
// // // export default QAEHelpRequests;
// // //
// // // import { useState, useEffect } from 'react';
// // // import PropTypes from 'prop-types';
// // // import NavBar from "../../components/HelpDesk/NavBar.jsx";
// // // import { items } from "../../components/HelpDesk/QAERequestsData.jsx";
// // //
// // // function QAEHelpRequests() {
// // //     const [sortedItems, setSortedItems] = useState([]);
// // //
// // //     useEffect(() => {
// // //         // Sort items by date and type
// // //         const sorted = items.sort((a, b) => {
// // //             // Convert dates to Date objects for comparison
// // //             const dateA = new Date(a.date);
// // //             const dateB = new Date(b.date);
// // //
// // //             // If dates are not equal, sort by date
// // //             if (dateA.getTime() !== dateB.getTime()) {
// // //                 return dateA.getTime() - dateB.getTime();
// // //             }
// // //             // If dates are equal, sort by type
// // //             return a.type.localeCompare(b.type);
// // //         });
// // //         setSortedItems(sorted);
// // //     }, []);
// // //
// // //     // const [expandedRow, setExpandedRow] = useState(null);
// // //     //
// // //     // const handleRowClick = (index) => {
// // //     //     setExpandedRow(expandedRow === index ? null : index);
// // //     // };
// // //
// // //     return (
// // //         <div>
// // //             <NavBar />
// // //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// // //             <div className="p-3 mx-10 mt-20 font-inter">
// // //                 <div className="flex w-full items-center justify-between">
// // //                     <div className="w-1/4 text-left pl-10"><p>Request</p></div>
// // //                     <div className="w-1/4 text-left">Request</div>
// // //                     <div className="w-1/6 text-left">Request</div>
// // //                     <div className="w-1/4 text-left">Request</div>
// // //                 </div>
// // //             </div>
// // //             <div>
// // //                 {sortedItems.map((item, index) => (
// // //                     <div key={index}
// // //                          className={`bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left`}
// // //                       >
// // //
// // //                         <div className="flex w-full items-center justify-between">
// // //                             <div className="w-1/4 text-left pl-10"><p>{item.id}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.description}</p></div>
// // //                             <div className="w-1/6 text-left"><p>{item.title}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.status}</p></div>
// // //                             <div className=" text-left border bg-red-500 rounded-lg px-2 py-1 text-white"><p>Delete</p>
// // //                             </div>
// // //                             <div className=" text-left border bg-blue-500 rounded-lg px-2 py-1 text-white"><p><a
// // //                                 href="/qcp">Open</a></p>
// // //                             </div>
// // //                         </div>
// // //
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     );
// // // }
// // //
// // // QAEHelpRequests.propTypes = {
// // //     items: PropTypes.arrayOf(
// // //         PropTypes.shape({
// // //             id: PropTypes.string.isRequired,
// // //             title: PropTypes.string.isRequired,
// // //             description: PropTypes.string.isRequired,
// // //             status: PropTypes.string.isRequired,
// // //             date: PropTypes.string.isRequired,
// // //             type: PropTypes.string.isRequired,
// // //         })
// // //     ).isRequired,
// // // };
// //
// // // /export default QAEHelpRequests;import React, { useState } from 'react';
// // // import PropTypes from 'prop-types';
// // // import { items } from "../../components/QAE/QAERequestsData.jsx";
// // // import NavBar from "../../components/QAE/NavBar.jsx";
// // //
// // // function QAEHelpRequests() {
// // //     const [sortedItems, setSortedItems] = useState([...items]);
// // //     const [sortBy, setSortBy] = useState(null);
// // //     const [deleteIndex, setDeleteIndex] = useState(null); // Step 1: State variable to store the index of the item to be deleted
// // //
// // //     const handleSort = (sortBy) => {
// // //         let sorted;
// // //         if (sortBy === 'date') {
// // //             sorted = [...sortedItems].sort((a, b) => new Date(a.date) - new Date(b.date));
// // //         } else if (sortBy === 'type') {
// // //             sorted = [...sortedItems].sort((a, b) => a.type.localeCompare(b.type));
// // //         } else {
// // //             sorted = [...items];
// // //         }
// // //         setSortedItems(sorted);
// // //         setSortBy(sortBy);
// // //     };
// // //
// // //     const handleDelete = (index) => {
// // //         // Step 3: Open confirmation dialog
// // //         setDeleteIndex(index);
// // //         setShowPopup(true);
// // //     };
// // //
// // //     const confirmDelete = () => {
// // //         // Step 4: Delete item and close confirmation dialog
// // //         const updatedItems = [...sortedItems];
// // //         updatedItems.splice(deleteIndex, 1);
// // //         setSortedItems(updatedItems);
// // //         setShowPopup(false);
// // //     };
// // //
// // //     const cancelDelete = () => {
// // //         // Step 5: Cancel deletion and close confirmation dialog
// // //         setDeleteIndex(null);
// // //         setShowPopup(false);
// // //     };
// // //
// // //     const [showPopup, setShowPopup] = useState(false); // Step 2: State variable to control confirmation dialog visibility
// // //
// // //     return (
// // //         <div className="font-roboto">
// // //             <NavBar/>
// // //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// // //             <div className=" text-right text-2xl pt-5 pr-10">
// // //                 <select onChange={(e) => handleSort(e.target.value)}>
// // //                     <option value="date">Sort by Date</option>
// // //                     <option value="type">Sort by Type</option>
// // //                     <option value="null">Reset</option>
// // //                 </select>
// // //             </div>
// // //             <div className="p-3 mx-10 text-2xl mt-20 font-inter">
// // //                 <div className="flex w-full items-center justify-between">
// // //                     <div className="w-1/5 text-left pl-10"><p>Request</p></div>
// // //                     <div className="w-1/5 text-left">Description</div>
// // //                     <div className="w-1/5 text-left">Request</div>
// // //                     <div className="w-1/5 text-left">Status</div>
// // //                     <div className="w-1/5 text-left">Date of submission</div>
// // //                 </div>
// // //             </div>
// // //             <div>
// // //                 {sortedItems.map((item, index) => (
// // //                     <div key={index} className="bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left">
// // //                         <div className="flex w-full text-2xl items-center justify-between">
// // //                             <div className="w-1/4 text-left pl-10"><p>{item.id}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.title}</p></div>
// // //                             <div className="w-1/6 text-left"><p>{item.description}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.status}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.date}</p></div>
// // //                             <div className=" text-left border bg-red-500 rounded-lg px-2 py-1 text-white">
// // //                                 <p>
// // //                                     <button onClick={() => handleDelete(index)}>Delete</button>
// // //                                 </p>
// // //                             </div>
// // //                             <div className=" text-left border bg-blue-500 rounded-lg px-2 py-1 text-white"><p><a href="/qcp">Open</a></p></div>
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //             {/* Step 6: Confirmation dialog */}
// // //             {showPopup && (
// // //                 <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
// // //                     <div className="bg-white rounded-lg shadow-lg p-6">
// // //                         <p>Are you sure you want to delete this item?</p>
// // //                         <div className="mt-4 flex justify-end">
// // //                             <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={confirmDelete}>Delete</button>
// // //                             <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelDelete}>Cancel</button>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // }
// // //
// // // QAEHelpRequests.propTypes = {
// // //     items: PropTypes.arrayOf(
// // //         PropTypes.shape({
// // //             id: PropTypes.string.isRequired,
// // //             title: PropTypes.string.isRequired,
// // //             description: PropTypes.string.isRequired,
// // //             status: PropTypes.string.isRequired,
// // //             date: PropTypes.string.isRequired,
// // //             type: PropTypes.string.isRequired,
// // //         })
// // //     ).isRequired,
// // // };
// // //
// // // export default QAEHelpRequests;
// // // import  { useState } from 'react';
// // // import PropTypes from 'prop-types';
// // // import { items } from "../../components/QAE/QAERequestsData.jsx";
// // // import NavBar from "../../components/QAE/NavBar.jsx";
// // //
// // // function QAEHelpRequests() {
// // //     const [sortedItems, setSortedItems] = useState([...items]);
// // //     // const [sortBy, setSortBy] = useState(null);
// // //     const [deleteIndex, setDeleteIndex] = useState(null); // Step 1: State variable to store the index of the item to be deleted
// // //
// // //     const handleSort = (sortBy) => {
// // //         let sorted;
// // //         if (sortBy === 'date') {
// // //             sorted = [...sortedItems].sort((a, b) => new Date(a.date) - new Date(b.date));
// // //         } else if (sortBy === 'type') {
// // //             sorted = [...sortedItems].sort((a, b) => a.type.localeCompare(b.type));
// // //         } else {
// // //             sorted = [...items];
// // //         }
// // //         setSortedItems(sorted);
// // //         // setSortBy(sortBy);
// // //     };
// // //
// // //     const handleDelete = (index) => {
// // //         // Step 3: Open confirmation dialog
// // //         setDeleteIndex(index);
// // //         setShowPopup(true);
// // //     };
// // //
// // //     const confirmDelete = () => {
// // //         // Step 4: Delete item and close confirmation dialog
// // //         const updatedItems = [...sortedItems];
// // //         updatedItems.splice(deleteIndex, 1);
// // //         setSortedItems(updatedItems);
// // //         setShowPopup(false);
// // //     };
// // //
// // //     const cancelDelete = () => {
// // //         // Step 5: Cancel deletion and close confirmation dialog
// // //         setDeleteIndex(null);
// // //         setShowPopup(false);
// // //     };
// // //
// // //     const [showPopup, setShowPopup] = useState(false); // Step 2: State variable to control confirmation dialog visibility
// // //
// // //     return (
// // //         <div className="font-roboto">
// // //             <NavBar/>
// // //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// // //             <div className=" text-right text-2xl pt-5 pr-10">
// // //                 <select onChange={(e) => handleSort(e.target.value)}>
// // //                     <option value="date">Sort by Date</option>
// // //                     <option value="type">Sort by Type</option>
// // //                     <option value="null">Reset</option>
// // //                 </select>
// // //             </div>
// // //             <div className="p-3 mx-10 text-2xl mt-20 font-inter">
// // //                 <div className="flex w-full text-2xl items-center justify-between">
// // //                     <div className="w-1/4 text-left pl-10"><p>Request</p></div>
// // //                     <div className="w-1/4 text-left"><p>Description</p></div>
// // //                     <div className="w-1/6 text-left"><p>Title</p></div>
// // //                     <div className="w-1/4 text-left"><p>Status</p></div>
// // //                     <div className="w-1/4 text-left"><p>Date</p></div>
// // //                     <div className="text-white">
// // //                         <p>Delete
// // //                         </p>
// // //                     </div>
// // //                     <div className="px-5">
// // //                     </div>
// // //                     <div className="text-white "><p><a
// // //                         href="/qcp">Open</a></p></div>
// // //                 </div>
// // //             </div>
// // //             <div>
// // //                 {sortedItems.map((item, index) => (
// // //                     <div key={index} className="bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left">
// // //                         <div className="flex w-full text-2xl items-center justify-between">
// // //                             <div className="w-1/4 text-left pl-10"><p>{item.id}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.title}</p></div>
// // //                             <div className="w-1/6 text-left"><p>{item.description}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.status}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.date}</p></div>
// // //                             <div className=" text-left border bg-red-500 rounded-lg px-5 py-1 text-white">
// // //                                 <p>
// // //                                     <button onClick={() => handleDelete(index)}>Delete</button>
// // //                                 </p>
// // //                             </div>
// // //                             <div className="px-5">
// // //                             </div>
// // //                             <div className=" text-left border bg-blue-500 rounded-lg px-4 py-1 text-white"><p><a
// // //                                 href="/qcp">View</a></p></div>
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //             {/* Step 6: Confirmation dialog  */}
// // //             {showPopup && (
// // //                 <div
// // //                     className="fixed top-0 left-0 w-full h-full text-2xl flex justify-center items-center bg-black bg-opacity-50 z-50">
// // //                 <div className="bg-white rounded-lg shadow-lg p-6">
// // //                         <p>Are you sure you want to delete this request?</p>
// // //                         <div className="mt-4 flex justify-end">
// // //                             <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={confirmDelete}>Delete</button>
// // //                             <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelDelete}>Cancel</button>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // }
// // //
// // // QAEHelpRequests.propTypes = {
// // //     items: PropTypes.arrayOf(
// // //         PropTypes.shape({
// // //             id: PropTypes.string.isRequired,
// // //             title: PropTypes.string.isRequired,
// // //             description: PropTypes.string.isRequired,
// // //             status: PropTypes.string.isRequired,
// // //             date: PropTypes.string.isRequired,
// // //             type: PropTypes.string.isRequired,
// // //         })
// // //     ).isRequired,
// // // };
// // //
// // // export default QAEHelpRequests;
// // //
// // // import React, { useState } from 'react';
// // // import PropTypes from 'prop-types';
// // // import { items } from "../../components/QAE/QAERequestsData.jsx";
// // // import NavBar from "../../components/QAE/NavBar.jsx";
// // //
// // // function QAEHelpRequests() {
// // //     const [sortedItems, setSortedItems] = useState([...items]);
// // //     const [deleteIndex, setDeleteIndex] = useState(null);
// // //     const [showPopup, setShowPopup] = useState(false);
// // //
// // //
// // //
// // //     const handleDelete = (index) => {
// // //         setDeleteIndex(index);
// // //         setShowPopup(true);
// // //     };
// // //
// // //     const confirmDelete = () => {
// // //         const updatedItems = [...sortedItems];
// // //         updatedItems.splice(deleteIndex, 1);
// // //         setSortedItems(updatedItems);
// // //         setShowPopup(false);
// // //     };
// // //
// // //     const cancelDelete = () => {
// // //         setDeleteIndex(null);
// // //         setShowPopup(false);
// // //     };
// // //
// // //     return (
// // //         <div className="font-roboto">
// // //             <NavBar />
// // //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// // //
// // //             <div className="p-3 mx-10 text-2xl mt-20 font-inter">
// // //                 <div className="flex w-full text-2xl items-center justify-between">
// // //                     <div className="w-1/4 text-left pl-10"><p>Request</p></div>
// // //                     <div className="w-1/4 text-left"><p>Description</p></div>
// // //                     <div className="w-1/6 text-left"><p>Title</p></div>
// // //                     <div className="w-1/4 text-left"><p>Status</p></div>
// // //                     <div className="w-1/4 text-left"><p>Date</p></div>
// // //                     <div className="text-white"><p>Delete</p></div>
// // //                     <div className="px-5"></div>
// // //                     <div className="text-white"><p><a href="/qcp">Open</a></p></div>
// // //                 </div>
// // //             </div>
// // //             <div>
// // //                 {sortedItems.map((item, index) => (
// // //                     <div key={index} className="bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left">
// // //                         <div className="flex w-full text-2xl items-center justify-between">
// // //                             <div className="w-1/4 text-left pl-10"><p>{item.id}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.title}</p></div>
// // //                             <div className="w-1/6 text-left"><p>{item.description}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.status}</p></div>
// // //                             <div className="w-1/4 text-left"><p>{item.date}</p></div>
// // //                             <div className="text-left border bg-red-500 rounded-lg px-5 py-1 text-white">
// // //                                 <button onClick={() => handleDelete(index)}>Delete</button>
// // //                             </div>
// // //                             <div className="px-5"></div>
// // //                             <div className="text-left border bg-blue-500 rounded-lg px-4 py-1 text-white">
// // //                                 <a href="/qcp">View</a>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //             {showPopup && (
// // //                 <div className="fixed top-0 left-0 w-full h-full text-2xl flex justify-center items-center bg-black bg-opacity-50 z-50">
// // //                     <div className="bg-white rounded-lg shadow-lg p-6">
// // //                         <p>Are you sure you want to delete this request?</p>
// // //                         <div className="mt-4 flex justify-end">
// // //                             <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={confirmDelete}>Delete</button>
// // //                             <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelDelete}>Cancel</button>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // }
// // //
// // // QAEHelpRequests.propTypes = {
// // //     items: PropTypes.arrayOf(
// // //         PropTypes.shape({
// // //             id: PropTypes.string.isRequired,
// // //             title: PropTypes.string.isRequired,
// // //             description: PropTypes.string.isRequired,
// // //             status: PropTypes.string.isRequired,
// // //             date: PropTypes.string.isRequired,
// // //             type: PropTypes.string.isRequired,
// // //         })
// // //     ).isRequired,
// // // };
// // //
// // // export default QAEHelpRequests;
// // import React, { useState } from 'react';
// // import PropTypes from 'prop-types';
// // import { items } from "../../components/QAE/QAERequestsData.jsx";
// // import NavBar from "../../components/QAE/NavBar.jsx";
// //
// // function QAEHelpRequests() {
// //     const [sortedItems, setSortedItems] = useState([...items]);
// //     const [deleteIndex, setDeleteIndex] = useState(null);
// //     const [showPopup, setShowPopup] = useState(false);
// //     const [sortOrder, setSortOrder] = useState('asc'); // State to manage sort order
// //
// //     const handleSort = (sortBy) => {
// //         let sorted;
// //         if (sortBy === 'date') {
// //             if (sortOrder === 'asc') {
// //                 sorted = [...sortedItems].sort((a, b) => new Date(a.date) - new Date(b.date));
// //                 setSortOrder('desc');
// //             } else {
// //                 sorted = [...sortedItems].sort((a, b) => new Date(b.date) - new Date(a.date));
// //                 setSortOrder('asc');
// //             }
// //         } else {
// //             sorted = [...items];
// //         }
// //         setSortedItems(sorted);
// //     };
// //
// //     const handleDelete = (index) => {
// //         setDeleteIndex(index);
// //         setShowPopup(true);
// //     };
// //
// //     const confirmDelete = () => {
// //         const updatedItems = [...sortedItems];
// //         updatedItems.splice(deleteIndex, 1);
// //         setSortedItems(updatedItems);
// //         setShowPopup(false);
// //     };
// //
// //     const cancelDelete = () => {
// //         setDeleteIndex(null);
// //         setShowPopup(false);
// //     };
// //
// //     return (
// //         <div className="font-roboto">
// //             <NavBar />
// //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// //             <div className="text-right text-2xl pt-5 pr-10">
// //                 <select onChange={(e) => handleSort(e.target.value)}>
// //                     <option value="date">Sort by Date (Asc/Desc)</option>
// //                     <option value="null">Reset</option>
// //                 </select>
// //             </div>
// //             <div className="p-3 mx-10 text-2xl mt-20 font-inter">
// //                 <div className="flex w-full text-2xl items-center justify-between">
// //                     <div className="w-1/4 text-left pl-10"><p>Request</p></div>
// //                     <div className="w-1/4 text-left"><p>Description</p></div>
// //                     <div className="w-1/6 text-left"><p>Title</p></div>
// //                     <div className="w-1/4 text-left"><p>Status</p></div>
// //                     <div className="w-1/4 text-left flex">
// //                         <p>Date</p>
// //                         <button onClick={() => handleSort('date')} className="ml-2 bg-gray-300 p-1 rounded">
// //                             {sortOrder === 'asc' ? 'Asc' : 'Desc'}
// //                         </button>
// //                     </div>
// //                     <div className="text-white"><p>Delete</p></div>
// //                     <div className="px-5"></div>
// //                     <div className="text-white"><p><a href="/qcp">Open</a></p></div>
// //                 </div>
// //             </div>
// //             <div>
// //                 {sortedItems.map((item, index) => (
// //                     <div key={index} className="bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left">
// //                         <div className="flex w-full text-2xl items-center justify-between">
// //                             <div className="w-1/4 text-left pl-10"><p>{item.id}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.title}</p></div>
// //                             <div className="w-1/6 text-left"><p>{item.description}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.status}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.date}</p></div>
// //                             <div className="text-left border bg-red-500 rounded-lg px-5 py-1 text-white">
// //                                 <button onClick={() => handleDelete(index)}>Delete</button>
// //                             </div>
// //                             <div className="px-5"></div>
// //                             <div className="text-left border bg-blue-500 rounded-lg px-4 py-1 text-white">
// //                                 <a href="/qcp">View</a>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //             {showPopup && (
// //                 <div className="fixed top-0 left-0 w-full h-full text-2xl flex justify-center items-center bg-black bg-opacity-50 z-50">
// //                     <div className="bg-white rounded-lg shadow-lg p-6">
// //                         <p>Are you sure you want to delete this request?</p>
// //                         <div className="mt-4 flex justify-end">
// //                             <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={confirmDelete}>Delete</button>
// //                             <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelDelete}>Cancel</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
// //
// // QAEHelpRequests.propTypes = {
// //     items: PropTypes.arrayOf(
// //         PropTypes.shape({
// //             id: PropTypes.string.isRequired,
// //             title: PropTypes.string.isRequired,
// //             description: PropTypes.string.isRequired,
// //             status: PropTypes.string.isRequired,
// //             date: PropTypes.string.isRequired,
// //             type: PropTypes.string.isRequired,
// //         })
// //     ).isRequired,
// // };
// //
// // export default QAEHelpRequests;
// // import React, { useState } from 'react';
// // import PropTypes from 'prop-types';
// // import { items } from "../../components/QAE/QAERequestsData.jsx";
// // import NavBar from "../../components/QAE/NavBar.jsx";
// //
// // function QAEHelpRequests() {
// //     const [sortedItems, setSortedItems] = useState([...items]);
// //     const [deleteIndex, setDeleteIndex] = useState(null);
// //     const [showPopup, setShowPopup] = useState(false);
// //     const [sortOrder, setSortOrder] = useState('asc');
// //     const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
// //
// //     const handleSort = (order) => {
// //         let sorted;
// //         if (order === 'asc') {
// //             sorted = [...sortedItems].sort((a, b) => new Date(a.date) - new Date(b.date));
// //         } else {
// //             sorted = [...sortedItems].sort((a, b) => new Date(b.date) - new Date(a.date));
// //         }
// //         setSortOrder(order);
// //         setSortedItems(sorted);
// //         setShowDropdown(false); // Close dropdown after sorting
// //     };
// //
// //     const handleDelete = (index) => {
// //         setDeleteIndex(index);
// //         setShowPopup(true);
// //     };
// //
// //     const confirmDelete = () => {
// //         const updatedItems = [...sortedItems];
// //         updatedItems.splice(deleteIndex, 1);
// //         setSortedItems(updatedItems);
// //         setShowPopup(false);
// //     };
// //
// //     const cancelDelete = () => {
// //         setDeleteIndex(null);
// //         setShowPopup(false);
// //     };
// //
// //     return (
// //         <div className="font-roboto">
// //             <NavBar />
// //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// //
// //             <div className="p-3 mx-10 text-2xl mt-20 font-inter">
// //                 <div className="flex w-full text-2xl items-center justify-between">
// //                     <div className="w-1/4 text-left pl-10"><p>Request</p></div>
// //                     <div className="w-1/4 text-left"><p>File Name</p></div>
// //                     {/*<div className="w-1/6 text-left"><p>Title</p></div>*/}
// //                     <div className="w-1/4 text-left"><p>Status</p></div>
// //                     <div className="w-1/6 text-left"><p></p></div>
// //                     <div className="w-1/4 text-left flex relative">
// //                         <p>Date</p>
// //                         <button onClick={() => setShowDropdown(!showDropdown)} className="ml-2 bg-gray-300 p-1 rounded">
// //                             ▼
// //                         </button>
// //                         {showDropdown && (
// //                             <div className="absolute bg-white border rounded mt-2">
// //                                 <button onClick={() => handleSort('asc')} className="block px-4 py-2 text-left">Ascending</button>
// //                                 <button onClick={() => handleSort('desc')} className="block px-4 py-2 text-left">Descending</button>
// //                             </div>
// //                         )}
// //                     </div>
// //                     <div className="text-white"><p>Delete</p></div>
// //                     <div className="px-5"></div>
// //                     <div className="text-white"><p><a href="/qcp">View</a></p></div>
// //                 </div>
// //             </div>
// //             <div>
// //                 {sortedItems.map((item, index) => (
// //                     <div key={index} className="bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left">
// //                         <div className="flex w-full text-2xl items-center justify-between">
// //                             <div className="w-1/4 text-left pl-10"><p>{item.id}</p></div>
// //                             {/*<div className="w-1/4 text-left"><p>{item.title}</p></div>*/}
// //                             <div className="w-1/6 text-left"><p>{item.description}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.status}</p></div>
// //                             <div className="w-1/4 text-left"><p className={`w-1 h-1 rounded-full 'bg-green-500' : 'bg-gray-500'}`}>
// //                             </p></div>
// //                             <div className="w-1/4 text-left"><p>{item.date}</p></div>
// //                             <div className="text-left border bg-red-500 rounded-lg px-5 py-1 text-white">
// //                                 <button onClick={() => handleDelete(index)}>Delete</button>
// //                             </div>
// //                             <div className="px-5"></div>
// //                             <div className="text-left border bg-blue-500 rounded-lg px-4 py-1 text-white">
// //                                 <a href="/qcp">View</a>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //             {showPopup && (
// //                 <div className="fixed top-0 left-0 w-full h-full text-2xl flex justify-center items-center bg-black bg-opacity-50 z-50">
// //                     <div className="bg-white rounded-lg shadow-lg p-6">
// //                         <p>Are you sure you want to delete this request?</p>
// //                         <div className="mt-4 flex justify-end">
// //                             <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={confirmDelete}>Delete</button>
// //                             <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelDelete}>Cancel</button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }
// //
// // QAEHelpRequests.propTypes = {
// //     items: PropTypes.arrayOf(
// //         PropTypes.shape({
// //             id: PropTypes.string.isRequired,
// //             title: PropTypes.string.isRequired,
// //             description: PropTypes.string.isRequired,
// //             status: PropTypes.string.isRequired,
// //             date: PropTypes.string.isRequired,
// //             type: PropTypes.string.isRequired,
// //         })
// //     ).isRequired,
// // };
// //
// // export default QAEHelpRequests;
// import React, { useState } from 'react';
// // import PropTypes from 'prop-types';
// // import { items } from "../../components/QAE/QAERequestsData.jsx";
// // import NavBar from "../../components/QAE/NavBar.jsx";
//
// function QAEHelpRequests() {
//     // const [sortedItems, setSortedItems] = useState([...items]);
//     const [deleteIndex, setDeleteIndex] = useState(null);
//     const [showPopup, setShowPopup] = useState(false);
//     const [sortOrder, setSortOrder] = useState('asc');
//     const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
//     const [searchQuery, setSearchQuery] = useState('');
//
//     const handleSort = (order) => {
//         let sorted;
//         if (order === 'asc') {
//             sorted = [...sortedItems].sort((a, b) => new Date(a.date) - new Date(b.date));
//         } else {
//             sorted = [...sortedItems].sort((a, b) => new Date(b.date) - new Date(a.date));
//         }
//         setSortOrder(order);
//         setSortedItems(sorted);
//         setShowDropdown(false); // Close dropdown after sorting
//     };
//
//     const handleDelete = (index) => {
//         setDeleteIndex(index);
//         setShowPopup(true);
//     };
//
//     const confirmDelete = () => {
//         const updatedItems = [...sortedItems];
//         updatedItems.splice(deleteIndex, 1);
//         setSortedItems(updatedItems);
//         setShowPopup(false);
//     };
//
//     const cancelDelete = () => {
//         setDeleteIndex(null);
//         setShowPopup(false);
//     };
//
//     const handleSearch = (e) => {
//         setSearchQuery(e.target.value);
//         // Filter sortedItems based on search query
//         const filteredItems = items.filter(item =>
//             item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
//             item.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
//             item.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
//             item.date.toLowerCase().includes(e.target.value.toLowerCase())
//         );
//         setSortedItems(filteredItems);
//     };
//
//     return (
//         <div className="font-roboto">
//             <NavBar />
//             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
//
//             <div className="p-3 mx-10 text-2xl mt-20 font-inter">
//                 <div className="flex w-full text-2xl items-center justify-between">
//                     <div className="w-1/4 text-left pl-10"><p>Request</p></div>
//                     <div className="w-1/4 text-left"><p>File Name</p></div>
//                     {/*<div className="w-1/6 text-left"><p>Title</p></div>*/}
//                     <div className="w-1/4 text-left"><p>Status</p></div>
//                     <div className="w-1/6 text-left"><p></p></div>
//                     <div className="w-1/4 text-left flex relative">
//                         <p>Date</p>
//                         <button onClick={() => setShowDropdown(!showDropdown)} className="ml-2 bg-gray-300 p-1 rounded">
//                             ▼
//                         </button>
//                         {showDropdown && (
//                             <div className="absolute bg-white border rounded mt-2">
//                                 <button onClick={() => handleSort('asc')} className="block px-4 py-2 text-left">Ascending</button>
//                                 <button onClick={() => handleSort('desc')} className="block px-4 py-2 text-left">Descending</button>
//                             </div>
//                         )}
//                     </div>
//                     <div className="text-white"><p>Delete</p></div>
//                     <div className="px-5"></div>
//                     <div className="text-white"><p><a href="/qcp">View</a></p></div>
//                 </div>
//             </div>
//             <div>
//                 {/* Add search bar */}
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     value={searchQuery}
//                     onChange={handleSearch}
//                     className="p-2 m-4 border border-gray-300 rounded-md"
//                 />
//                 {sortedItems.map((item, index) => (
//                     <div key={index} className="bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left">
//                         <div className="flex w-full text-2xl items-center justify-between">
//                             <div className="w-1/4 text-left pl-10"><p>{item.id}</p></div>
//                             {/*<div className="w-1/4 text-left"><p>{item.title}</p></div>*/}
//                             <div className="w-1/6 text-left"><p>{item.description}</p></div>
//                             <div className="w-1/4 text-left"><p>{item.status}</p></div>
//                             <div className="w-1/4 text-left"><p className={`w-1 h-1 rounded-full 'bg-green-500' : 'bg-gray-500'}`}>
//                             </p></div>
//                             <div className="w-1/4 text-left"><p>{item.date}</p></div>
//                             <div className="text-left border bg-red-500 rounded-lg px-5 py-1 text-white">
//                                 <button onClick={() => handleDelete(index)}>Delete</button>
//                             </div>
//                             <div className="px-5"></div>
//                             <div className="text-left border bg-blue-500 rounded-lg px-4 py-1 text-white">
//                                 <a href="/qcp">View</a>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             {showPopup && (
//                 <div className="fixed top-0 left-0 w-full h-full text-2xl flex justify-center items-center bg-black bg-opacity-50 z-50">
//                     <div className="bg-white rounded-lg shadow-lg p-6">
//                         <p>Are you sure you want to delete this request?</p>
//                         <div className="mt-4 flex justify-end">
//                             <button className="mr-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={confirmDelete}>Delete</button>
//                             <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={cancelDelete}>Cancel</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
// //
// // QAEHelpRequests.propTypes = {
// //     items: PropTypes.arrayOf(
// //         PropTypes.shape({
// //             id: PropTypes.string.isRequired,
// //             title: PropTypes.string.isRequired,
// //             description: PropTypes.string.isRequired,
// //             status: PropTypes.string.isRequired,
// //             date: PropTypes.string.isRequired,
// //             type: PropTypes.string.isRequired,
// //         })
// //     ).isRequired,
// // };
//
// export default QAEHelpRequests;

import NavBarQAE from "../../components/dashboard/NavBarQAE.jsx";
import { Tooltip } from '@chakra-ui/react'
import {SearchIcon} from "@chakra-ui/icons";

function QAEHelpRequests(){
    return(
        <div>
            <NavBarQAE/>
            <div className="mt-10 ml-8 text-3xl">
                <Tooltip isDisabled>
                    <SearchIcon />
                </Tooltip>
                <input
                    className="shadow appearance-none border rounded w-50 h-10 ml-5 py-2 px-3 text-gray-700 leading-tight
                                        focus:outline-none focus:shadow-outline"
                    id="request"
                    type="text"
                    placeholder="Search the requests"
                />
            </div>
        </div>
    )
}

export default QAEHelpRequests;