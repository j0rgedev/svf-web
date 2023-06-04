import InputField from '../../enrollment-system/components/InputField.jsx'
import {FaUserAlt} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import CustomButton from '../components/CustomButton.jsx'
import {useLogin} from "../setup/api/loginAPI.js";
import {useFormik} from "formik";
import {loginSchema} from "../setup/schemas/loginSchema.js";
import {useMutation} from "react-query";
import React, {useEffect, useState} from "react";
import {setCookie} from "../setup/utils/cookiesConfig.js";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import toast, {Toaster} from "react-hot-toast";
import {isUserAdmin} from "../setup/utils/role.js";

function Login() {

	const [isSubmitting, setIsSubmitting] = useState(false)

	const navigate = useNavigate();

	const loginMutation = useMutation(
		{
			mutationFn: useLogin,
			onSuccess: ({data}) => {
				const token = data['accessToken']
				if (isUserAdmin(values.code_input)) {
					setCookie('SESSION', token, 1);
					navigate('/admin');
				} else {
					setCookie('SESSION', token, 0);
					navigate('/matricula/proceso');
				}
				setIsSubmitting(false)
			},
			onError: ({response}) => {
				setIsSubmitting(false)
				toast.error(response.data.message)
			}
		}
	)


	const onSubmit = async (values, actions) => {
		setIsSubmitting(true);
		await loginMutation.mutateAsync(values);
		if (loginMutation.isError) {
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

	return (
		<Container>
			<Toaster
				position={'top-center'}
			/>
			<h1 className={'title'}>INICIO DE SESIÓN</h1>
			<p className={'welcome-text'}>Bienvenido al colegio San Vicente Ferrer, ingresa tu datos para empezar</p>
			<Form onSubmit={handleSubmit}>
				<InputField
					labelText={'Código'}
					inputType={'text'}
					id={'code_input'}
					className={errors.code_input && touched.code_input ? 'code_input input-error' : ''}
					icon={<FaUserAlt/>}
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
					<CustomButton
						text={'Cargando...'}
						type={'submit'}
						className={'btn-login'}
						isMain={true}
						submit={true}
						isLoading={true}
					/>
				) : (
					<CustomButton
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

	)
}

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  min-height: 100vh;
  padding: 2rem clamp(1rem, 5vw, 2.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;

  .title {
    font-size: ${props => props.fontSize ? props.fontSize : 'clamp(42px, 5vw, 64px)'};
    text-align: center;
    line-height: 1.3;
  }

  .welcome-text {
    font-size: clamp(18px, 2vw, 24px);
    text-align: center;
    color: ${props => props.color ? props.color : 'unset'};
  }
}
`

const Form = styled.form`
  height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
`

export default Login

