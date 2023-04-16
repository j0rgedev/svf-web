import './App.css'
import InputField from './common/components/Inputfield/Inputfield'
/* import Sidebar from './common/components/Sidebar/Sidebar' */
/* import Login from './pages/enrollment/components/login' */

function App() {
  return (
    <div className="App">
      <InputField label={'Código Alumno'} type={'text'}/>
      <InputField label={'Contraseña'} type={'password'}/>
        {/* <Sidebar/> */}
        
    </div>
      
      
      /* <Login/> */
  )
}

export default App
