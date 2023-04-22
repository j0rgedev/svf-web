import Sidebar from '../../../components/sidebar/Sidebar.jsx'
import Button from '../../../components/button/Button.jsx'
import './smsValidationStyles.css'
import '../../styles/globals.css'

function SmsValidation() {
  return (
      <div className='container'>
        <Sidebar width={'40%'}/>
        <div className='right-container' style={{height: '60%'}}>
          <h1>VALIDACIÓN</h1>
          <h3>Te hemos enviado un código de verificación a tu número registrado</h3>
          <form className='sms-form'>
              <p>Por favor, ingresa el código</p>
              <input type="number" min={10000} max={99999}/>
              <Button text={'VALIDAR'} isMain={true} width={'100%'}/>
          </form>
        </div>
      </div>
    
  )
}

export default SmsValidation