import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/enrollment-system/pages/auth/login/Login.jsx'
import SmsValidation from './pages/enrollment-system/pages/auth/sms-validation/smsValidation.jsx'
import StudentInfo from './pages/enrollment-system/pages/enrollmentProcess/enrollmentSteps/student-info/StudentInfo.jsx'
import SchoolTerms from './pages/enrollment-system/pages/enrollmentProcess/enrollmentSteps/school-terms/SchoolTerms.jsx'
import UpdatePassword from './pages/enrollment-system/pages/auth/update-pwd/updatePassword.jsx'
import Payment from './pages/enrollment-system/pages/enrollmentProcess/enrollmentSteps/payment/Payment.jsx'
import Confirmation from './pages/enrollment-system/pages/enrollmentProcess/confirmation/Confirmation.jsx'
import NotFoundPage from './pages/enrollment-system/pages/404/404.jsx'

function App() {
    const BASE_PATH = '/matricula'
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={`${BASE_PATH}/login`} element={<Login />} />
                <Route path={`${BASE_PATH}/validacion-sms`} element={<SmsValidation />} />
                <Route path={`${BASE_PATH}/informacion-estudiante`} element={<StudentInfo />} />
                <Route path={`${BASE_PATH}/terminos-escuela`} element={<SchoolTerms />} />
                <Route path={`${BASE_PATH}/actualizar-contraseña`} element={<UpdatePassword />} />
                <Route path={`${BASE_PATH}/pago`} element={<Payment />} />
                <Route path={`${BASE_PATH}/confirmacion`} element={<Confirmation />} />
                <Route path={`${BASE_PATH}/404`} element={<NotFoundPage/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
