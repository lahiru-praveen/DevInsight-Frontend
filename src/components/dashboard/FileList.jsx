import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FileList() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/files');
                console.log("Response:", response.data); // Log response data for debugging
                setFiles(response.data);
            } catch (error) {
                console.error("Error fetching files:", error); // Log any errors to console
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>File Manager</h1>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <div><a href={`http://localhost:8000/files/${file.name}`} target="_blank">{file.name}</a></div>
                    </li>
                ))}
            </ul>
            <p>Total Files: {files.length}</p>
        </div>
    );
}
