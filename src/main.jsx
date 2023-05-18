import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from "react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./app/enrollment-system/pages/auth/Login.jsx";
import {TempTokenGuard} from "./app/enrollment-system/routes/TempTokenGuard.jsx";
import SmsValidation from "./app/enrollment-system/pages/auth/smsValidation.jsx";
import { createGlobalStyle } from 'styled-components';
import UpdatePassword from "./app/enrollment-system/pages/auth/updatePassword.jsx";
import {EnrollmentProcess} from "./app/enrollment-system/pages/enrollmentProcess/EnrollmentProcess.jsx";
import Confirmation from "./app/enrollment-system/pages/enrollmentProcess/Confirmation.jsx";
import {ProtectedRoute} from "./app/enrollment-system/routes/ProtectedRoute.jsx";
import EnrollmentRootLayout from "./app/enrollment-system/pages/EnrollmentRootLayout.jsx";
import NotFoundPage from "./app/enrollment-system/pages/errors/NotFoundPage.jsx";
import {AdminRootLayout} from "./app/admin-intranet/pages/AdminRootLayout.jsx";
import {StudentList} from "./app/admin-intranet/pages/StudentList.jsx";
import {NewStudentProcess} from "./app/admin-intranet/pages/NewStudentProcess.jsx";

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Poppins', sans-serif;
    }
    
    body{
        height: 100%;
        width: 100%;
    }
`

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5 // 5 minutes
        }
    }
})

const router = createBrowserRouter([
    {
        path: '/matricula',
        element: <EnrollmentRootLayout/>,
        children: [
            {
                index: true,
                path: 'login',
                element: <Login/>
            },
            {
                path: 'validacion',
                element: <TempTokenGuard element={<SmsValidation/>}/>
            },
            {
                path: 'actualizacion',
                element: <ProtectedRoute element={<UpdatePassword/>}/>
            },
            {
                path: 'proceso',
                element: <ProtectedRoute element={<EnrollmentProcess/>}/>
            },
            {
                path: 'confirmacion',
                element: <ProtectedRoute element={<Confirmation/>}/>
            },
            {
                path: '*',
                element: <NotFoundPage/>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminRootLayout/>,
        children: [
            {
                index: true,
                element: <StudentList/>
            },
            {
                path: 'student/add',
                element: <NewStudentProcess/>
            }
        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <GlobalStyle/>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
)
