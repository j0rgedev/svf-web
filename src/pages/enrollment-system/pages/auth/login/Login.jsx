import InputField from '../../../components/inputField/InputField.jsx'
import Sidebar from '../../../components/sidebar/Sidebar.jsx'
import {FaUserGraduate} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import Button from '../../../components/button/Button.jsx'
import {useLogin} from "../../../setup/api/loginAPI.js";
import './loginStyles.css'
import '../../styles/globals.css'
import {useFormik} from "formik";
import {loginSchema} from "../../../config/loginSchema.js";
import axios from "axios";
import {useMutation, useQuery} from "react-query";
import { LOGIN_URL } from "../../../setup/api/endpoints.js";
import Alerts from "../../../components/alerts/Alerts.jsx";
import {AiFillAlert} from "react-icons/ai";
import { useState} from "react";

function Login() {

    const [isAlert, setIsAlert] = useState(null)

    const loginMutation = useMutation(
        {
            mutationFn: useLogin,
            onSuccess: (data) => {
                console.log(data)
                const token = data['accessToken'];
                sessionStorage.setItem('token', token);
            },
            onError: (data) => {
                if(data.response.status === 401){
                    setIsAlert({
                        text: 'Error',
                        subtext: 'Credenciales incorrectas'
                    })
                }
            }
        }
    )

    const onSubmit = async (values, actions) => {
        loginMutation.mutate(values);
        actions.resetForm();
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
            password_input: ''
        },
        validationSchema: loginSchema,
        onSubmit
    })

    return (
        <div className='container'>
            <Sidebar width={'40%'}/>
            <div className='right-container' style={{height: '80%'}}>
                {isAlert &&
                    <Alerts
                        isAlert={false}
                        icon={<AiFillAlert/>}
                        text={isAlert.text}
                        subtext={isAlert.subtext}/>
                }
                <h1>MATRÍCULA EN LÍNEA</h1>
                <h3>Ingresa tus datos para empezar</h3>
                <form className='login-form' onSubmit={handleSubmit}>
                    <InputField
                        labelText={'Código Alumno'}
                        inputType={'text'}
                        id={'code_input'}
                        className={errors.code_input && touched.code_input ? 'code_input input-error' : ''}
                        icon={<FaUserGraduate/>}
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
                        className={errors.code_input && touched.code_input ? 'password_input input-error' : ''}
                        icon={<RiLockPasswordFill/>}
                        textValue={values.password_input}
                        blurFunction={handleBlur}
                        changeFunction={handleChange}
                        isValid={!errors.password_input && touched.password_input}
                        errorText={errors.password_input}
                    />
                    <Button text={'INGRESAR'} isMain={true} submit={true}/>
                </form>
            </div>
        </div>
  )
}

export default Login

