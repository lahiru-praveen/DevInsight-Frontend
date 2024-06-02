import NavBar from "../../components/dashboard/NavBar.jsx";
import { Text } from "@chakra-ui/react";
import Submissions from "../../components/dashboard/Submissions.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CodeSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:8000/pre-sub');
                console.log("Fetch Result: ", result); // Log the entire response
                if (result.status === 200 && result.data) {
                    setSubmissions(result.data);
                } else {
                    console.error("Failed to fetch data:", result.message);
                    setError("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching files:", error);
                setError("Error fetching data");
            }
        };
        fetchData();
    }, []);

    // Static headers
    const headers = {
        p_id: "Project ID",
        p_name: "Submission/Project Name",
        f_name: "File Name",
        submission_date: "Submission Date",
        language: "Language",
        description: "Description",
        mode: 0,
        code: 1,
    };

    return (
        <div className="flex flex-col h-screen">
            <div>
                <NavBar />
            </div>
            <div className="flex flex-col mt-5 ml-10 mb-5 mr-10">
                <Text className="font-bold" fontSize='30px'>
                    Submission
                </Text>
                {/* Render static headers */}
                <Submissions submission={headers} drop={1} />
                {error && <Text color="red">{error}</Text>}
                {/* Map over submissions and render Submissions component */}
                {submissions.map(submission => (
                    <Submissions key={submission.p_id} submission={submission} drop={0} />
                ))}
            </div>
        </div>
    );
}
