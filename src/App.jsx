import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ForgetPasswordPage from "./pages/forget-password.jsx";
import ForgetPasswordForm from "./components/forget-password-com1.jsx";


function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/fp" element={<ForgetPasswordPage/>}/>
                <Route path="/fp1" element={<ForgetPasswordForm/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
