// // import  { useState } from 'react';
// // import PropTypes from 'prop-types';
// // import { items } from "../../components/QAE/UserRequestsData.jsx";
// // import NavBar from "../../components/QAE/NavBar.jsx";
// //
// // function QAEHelpRequests() {
// //     const [sortedItems, setSortedItems] = useState([...items]);
// //     // const [sortBy, setSortBy] = useState(null);
// //     const [deleteIndex, setDeleteIndex] = useState(null); // Step 1: State variable to store the index of the item to be deleted
// //
// //     const handleSort = (sortBy) => {
// //         let sorted;
// //         if (sortBy === 'date') {
// //             sorted = [...sortedItems].sort((a, b) => new Date(a.date) - new Date(b.date));
// //         } else if (sortBy === 'type') {
// //             sorted = [...sortedItems].sort((a, b) => a.type.localeCompare(b.type));
// //         } else {
// //             sorted = [...items];
// //         }
// //         setSortedItems(sorted);
// //         // setSortBy(sortBy);
// //     };
// //
// //     const handleDelete = (index) => {
// //         // Step 3: Open confirmation dialog
// //         setDeleteIndex(index);
// //         setShowPopup(true);
// //     };
// //
// //     const confirmDelete = () => {
// //         // Step 4: Delete item and close confirmation dialog
// //         const updatedItems = [...sortedItems];
// //         updatedItems.splice(deleteIndex, 1);
// //         setSortedItems(updatedItems);
// //         setShowPopup(false);
// //     };
// //
// //     const cancelDelete = () => {
// //         // Step 5: Cancel deletion and close confirmation dialog
// //         setDeleteIndex(null);
// //         setShowPopup(false);
// //     };
// //
// //     const [showPopup, setShowPopup] = useState(false); // Step 2: State variable to control confirmation dialog visibility
// //
// //     return (
// //         <div className="font-roboto">
// //             <NavBar/>
// //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// //             <div className=" text-right text-2xl pt-5 pr-10">
// //                 <select onChange={(e) => handleSort(e.target.value)}>
// //                     <option value="date">Sort by Date</option>
// //                     <option value="type">Sort by Type</option>
// //                     <option value="null">Reset</option>
// //                 </select>
// //             </div>
// //             <div className="p-3 mx-10 text-2xl mt-20 font-inter">
// //                 <div className="flex w-full text-2xl items-center justify-between">
// //                     <div className="w-1/4 text-left pl-10"><p>Request</p></div>
// //                     <div className="w-1/4 text-left"><p>Description</p></div>
// //                     <div className="w-1/6 text-left"><p>Title</p></div>
// //                     <div className="w-1/4 text-left"><p>Status</p></div>
// //                     <div className="w-1/4 text-left"><p>Date</p></div>
// //                     <div className="text-white">
// //                         <p>Delete
// //                         </p>
// //                     </div>
// //                     <div className="px-5">
// //                     </div>
// //                     <div className="text-white "><p><a
// //                         href="/qcp">Open</a></p></div>
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
// //                             <div className=" text-left border bg-red-500 rounded-lg px-5 py-1 text-white">
// //                                 <p>
// //                                     <button onClick={() => handleDelete(index)}>Delete</button>
// //                                 </p>
// //                             </div>
// //                             <div className="px-5">
// //                             </div>
// //                             <div className=" text-left border bg-blue-500 rounded-lg px-4 py-1 text-white"><p><a
// //                                 href="/qcp">Open</a></p></div>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //             {/* Step 6: Confirmation dialog  */}
// //             {showPopup && (
// //                 <div
// //                     className="fixed top-0 left-0 w-full h-full text-2xl flex justify-center items-center bg-black bg-opacity-50 z-50">
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
// // import { useState } from 'react';
// // import PropTypes from 'prop-types';
// // import { items } from "../../components/QAE/UserRequestsData.jsx";
// // import NavBar from "../../components/QAE/NavBar.jsx";
// //
// // function UserHelpRequests() {
// //     const [sortedItems, setSortedItems] = useState([...items]);
// //     const [searchQuery, setSearchQuery] = useState('');
// //     const [setSortBy] = useState(null);
// //     const [deleteIndex, setDeleteIndex] = useState(null);
// //     const [showPopup, setShowPopup] = useState(false);
// //
// //     const handleSort = (sortBy) => {
// //         let sorted;
// //         if (sortBy === 'date') {
// //             sorted = [...sortedItems].sort((a, b) => new Date(a.date) - new Date(b.date));
// //         } else if (sortBy === 'type') {
// //             sorted = [...sortedItems].sort((a, b) => a.type.localeCompare(b.type));
// //         } else {
// //             sorted = [...items];
// //         }
// //         setSortedItems(sorted);
// //         setSortBy(sortBy);
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
// //     const filteredItems = sortedItems.filter(item =>
// //         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.date.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //
// //     return (
// //         <div className="font-roboto">
// //             <NavBar/>
// //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// //             <div className=" text-right text-2xl pt-5 pr-10">
// //                 <select onChange={(e) => handleSort(e.target.value)}>
// //                     <option value="date">Sort by Date</option>
// //                     <option value="type">Sort by Type</option>
// //                     <option value="null">Reset</option>
// //                 </select>
// //             </div>
// //             <input
// //                 type="text"
// //                 placeholder="Search..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="p-2 m-4 border border-gray-300 rounded-md"
// //             />
// //             <div>
// //                 {filteredItems.map((item, index) => (
// //                     <div key={index} className="bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left">
// //                         <div className="flex w-full text-2xl items-center justify-between">
// //                             <div className="w-1/4 text-left pl-10"><p>{item.id}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.title}</p></div>
// //                             <div className="w-1/6 text-left"><p>{item.description}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.status}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.date}</p></div>
// //                             <div className=" text-left border bg-red-500 rounded-lg px-5 py-1 text-white">
// //                                 <p>
// //                                     <button onClick={() => handleDelete(index)}>Delete</button>
// //                                 </p>
// //                             </div>
// //                             <div className=" text-left border bg-blue-500 rounded-lg px-4 py-1 text-white"><p><a href="/qcp">Open</a></p></div>
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
// // UserHelpRequests.propTypes = {
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
// // export default UserHelpRequests;
// //
// // import { useState, useEffect } from 'react';
// // import NavBar from "../../components/QAE/NavBar.jsx";
// //
// // function UserHelpRequests() {
// //     const [sortedItems, setSortedItems] = useState([]);
// //     const [searchQuery, setSearchQuery] = useState('');
// //     const [setSortBy] = useState(null);
// //     const [deleteIndex, setDeleteIndex] = useState(null);
// //     const [showPopup, setShowPopup] = useState(false);
// //
// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const response = await fetch('/api/get/');
// //                 const data = await response.json();
// //                 setSortedItems(data);
// //             } catch (error) {
// //                 console.error('Error fetching data:', error);
// //             }
// //         };
// //
// //         fetchData();
// //     }, []); // Fetch data only once on component mount
// //
// //     const handleSort = (sortBy) => {
// //         let sorted;
// //         if (sortBy === 'date') {
// //             sorted = [...sortedItems].sort((a, b) => new Date(a.date) - new Date(b.date));
// //         } else if (sortBy === 'type') {
// //             sorted = [...sortedItems].sort((a, b) => a.type.localeCompare(b.type));
// //         } else {
// //             sorted = [...sortedItems];
// //         }
// //         setSortedItems(sorted);
// //         setSortBy(sortBy);
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
// //     const filteredItems = sortedItems.filter(item =>
// //         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.date.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //
// //     return (
// //         <div className="font-roboto">
// //             <NavBar/>
// //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// //             <div className=" text-right text-2xl pt-5 pr-10">
// //                 <select onChange={(e) => handleSort(e.target.value)}>
// //                     <option value="date">Sort by Date</option>
// //                     <option value="type">Sort by Type</option>
// //                     <option value="null">Reset</option>
// //                 </select>
// //             </div>
// //             <input
// //                 type="text"
// //                 placeholder="Search..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="p-2 m-4 border border-gray-300 rounded-md"
// //             />
// //             <div>
// //                 {filteredItems.map((item, index) => (
// //                     <div key={index} className="bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left">
// //                         <div className="flex w-full text-2xl items-center justify-between">
// //                             <div className="w-1/4 text-left pl-10"><p>{item.id}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.title}</p></div>
// //                             <div className="w-1/6 text-left"><p>{item.description}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.status}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.date}</p></div>
// //                             <div className=" text-left border bg-red-500 rounded-lg px-5 py-1 text-white">
// //                                 <p>
// //                                     <button onClick={() => handleDelete(index)}>Delete</button>
// //                                 </p>
// //                             </div>
// //                             <div className=" text-left border bg-blue-500 rounded-lg px-4 py-1 text-white"><p><a href="/qcp">Open</a></p></div>
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
// // export default UserHelpRequests;
// // import { useState, useEffect } from 'react';
// // import NavBar from "../../components/QAE/NavBar.jsx";
// //
// // function UserHelpRequests() {
// //     const [sortedItems, setSortedItems] = useState([]);
// //     const [searchQuery, setSearchQuery] = useState('');
// //     const [setSortBy] = useState(null);
// //     const [deleteIndex, setDeleteIndex] = useState(null);
// //     const [showPopup, setShowPopup] = useState(false);
// //
// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const response = await fetch('/api/get/');
// //                 const data = await response.json();
// //                 setSortedItems(data);
// //             } catch (error) {
// //                 console.error('Error fetching data:', error);
// //             }
// //         };
// //
// //         fetchData();
// //     }, []); // Fetch data only once on component mount
// //
// //     const handleSort = (sortBy) => {
// //         let sorted;
// //         if (sortBy === 'date') {
// //             sorted = [...sortedItems].sort((a, b) => new Date(a.date) - new Date(b.date));
// //         } else if (sortBy === 'type') {
// //             sorted = [...sortedItems].sort((a, b) => a.type.localeCompare(b.type));
// //         } else {
// //             sorted = [...sortedItems];
// //         }
// //         setSortedItems(sorted);
// //         setSortBy(sortBy);
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
// //     const filteredItems = sortedItems.filter(item =>
// //         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.date.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //
// //     return (
// //         <div className="font-roboto">
// //             <NavBar/>
// //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// //             <div className=" text-right text-2xl pt-5 pr-10">
// //                 <select onChange={(e) => handleSort(e.target.value)}>
// //                     <option value="date">Sort by Date</option>
// //                     <option value="type">Sort by Type</option>
// //                     <option value="null">Reset</option>
// //                 </select>
// //             </div>
// //             <input
// //                 type="text"
// //                 placeholder="Search..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="p-2 m-4 border border-gray-300 rounded-md"
// //             />
// //             <div>
// //                 {filteredItems.map((item, index) => (
// //                     <div key={index} className="bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left">
// //                         <div className="flex w-full text-2xl items-center justify-between">
// //                             <div className="w-1/4 text-left pl-10"><p>{item.id}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.title}</p></div>
// //                             <div className="w-1/6 text-left"><p>{item.description}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.status}</p></div>
// //                             <div className="w-1/4 text-left"><p>{item.date}</p></div>
// //                             <div className=" text-left border bg-red-500 rounded-lg px-5 py-1 text-white">
// //                                 <p>
// //                                     <button onClick={() => handleDelete(index)}>Delete</button>
// //                                 </p>
// //                             </div>
// //                             <div className=" text-left border bg-blue-500 rounded-lg px-4 py-1 text-white"><p><a href="/qcp">Open</a></p></div>
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
// // export default UserHelpRequests;
// // import { useState, useEffect } from 'react';
// // import NavBar from "../../components/QAE/NavBar.jsx";
// //
// // function UserHelpRequests() {
// //     const [sortedItems, setSortedItems] = useState([]);
// //     const [searchQuery, setSearchQuery] = useState('');
// //     const [sortBy, setSortBy] = useState(null); // Corrected the useState usage
// //     const [deleteIndex, setDeleteIndex] = useState(null);
// //     const [showPopup, setShowPopup] = useState(false);
// //
// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const response = await fetch('/api/get/');
// //                 if (!response.ok) {
// //                     throw new Error('Network response was not ok');
// //                 }
// //                 const data = await response.json();
// //                 console.log('Fetched data:', data); // Debugging log
// //                 setSortedItems(data);
// //             } catch (error) {
// //                 console.error('Error fetching data:', error);
// //             }
// //         };
// //
// //         fetchData();
// //     }, []); // Fetch data only once on component mount
// //
// //     const handleSort = (sortBy) => {
// //         let sorted;
// //         if (sortBy === 'date') {
// //             sorted = [...sortedItems].sort((a, b) => new Date(a.date) - new Date(b.date));
// //         } else if (sortBy === 'type') {
// //             sorted = [...sortedItems].sort((a, b) => a.type.localeCompare(b.type));
// //         } else {
// //             sorted = [...sortedItems];
// //         }
// //         setSortedItems(sorted);
// //         setSortBy(sortBy);
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
// //     const filteredItems = sortedItems.filter(item =>
// //         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.date.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //
// //     return (
// //         <div className="font-roboto">
// //             <NavBar />
// //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// //             <div className="text-right text-2xl pt-5 pr-10">
// //                 <select onChange={(e) => handleSort(e.target.value)}>
// //                     <option value="date">Sort by Date</option>
// //                     <option value="type">Sort by Type</option>
// //                     <option value="null">Reset</option>
// //                 </select>
// //             </div>
// //             <input
// //                 type="text"
// //                 placeholder="Search..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="p-2 m-4 border border-gray-300 rounded-md"
// //             />
// //             <div>
// //                 {filteredItems.length === 0 && (
// //                     <div className="text-center text-xl text-gray-500">
// //                         No matching requests found.
// //                     </div>
// //                 )}
// //                 {filteredItems.map((item, index) => (
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
// //                             <div className="text-left border bg-blue-500 rounded-lg px-4 py-1 text-white">
// //                                 <a href="/qcp">Open</a>
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
// // export default UserHelpRequests;
// // import React, { useState, useEffect } from 'react';
// // import NavBar from "../../components/QAE/NavBar.jsx";
// //
// // function UserHelpRequests({ location }) {
// //     const [sortedItems, setSortedItems] = useState([]);
// //     const [searchQuery, setSearchQuery] = useState('');
// //     const [sortBy, setSortBy] = useState(null);
// //     const [deleteIndex, setDeleteIndex] = useState(null);
// //     const [showPopup, setShowPopup] = useState(false);
// //     const { submittedText } = location.state || {}; // Access submittedText from props
// //
// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const response = await fetch('/api/get/');
// //                 if (!response.ok) {
// //                     throw new Error('Network response was not ok');
// //                 }
// //                 const data = await response.json();
// //                 setSortedItems(data);
// //             } catch (error) {
// //                 console.error('Error fetching data:', error);
// //             }
// //         };
// //
// //         fetchData();
// //     }, []);
// //
// //     const handleSort = (sortBy) => {
// //         let sorted;
// //         if (sortBy === 'date') {
// //             sorted = [...sortedItems].sort((a, b) => new Date(a.date) - new Date(b.date));
// //         } else if (sortBy === 'type') {
// //             sorted = [...sortedItems].sort((a, b) => a.type.localeCompare(b.type));
// //         } else {
// //             sorted = [...sortedItems];
// //         }
// //         setSortedItems(sorted);
// //         setSortBy(sortBy);
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
// //     const filteredItems = sortedItems.filter(item =>
// //         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         item.date.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //
// //     return (
// //         <div className="font-roboto">
// //             <NavBar />
// //             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
// //             <div className="text-right text-2xl pt-5 pr-10">
// //                 <select onChange={(e) => handleSort(e.target.value)}>
// //                     <option value="date">Sort by Date</option>
// //                     <option value="type">Sort by Type</option>
// //                     <option value="null">Reset</option>
// //                 </select>
// //             </div>
// //             <input
// //                 type="text"
// //                 placeholder="Search..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="p-2 m-4 border border-gray-300 rounded-md"
// //             />
// //             <div>
// //                 {filteredItems.map((item, index) => (
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
// //                             <div className="text-left border bg-blue-500 rounded-lg px-4 py-1 text-white">
// //                                 <a href="/qcp">Open</a>
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
// // export default UserHelpRequests;
// import React, { useState, useEffect } from 'react';
// import NavBar from "../../components/QAE/NavBar.jsx";
//
// function UserHelpRequests({ location }) {
//     const [items, setItems] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [deleteIndex, setDeleteIndex] = useState(null);
//     const [showPopup, setShowPopup] = useState(false);
//     const { submittedText } = location.state || {}; // Access submittedText from props
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('/api/get/');
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setItems(data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     const handleDelete = (index) => {
//         setDeleteIndex(index);
//         setShowPopup(true);
//     };
//
//     const confirmDelete = async () => {
//         const updatedItems = [...items];
//         const itemId = updatedItems[deleteIndex]._id;
//         try {
//             // Send a DELETE request to the server to delete the item
//             await fetch(`/api/delete/${itemId}`, {
//                 method: 'DELETE',
//             });
//             // Remove the item from the state
//             updatedItems.splice(deleteIndex, 1);
//             setItems(updatedItems);
//             setShowPopup(false);
//         } catch (error) {
//             console.error('Error deleting item:', error);
//         }
//     };
//
//     const cancelDelete = () => {
//         setDeleteIndex(null);
//         setShowPopup(false);
//     };
//
//     const filteredItems = items.filter(item =>
//         item._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.response_text.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//
//     return (
//         <div className="font-roboto">
//             <NavBar />
//             <div className="text-5xl font-bold mr-10 pl-10 pt-10"><p>Help Desk</p></div>
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="p-2 m-4 border border-gray-300 rounded-md"
//             />
//             <div>
//                 {filteredItems.map((item, index) => (
//                     <div key={index} className="bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left">
//                         <div className="flex w-full text-2xl items-center justify-between">
//                             <div className="w-1/2 text-left pl-10"><p>ID: {item._id}</p></div>
//                             <div className="w-1/2 text-left"><p>Response: {item.response_text}</p></div>
//                             <div className="text-left border bg-red-500 rounded-lg px-5 py-1 text-white">
//                                 <button onClick={() => handleDelete(index)}>Delete</button>
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
//
// export default UserHelpRequests;
// import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
// import { Tooltip } from '@chakra-ui/react'
// import {SearchIcon} from "@chakra-ui/icons";
//
// function UserHelpRequests(){
//     return(
//         <div>
//             <NavBarUser button4={false} button2={false} button3={false} button1={false}/>
//             <div className="mt-10 ml-8 text-2xl">
//                 <Tooltip isDisabled>
//                     <SearchIcon />
//                 </Tooltip>
//                 <input
//                     className="shadow appearance-none border rounded w-50 h-10 ml-5 py-2 px-3 text-gray-700 leading-tight
//                                         focus:outline-none focus:shadow-outline"
//                     id="request"
//                     type="text"
//                     placeholder="Search the requests"
//                 />
//             </div>
//
//                          <div className="p-3 mx-10 text-2xl mt-20 font-inter">
//                              <div className="flex w-full text-2xl items-center justify-between">
//                                  <div className="w-1/4 text-left pl-10"><p>Project Name</p></div>
//                                  <div className="w-1/4 text-left"><p>File Name</p></div>
//                                  {/*<div className="w-1/6 text-left"><p>Title</p></div>*/}
//                                  <div className="w-1/4 text-left"><p>File Name</p></div>
//                                  <div className="w-1/4 text-left"><p>Status</p></div>
//                                  <div className="w-1/6 text-left"><p></p></div>
//                                  <div className="w-1/4 text-left flex relative">
//                                      <p>Date</p>
//                                      {/*<button onClick={() => setShowDropdown(!showDropdown)} className="ml-2 bg-gray-300 p-1 rounded">*/}
//                                      {/*    ▼*/}
//                                      {/*</button>*/}
//                                      {/*//              {showDropdown && (*/}
//                                      {/*//                             <div className="absolute bg-white border rounded mt-2">*/}
//                                      {/*//                                 <button onClick={() => handleSort('asc')} className="block px-4 py-2 text-left">Ascending</button>*/}
//                                      {/*//                                 <button onClick={() => handleSort('desc')} className="block px-4 py-2 text-left">Descending</button>*/}
//                                      {/*//                             </div>*/}
//                                      {/*//                         )}*/}
//                                      {/*//                     </div>*/}
//                                      <div className="text-white"><p>Delete</p></div>
//                                      <div className="px-5"></div>
//                                      <div className="text-white"><p><a href="/qcp">View</a></p></div>
//                                  </div>
//                              </div>
//                          </div>
//         </div>
//     )
// }
//
// export default UserHelpRequests;
import { useState, useEffect } from 'react';
import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
import { Tooltip } from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";

function UserHelpRequests() {
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('/api/responses')
            .then(response => response.json())
            .then(setRequests)  // Directly set the state without using an intermediary variable
            .catch(error => console.error('Error fetching responses:', error));
    }, []);

    const filteredRequests = requests.filter(request =>
        request.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <NavBarUser button4={false} button2={false} button3={false} button1={false} />
            <div className="mt-10 ml-8 text-2xl">
                <Tooltip isDisabled>
                    <SearchIcon />
                </Tooltip>
                <input
                    className="shadow appearance-none border rounded w-50 h-10 ml-5 py-2 px-3 text-gray-700 leading-tight
                               focus:outline-none focus:shadow-outline"
                    id="request"
                    type="text"
                    placeholder="Search the requests"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="p-3 mx-10 text-2xl mt-20 font-inter">
                <div className="flex w-full text-2xl items-center justify-between">
                    <div className="w-1/4 text-left pl-10"><p>Project Name</p></div>
                    <div className="w-1/4 text-left"><p>File Name</p></div>
                    <div className="w-1/4 text-left"><p>Status</p></div>
                    <div className="w-1/4 text-left flex relative">
                        <p>Date</p>
                    </div>
                    <div className="w-1/4 text-left"><p>Actions</p></div>
                </div>
                {filteredRequests.map((request, index) => (
                    <div key={index} className="flex w-full items-center justify-between mt-5">
                        <div className="w-1/4 text-left pl-10"><p>{request.projectName}</p></div>
                        <div className="w-1/4 text-left"><p>{request.fileName}</p></div>
                        <div className="w-1/4 text-left"><p>{request.status}</p></div>
                        <div className="w-1/4 text-left"><p>{new Date(request.date).toLocaleDateString()}</p></div>
                        <div className="w-1/4 text-left">
                            <button className="text-white bg-red-500 px-2 py-1 rounded" onClick={() => handleDelete(request.id)}>Delete</button>
                            <button className="text-white bg-blue-500 px-2 py-1 rounded ml-2"><a href="/qcp">View</a></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    function handleDelete(id) {
        fetch(`/responses/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                // Update the UI after deletion
                setRequests(requests.filter(request => request.id !== id));
            })
            .catch(error => console.error('Error deleting response:', error));
    }
}

export default UserHelpRequests;
