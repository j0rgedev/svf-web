import './App.css'
import InputField from './common/components/Inputfield/Inputfield'
import Sidebar from './common/components/Sidebar/Sidebar'
import {FaUserGraduate} from 'react-icons/fa'

function App() {
  return (
    <div className="App">
      <div className='container'>
        <Sidebar/>
        <div className='right-container'>
          <h1>TITULO</h1>
          <p>Parrafo</p>
          <div className='inputs-container'>
            <InputField label={'Código Alumno'} type={'text'} icon={<FaUserGraduate/>} isPassword={false}/>
            <InputField label={'Contraseña'} type={'password'} isPassword={true}/>
          </div>
          {/* BUTTON COMPONENT */}
          <p>parrafo</p>
        </div>
      </div>

    </div>
      
  )
}

export default App
