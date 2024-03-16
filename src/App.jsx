//import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardMain from "./pages/dashboard/DashboardMain.jsx";
import CodePreview from "./pages/dashboard/CodePreview.jsx";
import SignInDemo from "./pages/Login/SignInDemo.jsx";
import SignUpDemo from "./pages/Login/SignUpDemo.jsx";
import HelpRequests from "./pages/QAE/HelpRequests.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import Createorg1 from "./pages/CreateOrg/Createorg1.jsx";
import QAECodePreview from "./pages/QAE/QAECodePreview.jsx";
import OrganRegister from "./pages/Login/OrganizationCreateAccount.jsx";
import ForgetPassword from "./pages/Login/ForgetPassword.jsx";
import CreateOrg from "./pages/Login/OrganizationCreateAccount.jsx";
import FindYourAccount from "./pages/Login/FindYourAccount.jsx";
import EditProfile from "./pages/Profile/EditProfile.jsx";
import Createorg2 from "./pages/CreateOrg/Createorg2.jsx";
import ManageStaff from "./pages/ManageStaff/ManageStaff.jsx";


function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/db" element={<DashboardMain/>}/>
                <Route path="/cp" element={<CodePreview/>}/>
                <Route path="/hr" element={<HelpRequests/>} />
                <Route path="/qcp" element={<QAECodePreview/>} />
                <Route path="/si" element={<SignInDemo/>}/>
                <Route path="/su" element={<SignUpDemo/>}/>
                <Route path="/ld" element={<Landing/>}/>
                <Route path="/co" element={<Createorg1/>}/>
                <Route path="/og" element={<OrganRegister/>}/>
                <Route path="/fp" element={<ForgetPassword/>}/>
                <Route path="/oa" element={<CreateOrg/>}/>
                <Route path="/fa" element={<FindYourAccount/>}/>
                <Route path="/ep" element={<EditProfile/>}/>
                <Route path="/co1" element={<Createorg1/>}/>
                <Route path="/co2" element={<Createorg2/>}/>
                <Route path="/ms" element={<ManageStaff/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
