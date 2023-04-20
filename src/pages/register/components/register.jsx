import InputField from '../../../common/components/Inputfield/Inputfield'
import Sidebar from '../../../common/components/Sidebar/Sidebar'
import {FaUserGraduate} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import Button from '../../../common/components/Button/Button'
import { useState } from 'react'
import '../../register/styles/styles.css'

function Register() {
  const [showPassword, setshowPassword]=useState(false)
  return (
      <div className='container2'>
        <Sidebar width={'40%'}/>
        <div className='right-container2'>
          <h1>CREACIÓN DE CONTRASEÑA</h1>
          <h3>Por favor, registre cuidadosamente cada dato</h3>
          <form className='inputs-container2'>
            <InputField label={'Código de Alumno'} type={"text"} icon={<FaUserGraduate/>} isPassword={false}/>
            <InputField label={'Contraseña'} type={showPassword ? "text":"password"} icon={<RiLockPasswordFill/>} 
            isPassword={true} onClick={() => setshowPassword (!showPassword)} />
            <InputField label={'Confirmar Contraseña'} type={showPassword ? "text":"password"} icon={<RiLockPasswordFill/>}
            isPassword={true} onClick={() => setshowPassword (!showPassword)} />
            <Button text={'REGISTRARSE'} isMain={true} width={'100%'}/>
          </form>
          
        </div>
      </div>
    
  )
}

export default Register
