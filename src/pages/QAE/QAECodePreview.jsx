// UseCases
//
// Chamoda
// Visitor - sign in
// Visitor - sign up
// Visitor/User/Manager - Contact Admin through email
// User - Edit profile details
// User - See previous submission
//
// Buwaneka
// Visitor - Create organizational account
// Manager - Send invitations
// Manager - Edit organizational details
// Manager - Edit manager details
// Manager - View users withing the organization
//
// Lahiru
// User - Enter project description
// User - Code submission
// User - View review, View suggestions, View reference links
// User - Download the review
//
// Ramajini
// User - See received response
// User - Request help from QAE
// QAE - Send response
// QAE - See the received requests
// QAE - Forward request to another QAE
//
import QAECPNav from "../../components/QAE/QAECPNav.jsx";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

function QAECodePreview() {
    return (
        <div>
            <QAECPNav/>
            <div className="grid grid-cols-2 divide-x py-4 px-4 mx-4">
                <div className="bg-gray-200 rounded-lg ">
                <Tabs variant="enclosed" colorScheme="blue" height={"1100"}>
                    <TabList>
                        <Tab>Preview</Tab>
                        <Tab>Review</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <pre>

                            </pre>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                </div>
                <div className={"px-4 bg-gray-200 rounded-lg mx-4"}>
                    <p>Sample</p>
                </div>
        </div>
</div>

)
    ;
}

export default QAECodePreview;
