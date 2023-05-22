import React, {useContext} from 'react';
import styled from 'styled-components';
import CustomTextField from '../../../components/CustomTextField.jsx';
import NavigationButton from '../../../components/buttons/NavigationButton.jsx';
import {Field, Form, Formik} from "formik";
import {studentSchema} from "../../../setup/schemas/studentSchema.js";
import {representativeSchema} from "../../../setup/schemas/representativeSchema.js";
import {NewStudentContext} from "../../../setup/context/NewStudentContext.jsx";

export function StudentForm(
	{
		handleNextForm
	}) {

	const {studentInfo, setStudentInfo} = useContext(NewStudentContext);

	return (
		<Content>
			<Formik
				initialValues={{
					names: studentInfo ? studentInfo.names : '',
					lastnames: studentInfo ? studentInfo.lastnames : '',
					dni: studentInfo ? studentInfo.dni : '',
					birthdate: studentInfo ? studentInfo.birthdate : '',
					direction: studentInfo ? studentInfo.direction : '',
					email: studentInfo ? studentInfo.email : '',
					phone: studentInfo ? studentInfo.phone : '',
					level: studentInfo ? studentInfo.level : '',
					grade: studentInfo ? studentInfo.grade : '',
				}}
				validationSchema={studentSchema}
				onSubmit={(values, formikHelpers) => {
					console.log('primer form')
					handleNextForm();
					setStudentInfo(values);
					formikHelpers.resetForm();
				}}
			>
				{
					() => (
						<Form>
							<h1>Información del estudiante</h1>
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
									label={'Nivel'}
									name={'level'}
									type={'text'}/>
								<CustomTextField
									label={'Grado'}
									name={'grade'}
									type={'text'}/>
							</InputsContainer>
							<ButtonContainer>
								<NavigationButton
									text={'SIGUIENTE'}
									type={'submit'}
								/>
							</ButtonContainer>
						</Form>
					)
				}
			</Formik>
		</Content>
	);
}

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
  justify-content: flex-end;
  margin-top: auto;
`;
