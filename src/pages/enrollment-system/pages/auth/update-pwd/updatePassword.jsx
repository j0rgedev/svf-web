import InputField from '../../../components/inputField/InputField.jsx'
import Sidebar from '../../../components/sidebar/Sidebar.jsx'
import { FaUserGraduate } from 'react-icons/fa'
import Button from '../../../components/button/Button.jsx'
import './updatePasswordStyles.css'
import '../../styles/globals.css'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useFormik } from "formik";
import { updatePwdSchema } from "../../../config/update-pwdSchema.js";

function UpdatePassword() {

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
      code_input: '',
      password_input: '',
      confirmpassword: '',
    },
    validationSchema: updatePwdSchema,
    onSubmit
  })

  return (
    <div className='container'>
      <Sidebar width={'40%'} />
      <div className='right-container' style={{ height: '90%' }}>
        <h1>CREACIÓN DE CONTRASEÑA</h1>
        <h3>Por favor, registre cuidadosamente cada dato</h3>
        <form className='pwd-form' onSubmit={handleSubmit}>
          <InputField
            labelText={'Código de Alumno'}
            inputType={'text'}
            id={'code_input'}
            className={errors.code_input && touched.code_input ? 'code_input input-error' : ''}
            icon={<FaUserGraduate />}
            textValue={values.code_input}
            blurFunction={handleBlur}
            changeFunction={handleChange}
            isValid={!errors.code_input && touched.code_input}
            errorText={errors.code_input}
          />
          <InputField
            labelText={'Contraseña'}
            inputType={'password'}
            id={'password_input'}
            className={errors.password_input && touched.password_input ? 'password_input input-error' : ''}
            icon={<RiLockPasswordFill />}
            textValue={values.password_input}
            blurFunction={handleBlur}
            changeFunction={handleChange}
            isValid={!errors.password_input && touched.password_input}
            errorText={errors.password_input} />
          <InputField
            labelText={'Confirmar Contraseña'}
            id={'confirmpassword'}
            className={errors.confirmpassword && touched.confirmpassword ? 'password_input input-error' : ''}
            inputType={'password'}
            textValue={values.confirmpassword}
            icon={<RiLockPasswordFill />}
            blurFunction={handleBlur}
            changeFunction={handleChange}
            isValid={!errors.confirmpassword && touched.confirmpassword}
            errorText={errors.confirmpassword}
          />
          <Button
            text={'REGISTRARSE'}
            isMain={true} submit={true} />
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
