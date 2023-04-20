import './App.css'
import { useState } from 'react'
import Login from './pages/enrollment/components/login'
import Validation from './pages/validationCod/components/validation'
import Dates from './pages/enrollmentProcess/components/Dates'
import Details from './pages/enrollmentProcess/components/Details'
import Register from './pages/register/components/register'
import Payment from './pages/enrollmentProcess/components/Payment'
import Confirmation from './pages/Confirmation/components/Confirmation'


function App() {
  return (
    <div className="App">
    {/* <Login/> */}
    {/* <Register/> */}
    {/* <Validation/> */}
     {/* <Dates/> */}
    {/* <Details/> */}
    {/* <Payment/> */}
    <Confirmation/>
    </div>
  )
}

export default App
