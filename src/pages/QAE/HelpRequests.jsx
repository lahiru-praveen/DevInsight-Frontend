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

// TODO: Uncomment This
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

export default HelpRequests;
