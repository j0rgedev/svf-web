import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainDashboard} from "./MainDashboard.jsx";
import GlobalStyle from "../config/GlobalStyle.js";
import TopAdmin from "../components/TopAdmin.jsx";
import avatar from "../assets/avatar.png"
import Inputfields_newStudent from "../components/Inputfields_newStudent.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import ButtonGeneral from "../components/ButtonGeneral.jsx";
import ButtonAdmin from "../components/ButtonAdmin.jsx";
import Alert1 from "../components/Alert/Alert.jsx";
import Form_students from "../components/Table_Students/Table_students.jsx";
import List_student from "../components/List_student.jsx";
import { Students } from "./Students.jsx";
import { Students_Dates } from "../pages/new_studentprocess/new_studentsteps/student_Dates/Student_Dates.jsx";
import { Attorney_Dates } from "../pages/new_studentprocess/new_studentsteps/attorney_Dates/Attorney_Dates.jsx";
import { Confirmation } from "../pages/new_studentprocess/new_studentsteps/confirmation/Confirmation.jsx";

export function RootAdmin() {

    return (
        <div>
        <GlobalStyle/>
        {/* <Students/> */}
        {/* <Students_Dates/> */}
        {/* <Attorney_Dates/> */}
        <Confirmation cod={'SVF007'} password={'alumno202372884355'}/>
        {/* <MainDashboard/>
        <TopAdmin isSearch={true} text={'Jhon K.'} src={avatar}/> */}
        {/* <Inputfields_newStudent text={'Nombres'} type={'text'}/> */}
        {/* <ProgressBar className1={"complete"} className2={"desactive"} className3={"desactive"}/> */}
        {/* <ButtonGeneral text={'SIGUIENTE'}/> */}
        {/* <ButtonAdmin text={"ELIMINAR"} className={'thirdButton'}/> */}
        {/* <Alert1 icon="✅" text="Alumno eliminado exitosamente" /> */}
        {/* <Form_students/> */}
       {/* <List_student cod={'SVF0001'} name={'Arturo Adrian Rodriguez A'} date={'01/01/2000'} state={'Matriculado'}/> */}
        </div>
    )
}