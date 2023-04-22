import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/enrollment-system/pages/auth/login/Login.jsx'
import SmsValidation from './pages/enrollment-system/pages/auth/sms-validation/smsValidation.jsx'
import StudentInfo from './pages/enrollment-system/pages/enrollmentProcess/enrollmentSteps/student-info/StudentInfo.jsx'
import SchoolTerms from './pages/enrollment-system/pages/enrollmentProcess/enrollmentSteps/school-terms/SchoolTerms.jsx'
import UpdatePassword from './pages/enrollment-system/pages/auth/update-pwd/updatePassword.jsx'
import Payment from './pages/enrollment-system/pages/enrollmentProcess/enrollmentSteps/payment/Payment.jsx'
import Confirmation from './pages/enrollment-system/pages/enrollmentProcess/confirmation/Confirmation.jsx'

function App() {
    const BASE_PATH = '/matricula'
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={`${BASE_PATH}/login`} element={<Login />} />
                <Route path={`${BASE_PATH}/sms-validation`} element={<SmsValidation />} />
                <Route path={`${BASE_PATH}/student-info`} element={<StudentInfo />} />
                <Route path={`${BASE_PATH}/school-terms`} element={<SchoolTerms />} />
                <Route path={`${BASE_PATH}/update-password`} element={<UpdatePassword />} />
                <Route path={`${BASE_PATH}/payment`} element={<Payment />} />
                <Route path={`${BASE_PATH}/confirmation`} element={<Confirmation />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
