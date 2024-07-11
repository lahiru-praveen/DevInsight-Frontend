// CodeSubmission.jsx
import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
import { Text, Input, Select } from "@chakra-ui/react";
import Submissions from "../../components/dashboard/Submissions.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBarQAE from "../../components/dashboard/NavBarQAE.jsx";

export default function CodeSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [filteredSubmissions, setFilteredSubmissions] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [error, setError] = useState(null);
    const user = sessionStorage.getItem('email');
    const role = sessionStorage.getItem('role');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:8000/pre-sub', {
                    params: {
                        user: user
                    }
                });
                console.log("Fetch Result: ", result); // Log the entire response
                if (result.status === 200 && result.data) {
                    setSubmissions(result.data);
                    setFilteredSubmissions(result.data);
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

    useEffect(() => {
        filterAndSortSubmissions();
    }, [searchQuery, sortOrder, submissions]);

    const filterAndSortSubmissions = () => {
        let filtered = submissions.filter(submission =>
            submission.p_name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        filtered.sort((a, b) => {
            const dateA = new Date(a.submission_date);
            const dateB = new Date(b.submission_date);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setFilteredSubmissions(filtered);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

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
                {role === 'Developer' ?
                    <NavBarUser button1={false} button2={false} button3={false} button4={false}/> :
                    <NavBarQAE button1={false} button2={false} button3={false} button4={false} button5={false}/>
                };
            </div>
            <div className="flex flex-col mt-5 ml-10 mb-5 mr-10">
                <Text className="font-bold mb-4" fontSize='30px'>
                    Submission
                </Text>
                <div className="flex mb-8">
                    <Input
                        placeholder="Search by project name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        mr={4}
                    />
                    <Select value={sortOrder} onChange={handleSortOrderChange} width="150px">
                        <option value="asc">Sort by Date (Previous)</option>
                        <option value="desc">Sort by Date (Latest)</option>
                    </Select>
                </div>
                {/* Render static headers */}
                <Submissions submission={headers} drop={1} />
                {error && <Text color="red">{error}</Text>}
                {/* Map over filtered and sorted submissions and render Submissions component */}
                <div>
                    {filteredSubmissions.map(submission => (
                        <Submissions key={submission.p_id} submission={submission} drop={0} />
                    ))}
                </div>

            </div>
        </div>
    );
}
