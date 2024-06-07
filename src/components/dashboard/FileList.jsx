import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function FileList({ onSelectFile, selectedFileName, mode }) {
    const [files, setFiles] = useState([]);
    const fileSelected = selectedFileName;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/files');
                setFiles(response.data);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchData().then(r => console.log(r));
    }, []);

    return (
        <div>
            <Text className="text-xl font-bold mb-2">Uploaded File List</Text>
            <ul>
                <div className="flex flex-wrap">
                    <div>
                        {files.map((file, index) => (
                        <li key={index}>
                            <Button colorScheme='gray' variant="outline" size="sm" className="mt-1">
                                {fileSelected !== '' || mode === 1 ? (
                                    <span
                                        className={`ml-1 mr-1 w-max pl-4 pr-4 pt-1 pb-1 rounded-full ${selectedFileName === file.name ? 'bg-blue-200' : 'bg-gray-300 text-white'}`}>
                                            {file.name}
                                        </span>
                                ) : (
                                    <Link to="#"
                                          className={`ml-1 mr-1 hover:bg-blue-100 hover:text-black focus:bg-blue-200 w-max pl-4 pr-4 pt-1 pb-1 focus:outline-none active:bg-blue-200 focus:text-black rounded-full bg-gray-300 text-white }`}
                                          onClick={(e) => {
                                              e.preventDefault();
                                              if (selectedFileName !== file.name) {
                                                  onSelectFile(file.name);
                                              }
                                          }}>
                                        {file.name}
                                    </Link>
                                )}
                            </Button>
                        </li>
                        ))}
                    </div>
                </div>
            </ul>
            <p className="mt-3">Total Files: {files.length}</p>
        </div>
    );
}

FileList.propTypes = {
    onSelectFile: PropTypes.func.isRequired,
    selectedFileName: PropTypes.string.isRequired,
    mode: PropTypes.number.isRequired

};
