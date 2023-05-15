import InputField from '../../components/InputField.jsx'
import {FaUserGraduate} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import Button from '../../components/Button.jsx'
import {useLogin} from "../../setup/api/loginAPI.js";
import {useFormik} from "formik";
import {loginSchema} from "../../setup/schemas/loginSchema.js";
import {useMutation} from "react-query";
import {useContext, useEffect, useState} from "react";
import {getCookie, isCookieExpired, setCookie} from "../../setup/config/cookiesConfig.js";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {MainContainer, MainParagraph, MainTitle} from "../styles.js";
import {AlertInfoContext} from "../../setup/context/AlertInfoContext.jsx";

function Login() {

    const {setAlertInfo} = useContext(AlertInfoContext);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate();

    const loginMutation = useMutation(
        {
            mutationFn: useLogin,
            onSuccess: ({data}) => {
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
                    subtext: "Por favor, intenta nuevamente. Si el error persiste, contáctate con nosotros",
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
        if(loginMutation.isError) {
            actions.resetForm();
        }
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
        <MainContainer>
            <Container>
                <MainTitle>MATRÍCULA EN LÍNEA</MainTitle>
                <MainParagraph>Ingresa tus datos para empezar</MainParagraph>
                <Form onSubmit={handleSubmit}>
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
                </Form>
            </Container>
        </MainContainer>

    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

const Form = styled.form`
    height: 370px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
`

export default Login

