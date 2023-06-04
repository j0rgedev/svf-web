import styled from 'styled-components';
import ActionButton from '../../components/buttons/ActionButton.jsx';
import avatar from '../../assets/student_avatar.png';
import StudentDetailsInput from '../../components/StudentDetailsInput.jsx';
import {MdEmail, MdSettingsCell} from 'react-icons/md';
import {BsFillPersonVcardFill} from 'react-icons/bs';
import {AiTwotoneCalendar} from 'react-icons/ai';
import {FaMapMarkedAlt} from 'react-icons/fa';
import {MdSchool} from 'react-icons/md';
import {SiLevelsdotfyi} from 'react-icons/si';
import {RiParentFill} from 'react-icons/ri';
import {HiIdentification} from "react-icons/hi";
import {useMutation, useQuery} from "react-query";
import {singleStudent} from "../../setup/api/singleStudent.js";
import {useParams} from "react-router-dom";
import {PropagateLoader} from "react-spinners";
import {useContext, useEffect, useState} from "react";
import {AlertContext} from "../../setup/context/AlertContext.jsx";
import {getCookie} from "../../../login/setup/utils/cookiesConfig.js";
import toast from "react-hot-toast";
import {Form, Formik} from "formik";
import {studentDetailsSchema} from "../../setup/schemas/studentDetailsSchema.js";
import {updateStudent} from "../../setup/api/updateStudent.js";

export function StudentDetails() {

	const {setAlert} = useContext(AlertContext)
	const [editMode, setEditMode] = useState(true);
	const studentCode = useParams().id.toUpperCase();
	const {mutate, data, isLoading, isIdle} = useMutation({
		mutationFn: singleStudent,
		onError: ({response}) => {
			toast.error(response.data.message)
		}
	})

	let toastId = null;

	const updateStudentMutation = useMutation({
		mutationFn: updateStudent,
		onSuccess: () => {
			toast.success('Estudiante actualizado con éxito', {id: toastId, duration: 2000});
		},
		onError: () => {
			toast.error('Error al actualizar estudiante', {id: toastId, duration: 2000});
		}
	})

	useEffect(() => {
		const token = getCookie('SESSION').token;
		mutate({token, studentCode});
	}, [])


	const handleDelete = () => {
		setAlert({
			title: 'Estas a punto de eliminar a un estudiante',
			message: '¿Estas seguro de que quieres eliminar a este estudiante? Esta acción no puede deshacerse',
			data: {studentCode: studentCode},
		})
	}

	const handleEdit = () => {
		setEditMode(!editMode);
	}

	const onSubmit = async (values) => {
		const date = new Date(values.birthday);
		const formattedDate = date.toISOString();

		const body = JSON.stringify({
			newDni: values.dni,
			newPhone: values.phone,
			newEmail: values.email,
			newBirthday: formattedDate,
			newAddress: values.address,
			newLevel: values.level,
			newGrade: values.grade,
		});
		const token = getCookie('SESSION').token;
		toastId = toast.loading('Actualizando estudiante...');
		const data = {token, studentCode, body};
		await updateStudentMutation.mutateAsync(data);
	}

	if (isLoading || isIdle) {
		return <Container><PropagateLoader color={'#ffffff'}/></Container>
	}

	return (
		<Container>
			<TopContainer>
				<TitleNameContainer>
					<Title>{data.data['names'] + " " + data.data['lastNames']}</Title>
					<InputContainer>
						{<HiIdentification size={30}/>}
						<InputField
							name={'studentCod'}
							value={data.data['studentCod']}
							type={'text'}
							disabled={true}
						/>
					</InputContainer>
				</TitleNameContainer>
				<ImageWrapper>
					<img src={avatar} alt="student_photo"/>
				</ImageWrapper>
			</TopContainer>
			<InfoContainer>
				<Formik
					initialValues={{
						dni: data.data['dni'],
						phone: data.data['phone'],
						email: data.data['email'],
						birthday: data.data['birthday'],
						level: data.data['currentLevel'],
						grade: data.data['currentGrade'],
						address: data.data['address'],
					}}
					validationSchema={studentDetailsSchema}
					onSubmit={onSubmit}
				>
					{
						({errors, isValid}) => (
							<Form>
								<StudentInfoWrapper>
									<InputsContainer>
										<StudentDetailsInput
											icon={<BsFillPersonVcardFill size={30}/>}
											disabled={editMode}
											label={'DNI'}
											name={'dni'}
											type={'number'}
										/>
										<StudentDetailsInput
											icon={<MdSettingsCell size={30}/>}
											disabled={editMode}
											name={'phone'}
											type={'number'}
										/>
										<StudentDetailsInput
											icon={<MdEmail size={30}/>}
											disabled={editMode}
											name={'email'}
											type={'email'}
										/>
										<StudentDetailsInput
											icon={<AiTwotoneCalendar size={30}/>}
											disabled={editMode}
											name={'birthday'}
											type={'date'}
										/>
										<StudentDetailsInput
											icon={<MdSchool size={30}/>}
											disabled={editMode}
											name={'level'}
											type={'text'}
										/>
										<StudentDetailsInput
											icon={<SiLevelsdotfyi size={30}/>}
											disabled={editMode}
											name={'grade'}
											type={'text'}
										/>
										<StudentDetailsInput
											icon={<FaMapMarkedAlt size={30}/>}
											disabled={editMode}
											name={'address'}
											type={'text'}
										/>
									</InputsContainer>
									<ButtonContainer>
										<ActionButton
											className={"thirdButton"}
											text={"Editar"}
											onClickFn={handleEdit}
											type={editMode ? "submit" : "button"}
											disabled={Object.keys(errors).length > 0 || !isValid}
										/>
										<ActionButton
											className={"secondButton"}
											text={"Eliminar"}
											onClickFn={handleDelete}
										/>
									</ButtonContainer>
								</StudentInfoWrapper>
							</Form>
						)
					}
				</Formik>
				<StyledLink href="#">
					<RiParentFill size={30}/>Ver apoderados
				</StyledLink>
			</InfoContainer>
		</Container>
	);
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
`

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 220px;
  width: 100%;
`;

const StudentInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const TitleNameContainer = styled.div`
  text-align: left;
  width: 70%;
`;

const Title = styled.h1`
  text-align: left;
  font-size: clamp(38px, 5vw, 50px);
`;

const Paragraph = styled.p`
  text-align: left;
`;

const ImageWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;

  img {
    border-radius: 50%;
    height: 100%;
    object-fit: cover;
    background: darkgray;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  width: 300px;
  gap: 8px;
`;

const InputField = styled.input`
  padding: 8px;
  outline: none;
  border: none;
  color: #fff;
  background-color: rgba(140, 140, 140, 0.1);
  font-size: 20px;
  width: 100%;
  transition: all .5s ease-in-out;

  &::placeholder {
    color: white;
  }

  &:disabled {
    color: #d7d7d7;
    background-color: transparent;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 4rem;
`

const InputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80%;
  width: 70%;
  gap: 20px 20px;
  flex-wrap: wrap;
`

const ButtonContainer = styled.div`
  gap: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: flex-end;
  font-size: 20px;
  color: #fff;
`;