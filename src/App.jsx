//import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardMain from "./pages/dashboard/DashboardMain.jsx";
import CodePreview from "./pages/dashboard/CodePreview.jsx";
import SignInDemo from "./pages/Login/SignInDemo.jsx";
import SignUpDemo from "./pages/Login/SignUpDemo.jsx";
import HelpRequests from "./pages/QAE/HelpRequests.jsx";
import ReviewPage from "./pages/dashboard/ReviewPage.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import Createorg1 from "./pages/CreateOrg/Createorg1.jsx";
import QAECodePreview from "./pages/QAE/QAECodePreview.jsx";

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
                <Route path="/rp" element={<ReviewPage/>}/>
                <Route path="/co1" element={<Createorg1/>}/>
                <Route path="/co2" element={<Createorg2/>}/>
                <Route path="/ms" element={<ManageStaff/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
