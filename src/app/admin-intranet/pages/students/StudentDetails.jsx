import styled from 'styled-components';
import ActionButton from '../../components/buttons/ActionButton.jsx';
import avatar from '../../assets/student_avatar.png';
import InputsDetails from '../../components/StudentDetailsInput.jsx';
import {MdEmail, MdSettingsCell} from 'react-icons/md';
import {BsFillPersonVcardFill} from 'react-icons/bs';
import {AiTwotoneCalendar} from 'react-icons/ai';
import {FaMapMarkedAlt} from 'react-icons/fa';
import {MdSchool} from 'react-icons/md';
import {SiLevelsdotfyi} from 'react-icons/si';
import {RiParentFill} from 'react-icons/ri';
import {HiIdentification} from "react-icons/hi";
import {useQuery} from "react-query";
import {singleStudent} from "../../setup/api/singleStudent.js";
import {useParams} from "react-router-dom";
import {PropagateLoader} from "react-spinners";
import {useContext} from "react";
import {AlertContext} from "../../setup/context/AlertContext.jsx";

function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

function formatDate(dateString) {
	const date = new Date(dateString);
	return [
		date.getFullYear(),
		padTo2Digits(date.getMonth() + 1),
		padTo2Digits(date.getDate()),
	].join('-');
}

export function StudentDetails() {

	const {setAlert} = useContext(AlertContext)
	const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTVkYwMDA3IiwiaWF0IjoxNjg0NjE1Njc4LCJleHAiOjE2ODQ3MDIwNzh9.ImH5mgwsr046vYo_gx_X3akEMsI3kFu5NzJ5nVlfSjc"
	const studentCode = useParams().id.toUpperCase();
	const request = {token, studentCode}
	const {isLoading, data, isFetching} = useQuery('single-student', () => singleStudent(request), {staleTime: 0})


	const handleDelete = () => {
		setAlert({
			title: 'Estas a punto de eliminar a un estudiante',
			message: '¿Estas seguro de que quieres eliminar a este estudiante? Esta acción no puede deshacerse',
			data: { studentCode: studentCode },
		})
	}

	const handleEdit = () => {
		console.log('editando')
	}

	if (isLoading || isFetching) {
		return <Container><PropagateLoader color={'#ffffff'}/></Container>
	}

	const student = data.data
	return (
		<Container>
			<TopContainer>
				<TitleNameContainer>
					<Title>{student['names'] + " " + student['lastNames']}</Title>
					<InputsDetails
						icon={<HiIdentification size={30}/>}
						text={student['studentCod']}
						type={'text'}
						disabled={true}
					/>
				</TitleNameContainer>
				<ImageWrapper>
					<img src={avatar} alt="student_photo"/>
				</ImageWrapper>
			</TopContainer>
			<InfoContainer>
				<StudentInfoWrapper>
					<InputsContainer>
						<InputsDetails
							icon={<BsFillPersonVcardFill size={30}/>}
							text={student['dni']}
							type={'text'}
							disabled={true}/>
						<InputsDetails
							icon={<MdSettingsCell size={30}/>}
							text={student['phone']}
							type={'text'}
			               disabled={true}/>
						<InputsDetails
							icon={<MdEmail size={30}/>}
							text={student['email']}
							type={'email'}
							disabled={true}/>
						<InputsDetails
							icon={<AiTwotoneCalendar size={30}/>}
							text={formatDate(student['birthday'])}
							type={'date'}
							disabled={true}/>
						<InputsDetails
							icon={<MdSchool size={30}/>}
							text={student['currentLevel']}
							type={'text'}
							disabled={true}/>
						<InputsDetails
							icon={<SiLevelsdotfyi size={30}/>}
							text={student['currentGrade']}
							type={'text'}
							disabled={true}/>
						<InputsDetails
							icon={<FaMapMarkedAlt size={30}/>}
							text={student['address']}
							type={'text'}
							disabled={true}/>
					</InputsContainer>
					<ButtonContainer>
						<ActionButton
							className={"thirdButton"}
							text={"Editar"}
							onClickFn={handleEdit}
						/>
						<ActionButton
							className={"secondButton"}
							text={"Eliminar"}
							onClickFn={handleDelete}
						/>
					</ButtonContainer>
				</StudentInfoWrapper>
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