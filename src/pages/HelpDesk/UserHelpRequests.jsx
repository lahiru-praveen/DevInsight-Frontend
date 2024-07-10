import NavBarUser from "../../components/dashboard/NavBarUser.jsx";
import { Text, Input, Select } from "@chakra-ui/react";
import Requests from "../../components/HelpDesk/Requests.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserHelpRequests() {
    const [request, setRequest] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [error, setError] = useState(null);
    const user = sessionStorage.getItem('email');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:8000/pre-responses', {
                    params: {
                        user: user
                    }
                });
                console.log("Fetch Result: ", result.data); // Log the entire response
                if (result.status === 200 && result.data) {
                    setRequest(result.data);
                    setFilteredRequests(result.data);
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
    }, [searchQuery, sortOrder, request]);

    const filterAndSortSubmissions = () => {
        let filtered = request.filter(request =>
            request.p_name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        filtered.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setFilteredRequests(filtered);
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
        r_id: "Request ID",
        r_subject: "Subject",
        r_content: "Request",
        r_status: "Status",
        date: "Requested Date",
    };

    return (
        <div className="flex flex-col h-screen">
            <div>
                <NavBarUser button1={false} button2={false} button3={false} button4={false} />
            </div>
            <div className="flex flex-col mt-5 ml-10 mb-5 mr-10">
                <Text className="font-bold mb-4" fontSize='30px'>
                    Requests
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
                <Requests request={headers} drop={1} />
                {error && <Text color="red">{error}</Text>}
                <div>
                    {filteredRequests.map(request => (
                        <Requests key={request.p_id} request={request} drop={0} />
                    ))}
                </div>

            </div>
        </div>
    );
}
