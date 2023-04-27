import Sidebar from '../../../components/sidebar/Sidebar.jsx'
import Button from '../../../components/Button.jsx'
import './smsValidationStyles.css'
import '../../styles/globals.css'
import { useFormik } from "formik";
import { smsvalidationSchema } from "../../../config/sms-validationSchema.js";
import InputField from '../../../components/inputField/InputField.jsx'

function SmsValidation() {

  const onSubmit = async (values, actions) => {
    console.log(values)
    console.log(actions)
  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues: {
      code_sms: '',
    },
    validationSchema: smsvalidationSchema,
    onSubmit
  })
  return (
    <div className='container'>
      <Sidebar width={'40%'} />
      <div className='right-container' style={{ height: '60%' }}>
        <h1>VALIDACIÓN</h1>
        <h3>Te hemos enviado un código de verificación a tu número registrado</h3>
        <form className='sms-form' onSubmit={handleSubmit}>
          <p>Por favor, ingresa el código</p>
          <InputField
          labelText={'CÓDIGO'}
          inputType={"number"}
          id={'code_sms'} 
          icon={''}
          className={errors.code_sms && touched.code_sms ? 'code_sms input-error' : ''}
          textValue={values.code_sms}
          blurFunction={handleBlur}
          changeFunction={handleChange}
          isValid={!errors.code_sms && touched.code_sms}
          errorText={errors.code_sms}/>

          <Button text={'VALIDAR'} isMain={true} width={'100%'} submit={true}/>
        </form>
      </div>
    </div>

  )
}

export default SmsValidation