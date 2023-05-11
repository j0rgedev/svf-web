import './App.css'
import {EnrollmentWeb} from "./pages/enrollment-system/pages/EnrollmentWeb.jsx";
import {RootAdmin} from "./pages/admin-intranet/routes/RootAdmin.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <EnrollmentWeb/>
                    <RootAdmin/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
