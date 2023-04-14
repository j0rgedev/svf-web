import './App.css'
/* import InputField from './common/components/Inputfield/Inputfield' */
import Sidebar from './common/components/Sidebar/Sidebar'
/* import Login from './pages/enrollment/components/login' */

function App() {
  return (
    <div className="App">
      <div className='container'>
        <Sidebar/>
      </div>
      {/* <InputField label={'Código Alumno'} type={'text'}/>
      <InputField label={'Contraseña'} type={'password'}/> */}
      
      {/* <Login/> */}
    </div>
  )
}

export default App
