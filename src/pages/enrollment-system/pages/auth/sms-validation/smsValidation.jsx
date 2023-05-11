import Sidebar from '../../../components/sidebar/Sidebar.jsx'
import Button from '../../../components/Button.jsx'
import './smsValidationStyles.css'
import '../../styles/globals.css'
import {useFormik} from "formik";
import {smsvalidationSchema} from "../../../config/sms-validationSchema.js";
import InputField from '../../../components/InputField.jsx'
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useMutation} from "react-query";
import {useSMS} from "../../../setup/api/smsAPI.js";
import Alert from "../../../components/Alert.jsx";
import {setCookie} from "../../../setup/utils/cookiesConfig.js";

function SmsValidation() {

    const [alertInfo, setAlertInfo] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();

    const smsMutation = useMutation({
        mutationFn: useSMS,
        onSuccess: (data) => {
            setIsSubmitting(false);
            const token = data['tempToken'];
            setCookie('SESSION', token);
            navigate('/matricula/actualizar-contraseña');
        },
        onError: (data) => {
            setIsSubmitting(false);
            if (data.response.status === 401) {
                setAlertInfo({
                    type: "error",
                    text: "Ups, validación fallida",
                    subtext: "Código inválido",
                });
            }
            setAlertInfo({
                type: "error",
                text: "Ups, error inesperado",
                subtext: "Por favor, intenta nuevamente. Si el error persiste, contácte con nosotros",
            });
        }
    })

    const getTempToken = () => {
        return new URLSearchParams(window.location.search).get('tempToken');
    }

    const onAlertClose = () => {
        setAlertInfo(null)
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
        validationSchema: smsvalidationSchema,
        onSubmit
    })

    return (
        <div className='container'>
            <Sidebar width={'40%'}/>
            <div className='right-container' style={{height: '60%'}}>
                {alertInfo &&
                    <Alert
                        alertType={alertInfo.type}
                        title={alertInfo.text}
                        description={alertInfo.subtext}
                        onClose={onAlertClose}
                    />
                }
                <h1>VALIDACIÓN</h1>
                <h3>Te hemos enviado un código de verificación a tu número registrado</h3>
                <form className='sms-form' onSubmit={handleSubmit}>
                    <p className={'sms-paragraph'}>Por favor, ingresa el código</p>
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
                </form>
            </div>
        </div>

    )
}

export default SmsValidation