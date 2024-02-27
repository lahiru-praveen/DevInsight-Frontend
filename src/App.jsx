//import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardMain from "./pages/DashboardMain.jsx";


function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/db" element={<DashboardMain/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
