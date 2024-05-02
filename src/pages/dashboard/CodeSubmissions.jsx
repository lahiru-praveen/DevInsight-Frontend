import NavBar from "../../components/dashboard/NavBar.jsx";
import { Text } from "@chakra-ui/react";
import Submissions from "../../components/dashboard/Submissions.jsx";

export default function CodeSubmissions() {
    // Sample submissions data
    const submissions = [
        { id: 1, projectId: "Project ID", submissionDate: "Submission Date", language: "Language", description: "Description" },
        { id: 2, projectId: "Project2", submissionDate: "2024-05-02", language: "JavaScript", description: "Description2" },
        { id: 2, projectId: "Project2", submissionDate: "2024-05-02", language: "JavaScript", description: "Description2" },
        { id: 2, projectId: "Project2", submissionDate: "2024-05-02", language: "JavaScript", description: "Description2" },
        // Add more submissions as needed
    ];

    return (
        <div className="flex flex-col h-screen">
            <div>
                <NavBar />
            </div>
            <div className="flex flex-col mt-5 ml-10 mb-5 mr-10">
                <Text className="font-bold" fontSize='30px'>
                    Submission
                </Text>
                {/* Map over submissions and render Submissions component */}
                {submissions.map(submission => (
                    <Submissions key={submission.id} submission={submission} />
                ))}
            </div>
        </div>
    );
}