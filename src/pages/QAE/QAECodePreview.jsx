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

import QAECPNav from "../../components/QAE/QAECPNav.jsx";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"

function QAECodePreview() {
    return (
        <div>
            <QAECPNav/>
        <div>
            <Tabs variant="enclosed" colorScheme="red">
                <TabList>
                    <Tab>One</Tab>
                    <Tab>Two</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
        </div>

    );
}

export default QAECodePreview;
