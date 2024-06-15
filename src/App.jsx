//import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { CodeProvider } from './context/CodeContext.jsx';
import DashboardMain from "./pages/dashboard/DashboardMain.jsx";
import CodePreview from "./pages/dashboard/CodePreview.jsx";
import SignInDemo from "./pages/Login/SignInDemo.jsx";
import SignUpDemo from "./pages/Login/SignUpDemo.jsx";
import QAEHelpRequests from "./pages/HelpDesk/QAEHelpRequests.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import Createorg1 from "./pages/CreateOrg/Createorg1.jsx";
import QAECodePreview from "./pages/./HelpDesk/QAECodePreview.jsx";
import UserHelpRequests from "./pages/HelpDesk/UserHelpRequests.jsx";
import OrganRegister from "./pages/Login/OrganizationCreateAccount.jsx";
import ForgetPassword from "./pages/Login/ForgetPassword.jsx";
import CreateOrg from "./pages/Login/OrganizationCreateAccount.jsx";
import FindYourAccount from "./pages/Login/FindYourAccount.jsx";
import EditProfile from "./pages/Profile/EditProfile.jsx";
import Createorg2 from "./pages/CreateOrg/Createorg2.jsx";
import Createorg3 from "./pages/CreateOrg/Createorg3.jsx";
import ManageStaff from "./pages/ManageStaff/ManageStaff.jsx";
import CodeReview from "./pages/dashboard/CodeReview.jsx";
import ContactUs from "./pages/Profile/ContactUs.jsx";
import CodeSubmissions from "./pages/dashboard/CodeSubmissions.jsx";

import AskHelp from "./pages/HelpDesk/AskHelp.jsx";
import UserResponsePreview from "./pages/HelpDesk/UserResponsePreview.jsx";

import ManagerProfile from "./pages/MangerProfile/ManagerProfile.jsx";
import Chatbot from "./pages/Chatbot/chatbot.jsx";
import AccSuccess from "./pages/CreateOrg/AccSuccess.jsx";
import Profilenew from "./pages/Profile_2/Profile_page.jsx";
import AdminProfilenew from "./pages/Profile_2/adminProfile_page.jsx";
import Profilepage from "./pages/Profile_2/profilepage.jsx";
import Orgnizationpage from "./pages/Organization_2/organizationpage.jsx";



export default function App() {
    return (
    <>
        <BrowserRouter>
            <CodeProvider>
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/db" element={<DashboardMain/>}/>
                    <Route path="/cp" element={<CodePreview/>}/>
                    <Route path="/qhr" element={<QAEHelpRequests/>} />
                    <Route path="/uhr" element={<UserHelpRequests/>} />
                    <Route path="/qcp" element={<QAECodePreview/>} />
                    <Route path="/si" element={<SignInDemo/>}/>
                    <Route path="/su" element={<SignUpDemo/>}/>
                    <Route path="/co" element={<Createorg1/>}/>
                    <Route path="/og" element={<OrganRegister/>}/>
                    <Route path="/fp" element={<ForgetPassword/>}/>
                    <Route path="/oa" element={<CreateOrg/>}/>
                    <Route path="/fa" element={<FindYourAccount/>}/>
                    <Route path="/ep" element={<EditProfile/>}/>
                    <Route path="/co1" element={<Createorg1/>}/>
                    <Route path="/co2" element={<Createorg2/>}/>
                    <Route path="/co3" element={<Createorg3/>}/>
                    <Route path="/ms" element={<ManageStaff/>}/>
                    <Route path="/cr" element={<CodeReview/>}/>
                    <Route path="/cu" element={<ContactUs/>}/>
                    <Route path="/cs" element={<CodeSubmissions/>}/>

                    <Route path="/ah" element={<AskHelp/>}/>
                    <Route path="/urp" element={<UserResponsePreview/>}/>


                    <Route path="/mp" element={<ManagerProfile/>}/>
                    <Route path="/cb" element={<Chatbot/>}/>
                    <Route path="/as" element={<AccSuccess/>}/>
                    <Route path="/ppnew" element={<Profilenew/>}/>
                    <Route path="/appnew" element={<AdminProfilenew/>}/>
                    <Route path="/ppage" element={<Profilepage/>}/>
                    <Route path="/opage" element={<Orgnizationpage/>}/>

                </Routes>
            </CodeProvider>
        </BrowserRouter>
    </>
  )
}










