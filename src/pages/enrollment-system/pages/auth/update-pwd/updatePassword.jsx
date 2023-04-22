import InputField from '../../../components/inputField/InputField.jsx'
import Sidebar from '../../../components/sidebar/Sidebar.jsx'
import {FaUserGraduate} from 'react-icons/fa'
import Button from '../../../components/button/Button.jsx'
import './updatePasswordStyles.css'
import '../../styles/globals.css'
import {RiLockPasswordFill} from 'react-icons/ri'

function UpdatePassword() {

  return (
      <div className='container'>
        <Sidebar width={'40%'}/>
        <div className='right-container' style={{height: '90%'}}>
          <h1>CREACIÓN DE CONTRASEÑA</h1>
          <h3>Por favor, registre cuidadosamente cada dato</h3>
          <form className='pwd-form'>
            <InputField
                labelText={'Código de Alumno'}
                inputType={'text'}
                className={'cod-input'}
                icon={<FaUserGraduate/>}/>
            <InputField
                labelText={'Contraseña'}
                className={'pwd-input'}
                inputType={'password'}
                icon={<RiLockPasswordFill/>}/>
            <InputField
                labelText={'Confirmar Contraseña'}
                className={'confirmPwd-input'}
                inputType={'password'}
                icon={<RiLockPasswordFill/>}/>
            <Button
                text={'REGISTRARSE'}
                isMain={true}/>
          </form>
        </div>
      </div>
  )
}

export default UpdatePassword
