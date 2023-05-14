import InputField from '../../../components/InputField.jsx'
import Sidebar from '../../../components/sidebar/Sidebar.jsx'
import {FaUserGraduate} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import Button from '../../../components/Button.jsx'
import {useLogin} from "../../../setup/api/loginAPI.js";
import './loginStyles.css'
import '../../styles/globals.css'
import {useFormik} from "formik";
import {loginSchema} from "../../../config/loginSchema.js";
import {useMutation} from "react-query";
import Alert from "../../../components/Alert.jsx";
import {useEffect, useState} from "react";
import {getCookie, isCookieExpired, setCookie} from "../../../setup/utils/cookiesConfig.js";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

function Login() {

    const [alertInfo, setAlertInfo] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate();

    const loginMutation = useMutation(
        {
            mutationFn: useLogin,
            onSuccess: (data) => {
                setIsSubmitting(false);
                if (data['redirectUrl']) {
                    navigate(data['redirectUrl']);
                } else {
                    const token = data['accessToken'];
                    setCookie('SESSION', token);
                    navigate('/matricula/proceso');
                }
            },
            onError: (data) => {
                setIsSubmitting(false);
                setAlertInfo({
                    type: "error",
                    text: "Ups, error inesperado",
                    subtext: "Por favor, intenta nuevamente. Si el error persiste, contácte con nosotros",
                });
                if (data.response.status === 401) {
                    setAlertInfo({
                        type: "error",
                        text: "Ups, inicio de sesión fallido",
                        subtext:
                            "Al parecer ingresaste mal tu código de estudiante o contraseña, por favor intenta nuevamente",
                    });
                }
            }
        }
    )

    const onSubmit = async (values, actions) => {
        setIsSubmitting(true);
        loginMutation.mutate(values);
        if (loginMutation.status === 'success' || loginMutation.status === 'error') {
            actions.resetForm();
        }
    }

    const onAlertClose = () => {
        setAlertInfo(null)
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

    useEffect(() => {
        const cookies = getCookie('SESSION');
        if (cookies && !isCookieExpired(cookies)) {
            navigate('/matricula/proceso');
        }
    }, [])

    return (
        <div className='container'>
            {alertInfo &&
                <Alert
                    alertType={alertInfo.type}
                    title={alertInfo.text}
                    description={alertInfo.subtext}
                    onClose={onAlertClose}
                />
            }
            <Sidebar width={'40%'} isMain={true}/>
            <div className='right-container' style={{height: '80%'}}>
                <Container>

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
                            errorText={errors.password_input}
                        />
                        {isSubmitting ? (
                            <Button
                                text={'Cargando...'}
                                type={'submit'}
                                className={'btn-login'}
                                isMain={true}
                                submit={true}
                                isLoading={true}
                            />
                        ) : (
                            <Button
                                text={'Ingresar'}
                                type={'submit'}
                                className={'btn-login'}
                                isMain={true}
                                submit={true}
                                isLoading={false}
                            />
                        )}
                    </form>
                </Container>
            </div>
        </div>

    )
}

const Container = styled.div`
    width: 100%;
  height: 100%;
  padding: 1rem 1.5rem;
`

export default Login
