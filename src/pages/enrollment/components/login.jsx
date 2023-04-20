import InputField from '../../../common/components/Inputfield/Inputfield'
import Sidebar from '../../../common/components/Sidebar/Sidebar'
import {FaUserGraduate} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import Button from '../../../common/components/Button/Button'
import { useState } from 'react'
import '../../enrollment/styles/styles.css'


function Login() {
  const [showPassword, setshowPassword]=useState(false)
  return (
      <div className='container'>
        <Sidebar width={'60%'}/>
        <div className='right-container'>
          <h1>MATRíCULA EN LíNEA</h1>
          <h2>Ingresa tus datos para empezar</h2>
          <form className='inputs-container'>
            <InputField label={'Código Alumno'} type={"text"} icon={<FaUserGraduate/>} isPassword={false}/>
            <InputField label={'Contraseña'} type={showPassword ? "text":"password"} icon={<RiLockPasswordFill/>} 
            isPassword={true} onClick={() => setshowPassword (!showPassword)} />
            <Button text={'INGRESAR'} isMain={true} width={'100%'}/>
          </form>
          
          <p>¿Aún no tienes contraseña? <a href="">Créala</a></p>
        </div>
      </div>
    
  )
}

export default Login

