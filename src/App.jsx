//import './App.css'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import { CodeProvider } from './context/CodeContext.jsx';
import React from 'react';
import { AuthProvider } from '././pages/Profile/authContext.jsx';
 




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
import EditProfile from "./pages/Profile/EditProfile.jsx";
import Createorg2 from "./pages/CreateOrg/Createorg2.jsx";
import Createorg3 from "./pages/CreateOrg/Createorg3.jsx";
import ManageStaff from "./pages/ManageStaff/ManageStaff.jsx";
import CodeReview from "./pages/dashboard/CodeReview.jsx";
import ContactUs from "./pages/Profile/ContactUs.jsx";
import CodeSubmissions from "./pages/dashboard/CodeSubmissions.jsx";
import ForgetPasswordAndReset from "./pages/Login/ForgetPasswordAndReset.jsx";
import VerifyEmail from "./pages/Login/VerifyEmail.jsx";


export default function App() {
    return (
    <>
        <BrowserRouter>
            <CodeProvider>
            <AuthProvider>
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
                    <Route path="/verify-email" element={<VerifyEmail/>}/>
                    <Route path="/ep" element={<EditProfile userId="123"/>}/>
                    <Route path="/co1" element={<Createorg1/>}/>
                    <Route path="/co2" element={<Createorg2/>}/>
                    <Route path="/co3" element={<Createorg3/>}/>
                    <Route path="/ms" element={<ManageStaff/>}/>
                    <Route path="/cr" element={<CodeReview/>}/>
                    <Route path="/cu" element={<ContactUs/>}/>
                    <Route path="/cs" element={<CodeSubmissions/>}/>
                    <Route path="/fpr" element={<ForgetPasswordAndReset/>}/>
                    
                </Routes>
                </AuthProvider>
            </CodeProvider>
        </BrowserRouter>


    </>
  )
}

