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
    const [sortOrder, setSortOrder] = useState("asc");
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
        if (searchQuery) {
            filtered = response.filter(req =>
                req.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.req_subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.req_content.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            const userComparison = a.user.localeCompare(b.user);
            if (userComparison !== 0) return userComparison;

            const subjectComparison = a.req_subject.localeCompare(b.req_subject);
            if (subjectComparison !== 0) return subjectComparison;

            const requestIdComparison = (a.p_id + a.r_id).localeCompare(b.p_id + b.r_id);
            return requestIdComparison;
        });

        if (sortOrder === "desc") {
            filtered.reverse();
        }

        setFilteredResponses(filtered);
    }, 300), [searchQuery, sortOrder, response]);

    useEffect(() => {
        filterAndSortResponses();
    }, [searchQuery, sortOrder, filterAndSortResponses]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
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
                <NavBarQAE button1={false} button2={false} button3={false} button4={false} button5={false}/>
            </div>
            <div className="flex flex-col mt-5 ml-10 mb-5 mr-10">
                <Text className="font-bold mb-4" fontSize='30px'>
                    Responses
                </Text>
                <div className="flex mb-8">
                    <Input
                        placeholder="Search by user, subject or request"
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
