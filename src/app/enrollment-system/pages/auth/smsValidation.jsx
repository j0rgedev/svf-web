import Button from '../../components/Button.jsx'
import {useFormik} from "formik";
import {smsCodeSchema} from "../../setup/schemas/smsCodeSchema.js";
import InputField from '../../components/InputField.jsx'
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {useMutation} from "react-query";
import {useSMS} from "../../setup/api/smsAPI.js";
import {setCookie} from "../../setup/config/cookiesConfig.js";
import styled from "styled-components";
import {MainContainer, MainParagraph, MainTitle} from "../styles.js";
import {AlertInfoContext} from "../../setup/context/AlertInfoContext.jsx";

function SmsValidation() {

    const {setAlertInfo} = useContext(AlertInfoContext);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();

    const smsMutation = useMutation({
        mutationFn: useSMS,
        onSuccess: (data) => {
            setIsSubmitting(false);
            const token = data['tempToken'];
            setCookie('SESSION', token);
            navigate('/matricula/actualizacion');
        },
        onError: (data) => {
            setIsSubmitting(false);
            if (data.response.status === 401) {
                setAlertInfo({
                    type: "error",
                    text: "Ups, validación fallida",
                    subtext: "Código SMS inválido",
                });
            }
        }
    })

    const getTempToken = () => {
        return new URLSearchParams(window.location.search).get('tempToken');
    }


    const onSubmit = async ({code_sms}, actions) => {
        setIsSubmitting(true);
        const temp_token = getTempToken();
        const data = {
            code_sms,
            temp_token
        }
        smsMutation.mutate(data);
        if (smsMutation.status === 'success' || smsMutation.status === 'error') {
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
            code_sms: '',
        },
        validationSchema: smsCodeSchema,
        onSubmit
    })

    console.log(errors)

    return (
        <MainContainer>
            <Container>
                <MainTitle>VALIDACIÓN</MainTitle>
                <MainParagraph>Te hemos enviado un código de verificación a tu número registrado</MainParagraph>
                <Form onSubmit={handleSubmit}>
                    <p>Por favor, ingresa el código</p>
                    <InputWrapper>
                        <Input
                            type={"number"}
                            id={'code_sms'}
                            className={errors.code_sms && touched.code_sms ? 'code_sms input-error' : ''}
                            value={values.code_sms}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onInput={(e) => {
                                const value = e.target.value;
                                if (value.length > 5) {
                                    e.target.value = value.slice(0, 5);
                                }
                            }}
                            invalid={errors.code_sms && touched.code_sms}
                        />
                        {errors.code_sms && touched.code_sms ? (
                            <p className={'input-error'}>{errors.code_sms}</p>
                        ) : null}
                    </InputWrapper>
                    {isSubmitting ? (
                        <Button
                            text={'Cargando...'}
                            type={'submit'}
                            className={'validate-btn'}
                            isMain={true}
                            submit={true}
                            isLoading={true}
                        />
                    ) : (
                        <Button
                            text={'Validar'}
                            type={'submit'}
                            className={'validate-btn'}
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
  gap: 60px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    gap: 30px;
    margin-top: 20px;
  
    p{
      color: #6D6D6D;
      font-size: clamp(14px, 3vw, 18px);
    }
  
    .input-error {
        color: #FF0000;
    }
`

const InputWrapper = styled.div`
    width: 100%;
    margin-bottom: 24px;
  
    p {
      margin-top: 8px;
      text-align: center;
    }
`

const Input = styled.input`
    width: 100%;
    height: 50px;
    border: none;
    border-bottom: ${({invalid}) => invalid ? '1px solid #FF0000' : '1px solid #6D6D6D'};
    outline: none;
    text-align: center;
    font-size: clamp(22px, 3vw, 32px);
    letter-spacing: 15px;
`

export default SmsValidation