import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./app/login/pages/Login.jsx";
import { TempTokenGuard } from "./app/common/routes/TempTokenGuard.jsx";
import SmsValidation from "./app/login/pages/smsValidation.jsx";
import { createGlobalStyle } from 'styled-components';
import UpdatePassword from "./app/login/pages/updatePassword.jsx";
import { EnrollmentProcess } from "./app/enrollment-system/pages/enrollmentProcess/EnrollmentProcess.jsx";
import Confirmation from "./app/enrollment-system/pages/enrollmentProcess/Confirmation.jsx";
import {
	AdminProtectedRoute,
	LoginProtectedRoute,
	StudentProtectedRoute
} from "./app/common/routes/ProtectedRoute.jsx";
import EnrollmentRootLayout from "./app/enrollment-system/pages/EnrollmentRootLayout.jsx";
import NotFoundPage from "./app/enrollment-system/pages/errors/NotFoundPage.jsx";
import { AdminRootLayout } from "./app/admin-intranet/pages/AdminRootLayout.jsx";
import { StudentList } from "./app/admin-intranet/pages/students/StudentList.jsx";
import { AddStudentLayout } from "./app/admin-intranet/pages/students/addStudent/AddStudentLayout.jsx";
import { StudentsLayout } from "./app/admin-intranet/pages/students/StudentsLayout.jsx";
import { StudentDetails } from "./app/admin-intranet/pages/students/StudentDetails.jsx";
import { Dashboard } from './app/admin-intranet/pages/dashboards/Dashboard.jsx';
import { EnrollmentDashboard } from './app/admin-intranet/pages/dashboards/StatisticsEnrolllments.jsx';
import { StatisticsPensions } from './app/admin-intranet/pages/dashboards/StatisticsPensions.jsx';
import Student_Intranet from './app/student-intranet/pages/Intranet.jsx';
import Pensions from './app/student-intranet/pages/Pensions.jsx';
import Historial from './app/student-intranet/pages/Historial.jsx';
import { StudentRootLayout } from './app/student-intranet/pages/StudentRootLayout.jsx';
import NotFoundPage404 from './app/admin-intranet/pages/404.jsx';
import {AuthLayout} from "./app/login/pages/AuthLayout.jsx";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  body {
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
		path: '/login',
		element: <AuthLayout />,
		children: [
			{
				index: true,
				element: <LoginProtectedRoute element={<Login />} />
			},
			{
				path: 'validacion',
				element: <TempTokenGuard element={<SmsValidation />} />
			},
			{
				path: 'actualizacion',
				element: <StudentProtectedRoute element={<UpdatePassword />} />
			},
		]
	},
	{
		path: '/admin',
		element: <AdminProtectedRoute element={<AdminRootLayout />} />,
		children: [
			{
				index: true,
				element: <AdminProtectedRoute element={<Dashboard />} />
			},
			{
				path: 'estudiantes',
				element: <AdminProtectedRoute element={<StudentsLayout />} />,
				children: [
					{
						index: true,
						element: <AdminProtectedRoute element={<StudentList />} />
					},
					{
						path: 'nuevo',
						element: <AdminProtectedRoute element={<AddStudentLayout />} />
					},
					{
						path: ':id',
						element: <AdminProtectedRoute element={<StudentDetails />} />
					},
					{
						path: '*',
						element: <NotFoundPage404/>
					},
				],

			},
			{
				path: 'matriculas',
				element: <AdminProtectedRoute element={<EnrollmentDashboard />} />
			},
			{
				path: 'pensiones',
				element: <AdminProtectedRoute element={<StatisticsPensions />} />
			},
			{
				path: '*',
				element: <NotFoundPage404/>
			},

		]
	},
	{
		path: '/estudiante',
		element: <StudentProtectedRoute element={<StudentRootLayout />} />,
		children: [
			{
				index: true,
				element: <StudentProtectedRoute element={<Student_Intranet />} />
			},
			{
				path: 'pensiones',
				element: <StudentProtectedRoute element={<Pensions />} />
			},
			{
				path: 'historial',
				element: <StudentProtectedRoute element={<Historial />} />

			},
			{
				path: '*',
				element: <NotFoundPage404/>
			},
			{
				path: 'matricula',
				element: <StudentProtectedRoute element={<EnrollmentRootLayout />} />,
				children: [
					{
						index: true,
						element: <StudentProtectedRoute element={<EnrollmentProcess />} />
					},
					{
						path: 'confirmacion',
						element: <StudentProtectedRoute element={<Confirmation />} />
					},
					{
						path: '*',
						element: <NotFoundPage />
					}
				]
			},
		]
	},
	{
		path: '*',
		element: <NotFoundPage />
	}
])


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<GlobalStyle />
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
)
