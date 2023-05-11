import InputField from '../../../components/InputField.jsx'
import Sidebar from '../../../components/sidebar/Sidebar.jsx'
import {FaUserGraduate} from 'react-icons/fa'
import Button from '../../../components/Button.jsx'
import './updatePasswordStyles.css'
import '../../styles/globals.css'
import {RiLockPasswordFill} from 'react-icons/ri'
import {useFormik} from "formik";
import {updatePwdSchema} from "../../../config/update-pwdSchema.js";
import {useEffect, useState} from "react";
import Alert from "../../../components/Alert.jsx";
import {useMutation} from "react-query";
import {useUpdatePwd} from "../../../setup/api/updatePasswordAPI.js";
import {getCookie, setCookie} from "../../../setup/utils/cookiesConfig.js";
import {useNavigate} from "react-router-dom";

function UpdatePassword() {

    const [alertInfo, setAlertInfo] = useState(null);
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
                    text: "Ups, autoriación fallida",
                    subtext: "Vuelve a iniciar sesión e intenta nuevamente"
                });
            }
            setAlertInfo({
                type: "error",
                text: "Ups, error inesperado",
                subtext: "Por favor, intenta nuevamente. Si el error persiste, contácte con nosotros",
            });
        }
    })

    const onAlertClose = () => {
        setAlertInfo(null)
    }

    const onSubmit = async ({password_input}, actions) => {
        setIsSubmitting(true)
        const data = {password_input, tempCookie}
        console.log(data)
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
        validationSchema: updatePwdSchema,
        onSubmit
    })

    useEffect(() => {
        setTempCookie(getCookie('SESSION'))
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
            <Sidebar width={'40%'}/>
            <div className='right-container' style={{height: '90%'}}>
                <h1>CREACIÓN DE CONTRASEÑA</h1>
                <h3>Por favor, registre cuidadosamente cada dato</h3>
                <form className='pwd-form' onSubmit={handleSubmit}>
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
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword
