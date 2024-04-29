// FileList component
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function FileList({ onSelectFile }) {
    const [files, setFiles] = useState([]);

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
            <h1 className="text-xl font-bold">Uploaded-Project</h1>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <Button colorScheme='gray' variant="outline" size="sm" className="mt-1 ">
                            <Link to="#" className="ml-1 mr-1 hover:bg-blue-100 focus:bg-blue-200 focus:outline-none active:bg-blue-200" onClick={(e) => { e.preventDefault(); onSelectFile(file.name) }}>{file.name}</Link>
                        </Button>
                    </li>
                ))}
            </ul>
            <p>Total Files: {files.length}</p>
        </div>
    );
}

FileList.propTypes = {
    onSelectFile: PropTypes.func.isRequired
};
