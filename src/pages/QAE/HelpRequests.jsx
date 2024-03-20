// import PropTypes from 'prop-types';
// import {items} from "../../components/QAE/DataHelpRequests.jsx";// Importing the items array from data.js
// import NavBar from "../../components/QAE/NavBar.jsx";
//
// function HelpRequests() {
//     return (
//         <div>
//             <NavBar/>
//             <div className="p-5 mx-10 mt-20 font-inter">
//                 {items.map((items, index) => (
//                     <table
//                         key={index}
//                         className="w-full bg-gray-200 my-5 SectionList rounded-lg h-16 flex">
//                         <tbody>
//                         <tr>
//                             <td className="w-35 text-left px-8 py-4 hover:bg-black">{items.id}</td>
//                             <td className="w-50 text-left px-8 py-4">{items.title}</td>
//                             <td className="w-10 text-left px-8 py-4">{items.description}</td>
//                             <td className="w-5 text-left px-8 py-4">{items.status}</td>
//                         </tr>
//                         </tbody>
//                     </table>
//                 ))}
//             </div>        </div>
//     );
// }
//
// HelpRequests.propTypes = {
//     items: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             title: PropTypes.string.isRequired,
//             description: PropTypes.string.isRequired,
//             status: PropTypes.string.isRequired,
//         })
//     ).isRequired,
// };
//
// export default HelpRequests;

// import PropTypes from 'prop-types';
// import { items } from "../../components/QAE/DataHelpRequests.jsx";
// import NavBar from "../../components/QAE/NavBar.jsx";
//
// function HelpRequests() {
//     return (
//         <div>
//             <NavBar/>
//             <div className="p-5 mx-10 mt-20 font-inter">
//                 {items.map((item, index) => (
//                     <a key={index} href={`https://example.com/${item.id}`}>
//                         <table className="w-full bg-gray-200 my-5 SectionList rounded-lg h-16 flex">
//                             <tbody>
//                             <tr>
//                                 <td className="w-35 text-left px-8 py-4 hover:bg-black">{item.id}</td>
//                                 <td className="w-50 text-left px-8 py-4">{item.title}</td>
//                                 <td className="w-10 text-left px-8 py-4">{item.description}</td>
//                                 <td className="w-5 text-left px-8 py-4">{item.status}</td>
//                             </tr>
//                             </tbody>
//                         </table>
//                     </a>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// HelpRequests.propTypes = {
//     items: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             title: PropTypes.string.isRequired,
//             description: PropTypes.string.isRequired,
//             status: PropTypes.string.isRequired,
//         })
//     ).isRequired,
// };
//
// export default HelpRequests;
//
// import { useState } from 'react'; // Import useState hook for managing state
// import PropTypes from 'prop-types';
// import { items } from "../../components/QAE/DataHelpRequests.jsx";
// import NavBar from "../../components/QAE/NavBar.jsx";
//
// function HelpRequests() {
//     const [selectedRow, setSelectedRow] = useState(null); // State to track the selected row index
//
//     // Function to handle row click
//     const handleRowClick = (index) => {
//         setSelectedRow(index); // Set the selected row index
//         // Perform additional function here
//     };
//
//     return (
//         <div>
//             <NavBar/>
//             <div className="p-5 mx-10 mt-20 font-inter">
//                 {items.map((item, index) => (
//                     <div key={index}>
//                         <table
//                             className={`w-full bg-gray-200 my-5 SectionList rounded-lg h-16 flex ${selectedRow === index ? 'selected' : ''}`}
//                             onClick={() => handleRowClick(index)}>
//                             <tbody>
//                             <tr className={`${selectedRow === index ? 'bg-blue-200' : ''}`}>
//                                 <td className="w-35 text-left px-8 py-4 ">{item.id}</td>
//                                 <td className="w-50 text-left px-8 py-4">{item.title}</td>
//                                 <td className="w-10 text-left px-8 py-4">{item.description}</td>
//                                 <td className="w-5 text-left px-8 py-4">{item.status}</td>
//                             </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// HelpRequests.propTypes = {
//     items: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             title: PropTypes.string.isRequired,
//             description: PropTypes.string.isRequired,
//             status: PropTypes.string.isRequired,
//         })
//     ).isRequired,
// };
//
// export default HelpRequests;
// Import statements...
// import { useState } from 'react'; // Import useState hook for managing state
// import PropTypes from 'prop-types';
// import { items } from "../../components/QAE/DataHelpRequests.jsx";
// import NavBar from "../../components/QAE/NavBar.jsx";
//
// function HelpRequests() {
//     const [selectedRow, setSelectedRow] = useState(null); // State to track the selected row index
//
//     // Function to handle row click
//     const handleRowClick = (index) => {
//         setSelectedRow(index); // Set the selected row index
//         // Perform additional function here
//     };
//
//     return (
//         <div>
//             <NavBar/>
//             <div className="text-3xl mr-10"><p>Help Desk</p></div>
//             <div className="p-5 mx-10 mt-20 font-inter">
//                 {items.map((item, index) => (
//                     <div key={index}>
//                         <a key={index} href={`https://example.com/${item.id}`} className="block">
//                             <table className="w-full bg-gray-200 my-5 SectionList rounded-lg h-16 flex">
//                                 <tbody>
//                                 <tr className={`${selectedRow === index ? 'bg-blue-200' : ''}`} onClick={() => handleRowClick(index)}>
//                                     <td className="w-35 text-left px-8 py-4 hover:bg-black">{item.id}</td>
//                                     <td className="w-50 text-left px-8 py-4">{item.title}</td>
//                                     <td className="w-10 text-left px-8 py-4">{item.description}</td>
//                                     <td className="w-5 text-left px-8 py-4">{item.status}</td>
//                                 </tr>
//                                 </tbody>
//                             </table>
//                         </a>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
//
// HelpRequests.propTypes = {
//     items: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             title: PropTypes.string.isRequired,
//             description: PropTypes.string.isRequired,
//             status: PropTypes.string.isRequired,
//         })
//     ).isRequired,
// };
//
// export default HelpRequests;
//
// import { useState } from 'react'; // Import useState hook for managing state
// import PropTypes from 'prop-types';
// import { items } from "../../components/QAE/DataHelpRequests.jsx";
// import NavBar from "../../components/QAE/NavBar.jsx";
//
// function HelpRequests() {
//     const [expandedRow, setExpandedRow] = useState(null); // State to track the expanded row index
//
//     // Function to handle row click
//     const handleRowClick = (index) => {
//         // Toggle expanded state for the clicked row
//         setExpandedRow(expandedRow === index ? null : index);
//     };
//
//     return (
//         <div>
//             <NavBar/>
//             <div className="text-3xl mr-10"><p>Help Desk</p></div>
//             <div className="p-5 mx-10 mt-20 font-inter">
//                 {items.map((item, index) => (
//                     <div key={index}>
//                         <a href={`https://example.com/${item.id}`} className="block">
//                             <table className="w-full bg-gray-200 my-5 SectionList rounded-lg h-16 flex">
//                                 <tbody>
//                                 <tr className={`${expandedRow === index ? 'bg-blue-200' : ''}`} onClick={() => handleRowClick(index)}>
//                                     <td className="w-35 text-left px-8 py-4 hover:bg-black">{item.id}</td>
//                                     <td className="w-50 text-left px-8 py-4">{item.title}</td>
//                                     <td className="w-10 text-left px-8 py-4">{item.description}</td>
//                                     <td className="w-5 text-left px-8 py-4">{item.status}</td>
//                                 </tr>
//                                 {expandedRow === index && (
//                                     <tr>
//                                         <td colSpan="4">
//                                                  <p>Help</p>
//                                         </td>
//                                     </tr>
//                                 )}
//                                 </tbody>
//                             </table>
//                         </a>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// HelpRequests.propTypes = {
//     items: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             title: PropTypes.string.isRequired,
//             description: PropTypes.string.isRequired,
//             status: PropTypes.string.isRequired,
//         })
//     ).isRequired,
// };
//
// export default HelpRequests;
//
// import { useState } from 'react'; // Import useState hook for managing state
// import PropTypes from 'prop-types';
// import { items } from "../../components/QAE/DataHelpRequests.jsx";
// import NavBar from "../../components/QAE/NavBar.jsx";
//
// function HelpRequests() {
//     const [expandedRow, setExpandedRow] = useState(null); // State to track the expanded row index
//
//     // Function to handle row click
//     const handleRowClick = (index) => {
//         // Toggle expanded state for the clicked row
//         setExpandedRow(expandedRow === index ? null : index);
//     };
//
//     return (
//         <div>
//             <NavBar/>
//             <div className="p-5 mx-10 mt-20 font-inter">
//                 {items.map((item, index) => (
//                     <div key={index}>
//                         <table className="w-full bg-gray-200 my-5 SectionList rounded-lg h-16 flex">
//                             <tbody>
//                             <tr className={`${expandedRow === index ? 'bg-blue-200' : ''}`} onClick={() => handleRowClick(index)}>
//                                 <td className="w-35 text-left px-8 py-4 hover:bg-black">{item.id}</td>
//                                 <td className="w-50 text-left px-8 py-4">{item.title}</td>
//                                 <td className="w-10 text-left px-8 py-4">{item.description}</td>
//                                 <td className="w-5 text-left px-8 py-4">{item.status}</td>
//                                 <td>
//                                     {expandedRow === index && (
//                                         <p>Open</p>
//                                         <p>Delete</p>
//
//                                     )}
//                                 </td>
//                             </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
//
// HelpRequests.propTypes = {
//     items: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//             title: PropTypes.string.isRequired,
//             description: PropTypes.string.isRequired,
//             status: PropTypes.string.isRequired,
//         })
//     ).isRequired,
// };
//
// export default HelpRequests;
import { useState } from 'react';
import PropTypes from 'prop-types';
import { items } from "../../components/QAE/DataHelpRequests.jsx";
import NavBar from "../../components/dashboard/NavBar.jsx";

function HelpRequests() {
    const [expandedRow, setExpandedRow] = useState(null);

    const handleRowClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    return (
        <div>
            <NavBar/>
            <div className="text-3xl mr-10 pl-5"><p>Help Desk</p></div>
            <div className="p-5 mx-10 mt-20 font-inter">
                {items.map((item, index) => (
                    <div key={index}
                         className={`bg-gray-200 mx-10 my-10 py-5 rounded-lg text-left ${expandedRow === index ? 'bg-blue-200 text-black border-y-15 border-x-15 rounded-lg' : ''}`}
                         onClick={() => handleRowClick(index)}>
                        <div className="flex w-full items-center justify-between">
                            <div className="w-1/4 text-left pl-10">{item.id}</div>
                            <div className="w-1/4 text-left">{item.title}</div>
                            <div className="w-1/6 text-left">{item.description}</div>
                            <div className="w-1/4 text-left">{item.status}</div>
                            {expandedRow === index && (
                                <div className="flex justify-center">
                                    <div className="w-1/8 text-left mr-8">
                                        <div className="border bg-red-500 rounded-lg px-2 py-1 text-white">
                                            <p>Delete</p>
                                        </div>
                                    </div>
                                    <div className="w-1/8 text-left mr-5">
                                        <div className="border bg-blue-500 rounded-lg px-2 py-1 text-white">
                                            <p>Open</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {expandedRow === index && (
                            <div className="px-8 py-4">
                                {/* Additional details can be displayed here */}
                                {/* For example: <p>{item.additionalDetails}</p> */}
                            </div>
                        )}
                    </div>
                ))}
            </div>


        </div>
    );
}

HelpRequests.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default HelpRequests;
