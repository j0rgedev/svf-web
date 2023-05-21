import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import CustomTextField from '../../../components/CustomTextField.jsx';
import NavigationButton from '../../../components/buttons/NavigationButton.jsx';
import {Form, Formik} from "formik";
import {representativeSchema} from "../../../setup/schemas/representativeSchema.js";
import {NewStudentContext} from "../../../setup/context/NewStudentContext.jsx";
import {useMutation} from "react-query";
import {newStudent} from "../../../setup/api/newStudent.js";
import toast from "react-hot-toast";

export function RepresentativeForm(
	{
		handleBackForm,
		handleNextForm,
		setNewStudentInfo
	}) {

	let toastId = null;
	const {studentInfo} = useContext(NewStudentContext);
	const cookie = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTVkYwMDA3IiwiaWF0IjoxNjg0NjE1Njc4LCJleHAiOjE2ODQ3MDIwNzh9.ImH5mgwsr046vYo_gx_X3akEMsI3kFu5NzJ5nVlfSjc"

	const newStudentMutation = useMutation({
		mutationFn: newStudent,
		onSuccess: ({data}) => {
			toast.success('Estudiante guardado con éxito', {id: toastId, duration: 2000});
			handleNextForm();
			setNewStudentInfo({
				studentCode: data['studentCode'],
				password: data['defaultPassword']
			})
		},
		onError: (error) => {
			console.log(error);
			toast.error('Error al guardar estudiante', {id: toastId, duration: 2000});
		}
	})

	const onSubmit = async (values, formikHelpers) => {
		const body = JSON.stringify({
			studentInfo: studentInfo,
			representativeInfo: values
		})
		const data = {token: cookie, info: body}
		toastId = toast.loading('Guardando estudiante...');
		await newStudentMutation.mutateAsync(data);
		formikHelpers.resetForm();
	}

	return (
		<Content>
			<Formik
				initialValues={{
					names: '',
					lastnames:'',
					dni: '',
					birthdate:'',
					direction:'',
					email: '',
					phone: '',
					occupation: '',
					kinship: '',
				}}
				validationSchema={representativeSchema}
				onSubmit={onSubmit}
			>
				{
					({isSubmitting}) => (
						<Form>
							<h1>Información del apoderado</h1>
							<InputsContainer>
								<CustomTextField
									label="Nombres"
									name="names"
									type="text"
								/>
								<CustomTextField
									label={'Apellidos'}
									name={'lastnames'}
									type={'text'}
								/>
								<CustomTextField
									label={'DNI'}
									name={'dni'}
									type={'number'}
								/>
								<CustomTextField
									label={'Nacimiento'}
									name={'birthdate'}
									type={'date'}
								/>
								<CustomTextField
									label={'Dirección'}
									name={'direction'}
									type={'text'}
								/>
								<CustomTextField
									label={'Correo personal'}
									name={'email'}
									type={'email'}/>
								<CustomTextField
									label={'Teléfono'}
									name={'phone'}
									type={'number'}/>
								<CustomTextField
									label={'Ocupación'}
									name={'occupation'}
									type={'text'}/>
								<CustomTextField
									label={'Parentesco'}
									name={'kinship'}
									type={'text'}/>
							</InputsContainer>
							<ButtonContainer >
								<BackButton
									type={'button'}
									onClick={handleBackForm}
								>
									REGRESAR
								</BackButton>
								<NavigationButton
									text={'SIGUIENTE'}
									type={'submit'}
									isLoading={isSubmitting}
								/>
							</ButtonContainer>
						</Form>
					)
				}
			</Formik>
		</Content>
	);
}

const BackButton = styled.button`
  background-color: #1E656D;
  padding: 0.5rem 1.5rem;
  border-radius: 0.2rem;
  outline: none;
  border: none;
  color: #fff;
  width: 280px;
  height: 50px;
  font-size: 22px;
  cursor: pointer;
  transition: .5s ease-in-out;

  &:hover {
    background-color: rgb(53 157 169);
  }
`

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
`;

const InputsContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 32px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;
