import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import ForgetPasswordPage from "./pages/forget-password.jsx";
import ForgetPasswordForm from "./components/forget-password-com1.jsx";


function App() {
  const [count, setCount] = useState(0)

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
