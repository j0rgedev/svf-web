import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainDashboard} from "./MainDashboard.jsx";
import GlobalStyle from "../config/GlobalStyle.js";
import TopAdmin from "../components/TopAdmin.jsx";
import avatar from "../assets/avatar.png"
import DivList_Student from "../components/DivList_Student.jsx";
import Inputfields_newStudent from "../components/Inputfields_newStudent.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import ButtonGeneral from "../components/ButtonGeneral.jsx";
import ButtonAdmin from "../components/ButtonAdmin.jsx";
import Alert1 from "../components/Alert1.jsx";

export function RootAdmin() {

    return (
        <div>
        <GlobalStyle/>
        {/* <MainDashboard/>
        <TopAdmin isSearch={true} text={'Jhon K.'} src={avatar}/> */}
        {/* <DivList_Student cod={'SVF0001'} name={'Arturo Adrian Rodriguez A'} date={'01/01/2000'} state={'Matriculado'}/> */}
        {/* <Inputfields_newStudent text={'Nombres'} type={'text'}/> */}
        {/* <ProgressBar className1={"complete"} className2={"desactive"} className3={"desactive"}/> */}
        {/* <ButtonGeneral text={'SIGUIENTE'}/> */}
        {/* <ButtonAdmin text={"ELIMINAR"}/> */}
        <Alert1/>
        </div>
    )
}