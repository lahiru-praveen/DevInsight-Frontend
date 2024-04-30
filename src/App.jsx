//import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import ManageStaff from "./pages/ManageStaff/ManageStaff.jsx";
import CodeReview from "./pages/dashboard/CodeReview.jsx";
import ContactUs from "./pages/Profile/ContactUs.jsx";


export default function App() {
    return (
    <>
        <BrowserRouter>
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
                <Route path="/ms" element={<ManageStaff/>}/>
                <Route path="/cr" element={<CodeReview/>}/>
                <Route path="/cu" element={<ContactUs/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

