//import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardMain from "./pages/dashboard/DashboardMain.jsx";
import CodePreview from "./pages/dashboard/CodePreview.jsx";
import SignInDemo from "./pages/Login/SignInDemo.jsx";
import SignUpDemo from "./pages/Login/SignUpDemo.jsx";
import HelpRequests from "./pages/QAE/HelpRequests.jsx";
import OrganRegister from "./pages/Login/OrganizationCreateAccount.jsx";
import ForgetPassword from "./pages/Login/ForgetPassword.jsx";
import CreateOrg from "./pages/Login/OrganizationCreateAccount.jsx";
import FindYourAccount from "./pages/Login/FindYourAccount.jsx";


function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/db" element={<DashboardMain/>}/>
                <Route path="/cp" element={<CodePreview/>}/>
                <Route path="/hr" element={<HelpRequests/>}/>
                <Route path="/si" element={<SignInDemo/>}/>
                <Route path="/su" element={<SignUpDemo/>}/>
                <Route path="/og" element={<OrganRegister/>}/>
                <Route path="/fp" element={<ForgetPassword/>}/>
                <Route path="/oa" element={<CreateOrg/>}/>
                <Route path="/fa" element={<FindYourAccount/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
