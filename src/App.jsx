//import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardMain from "./pages/dashboard/DashboardMain.jsx";
import CodePreview from "./pages/dashboard/CodePreview.jsx";
import SignInDemo from "./pages/Login/SignInDemo.jsx";
import SignUpDemo from "./pages/Login/SignUpDemo.jsx";
import QAEHelpRequests from "./pages/HelpDesk/QAEHelpRequests.jsx";
import ReviewPage from "./pages/dashboard/ReviewPage.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import Createorg1 from "./pages/CreateOrg/Createorg1.jsx";
import QAECodePreview from "./pages/./HelpDesk/QAECodePreview.jsx";
import UserHelpRequests from "./pages/HelpDesk/UserHelpRequests.jsx";
function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/db" element={<DashboardMain/>}/>
                <Route path="/cp" element={<CodePreview/>}/>
                <Route path="/qhr" element={<QAEHelpRequests/>} />
                <Route path="/uhr" element={<UserHelpRequests/>} />
                <Route path="/qcp" element={<QAECodePreview/>} />
                <Route path="/si" element={<SignInDemo/>}/>
                <Route path="/su" element={<SignUpDemo/>}/>
                <Route path="/ld" element={<Landing/>}/>
                <Route path="/co" element={<Createorg1/>}/>
                <Route path="/rp" element={<ReviewPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
