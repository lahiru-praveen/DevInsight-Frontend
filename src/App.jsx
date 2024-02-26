//import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ForgetPasswordPage from "./pages/forget-password.jsx";
import ForgetPasswordForm from "./components/forget-password-com1.jsx";
import DashboardMain from "./pages/dashboard-main.jsx";


function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/fp" element={<ForgetPasswordPage/>}/>
                <Route path="/fp1" element={<ForgetPasswordForm/>}/>
                <Route path="/db" element={<DashboardMain/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
