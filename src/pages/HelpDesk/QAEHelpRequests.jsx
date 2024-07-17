import { Text, Input, Select } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import NavBarQAE from "../../components/dashboard/NavBarQAE.jsx";
import { debounce } from "lodash";
import Responses from "../../components/HelpDesk/Responses.jsx";

export default function UserHelpRequests() {
    const [response, setResponse] = useState([]);
    const [filteredResponses, setFilteredResponses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    const [responseStatusFilter, setResponseStatusFilter] = useState(""); // Added state for response status filter
    const [error, setError] = useState(null);
    const user = sessionStorage.getItem('email');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:8000/pre-responds', {
                    params: { qae: user }
                });
                console.log("Fetch Result: ", result.data); // Log the entire response
                if (result.status === 200) {
                    setResponse(result.data);
                } else {
                    console.error("Failed to fetch data:", result.message);
                    setError("Failed to fetch data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data");
            }
        };

        fetchData();
    }, [user]);

    const filterAndSortResponses = useCallback(debounce(() => {
        let filtered = response;

        // Apply search query filtering
        if (searchQuery) {
            filtered = filtered.filter(req =>
                req.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.req_subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.req_content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply response status filtering
        if (responseStatusFilter) {
            filtered = filtered.filter(req => req.res_status === responseStatusFilter);
        }

        // Sort responses
        filtered.sort((a, b) => {
            const dateComparison = new Date(a.req_date) - new Date(b.req_date);
            if (sortOrder === "asc") {
                return dateComparison;
            } else {
                return -dateComparison;
            }
        });

        setFilteredResponses(filtered);
    }, 300), [searchQuery, sortOrder, response, responseStatusFilter]);

    useEffect(() => {
        filterAndSortResponses();
    }, [searchQuery, sortOrder, response, responseStatusFilter, filterAndSortResponses]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleResponseStatusFilterChange = (event) => {
        setResponseStatusFilter(event.target.value);
    };

    // Static headers
    const headers = {
        user: "User",
        p_name: "Submission/Project Name",
        req_id: "Request ID",
        req_date: "Requested Date",
        req_subject: "Subject",
        req_content: "Request",
        res_status: "Response Status",
        res_date: "Responded Date",
    };

    return (
        <div className="flex flex-col h-screen">
            <div>
                <NavBarQAE button1={false} button2={false} button3={false} button4={false} button5={false} />
            </div>
            <div className="flex flex-col mt-5 ml-10 mb-5 mr-10">
                <Text className="font-bold mb-4" fontSize='30px' color="gray.500">
                    Responses
                </Text>
                <div className="flex mb-8">
                    <Input
                        placeholder="Search by user, subject or request"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        mr={4}
                    />
                    <Select value={sortOrder} onChange={handleSortOrderChange} width="400px" mr={4}>
                        <option value="desc">Sort by Requested Date (Latest)</option>
                        <option value="asc">Sort by Requested Date (Previous)</option>
                    </Select>
                    <Select value={responseStatusFilter} onChange={handleResponseStatusFilterChange} width="200px">
                        <option value="">All Statuses</option>
                        <option value="Responded">Responded</option>
                        <option value="Not responded">Not responded</option>
                    </Select>
                </div>
                {/* Render static headers */}
                <Responses response={headers} drop={1} />
                {error && <Text color="red">{error}</Text>}
                <div>
                    {filteredResponses.map(res => (
                        <Responses key={res.r_id} response={res} drop={0} />
                    ))}
                </div>
            </div>
        </div>
    );
}
