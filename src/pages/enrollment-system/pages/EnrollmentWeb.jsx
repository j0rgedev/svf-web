import {EnrollmentProcessContext} from "../context/EnrollmentProcessContext.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./auth/login/Login.jsx";
import {TempTokenGuard} from "../routes/TempTokenGuard.jsx";
import SmsValidation from "./auth/sms-validation/smsValidation.jsx";
import {ProtectedRoute} from "../routes/ProtectedRoute.jsx";
import UpdatePassword from "./auth/update-pwd/updatePassword.jsx";
import NotFoundPage from "./404/404.jsx";
import React, {useState} from "react";
import {EnrollmentProcess} from "./EnrollmentProcess.jsx";
import Confirmation from "./enrollmentProcess/confirmation/Confirmation.jsx";

export const EnrollmentWeb = () => {
    const BASE_PATH = '/matricula'

    return (
        <EnrollmentProcessContext.Provider value={{enrollmentProcess, setEnrollmentProcess}}>
            <Route path={`${BASE_PATH}/login`} element={<Login/>}/>
            <Route path={`${BASE_PATH}/`} element={<Login/>}/>
            <Route
                path={`${BASE_PATH}/validacion-sms`}
                element={
                    <TempTokenGuard
                        element={<SmsValidation/>}
                        redirectTo={`${BASE_PATH}/login`}
                    />
                }/>
            <Route element={<ProtectedRoute/>}>
                <Route path={`${BASE_PATH}/proceso`} element={<EnrollmentProcess/>}/>
                <Route path={`${BASE_PATH}/confirmacion`} element={<Confirmation/>}/>
                <Route path={`${BASE_PATH}/actualizar-contraseña`} element={<UpdatePassword/>}/>
            </Route>
        </EnrollmentProcessContext.Provider>
    )
}