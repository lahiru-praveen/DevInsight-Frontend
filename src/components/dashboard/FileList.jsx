import { useState, useEffect } from 'react';
import axios from 'axios';

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

        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-xl font-bold">Uploaded-Project</h1>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <div className="ml-4"><a href="#" onClick={() => onSelectFile(file.name)}>{file.name}</a></div>
                    </li>
                ))}
            </ul>
            <p>Total Files: {files.length}</p>
        </div>
    );
}
