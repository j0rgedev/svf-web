import InputField from '../../components/InputField.jsx'
import Button from '../../components/Button.jsx'
import {RiLockPasswordFill} from 'react-icons/ri'
import {useFormik} from "formik";
import {passwordSchema} from "../../setup/schemas/passwordSchema.js";
import {useContext, useEffect, useState} from "react";
import {useMutation} from "react-query";
import {useUpdatePwd} from "../../setup/api/updatePasswordAPI.js";
import {getCookie, setCookie} from "../../setup/config/cookiesConfig.js";
import {useNavigate} from "react-router-dom";
import {MainContainer, MainParagraph, MainTitle} from "../styles.js";
import styled from "styled-components";
import {AlertInfoContext} from "../../setup/context/AlertInfoContext.jsx";

function UpdatePassword() {

    const {setAlertInfo} = useContext(AlertInfoContext);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [tempCookie, setTempCookie] = useState(null)
    const navigate = useNavigate();

    const updatePwdMutation = useMutation({
        mutationFn: useUpdatePwd,
        onSuccess: (data) => {
            const token = data['accessToken'];
            setCookie('SESSION', token);
            navigate('/matricula/proceso');
        },
        onError: (data) => {
            if (data.response.status === 401) {
                setAlertInfo({
                    type: "error",
                    text: "Ups, autorización fallida",
                    subtext: "Vuelve a iniciar sesión e intenta nuevamente"
                });
            }
            setAlertInfo({
                type: "error",
                text: "Ups, error inesperado",
                subtext: "Por favor, intenta nuevamente. Si el error persiste, contáctate con nosotros",
            });
        }
    })

    const onSubmit = async ({password_input}) => {
        setIsSubmitting(true)
        const data = {password_input, tempCookie}
        updatePwdMutation.mutate(data)
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
            password_input: '',
            confirmation_password_input: '',
        },
        validationSchema: passwordSchema,
        onSubmit
    })

    useEffect(() => {
        setTempCookie(getCookie('SESSION'))
    }, [])

    return (
        <MainContainer>
            <Container>
                <MainTitle>CREACIÓN DE CONTRASEÑA</MainTitle>
                <MainParagraph>Por favor, registre cuidadosamente cada dato</MainParagraph>
                <Form onSubmit={handleSubmit}>
                    <InputField
                        labelText={'Contraseña'}
                        inputType={'password'}
                        id={'password_input'}
                        className={errors.password_input && touched.password_input ? 'password_input input-error' : ''}
                        icon={<RiLockPasswordFill/>}
                        textValue={values.password_input}
                        blurFunction={handleBlur}
                        changeFunction={handleChange}
                        isValid={!errors.password_input && touched.password_input}
                        errorText={errors.password_input}/>
                    <InputField
                        labelText={'Confirmar Contraseña'}
                        id={'confirmation_password_input'}
                        className={errors.confirmation_password_input && touched.confirmation_password_input ? 'password_input input-error' : ''}
                        inputType={'password'}
                        textValue={values.confirmation_password_input}
                        icon={<RiLockPasswordFill/>}
                        blurFunction={handleBlur}
                        changeFunction={handleChange}
                        isValid={!errors.confirmation_password_input && touched.confirmation_password_input}
                        errorText={errors.confirmation_password_input}
                    />
                    {isSubmitting ? (
                        <Button
                            text={'Cargando...'}
                            type={'submit'}
                            className={'updatePwd-btn'}
                            isMain={true}
                            submit={true}
                            isLoading={true}
                        />
                    ) : (
                        <Button
                            text={'Actualizar'}
                            type={'submit'}
                            className={'updatePwd-btn'}
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
    gap: 30px;
`

const Form = styled.form`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  
    button{
      margin-top: 10px;
    }
`

export default UpdatePassword
