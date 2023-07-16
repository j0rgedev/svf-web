import styled from 'styled-components';
import Sections from '../components/sections';
import {FaMoneyBill} from 'react-icons/fa';
import {FaUserGraduate} from 'react-icons/fa';
import {FaBook} from 'react-icons/fa';
import {FaCalendarAlt} from 'react-icons/fa';
import Progress from '../components/Progress';
import student_img from '../assets/student_svf.png';
import avatar from '../../../../src/app/admin-intranet/assets/avatar.png';
import {motion, AnimatePresence} from 'framer-motion';
import {useQuery} from "react-query";
import {getCookie} from "../../login/setup/utils/cookiesConfig.js";
import {getStudent} from "../setup/api/student.js";
import {useState} from "react";
import {PropagateLoader} from "react-spinners";
import toast from "react-hot-toast";

export default function StudentIntranet() {

	const [student, setStudent] = useState(null)

	const {isLoading: isStudentLoading} = useQuery({
		queryKey: 'student',
		queryFn: async () => {
			const token = getCookie("SESSION").token
			return await getStudent(token)
		},
		onSuccess: ({data}) => {
			setStudent(data)
		},
		onError: () => {
			toast.error("No pudimos obtener tus datos")
		}
	})


	const sections = [
		{
			icon: <FaMoneyBill/>,
			text: 'Pensiones',
			backgroundGradient: '#2B2F44, #3D4C6A, #7989A8',
			href: '/estudiante/pensiones'
		},
		{icon: <FaBook/>, text: 'Cursos', backgroundGradient: '#3B2B44, #4E3D6A, #8B79A8'},
		{icon: <FaCalendarAlt/>, text: 'Horarios', backgroundGradient: '#44392B, #6A533D, #A89579'},
		{icon: <FaUserGraduate/>, text: 'Matrícula', backgroundGradient: '#2F442B, #436A3D, #83A879', href: '/estudiante/matricula'},
	];

	if (isStudentLoading && !student) return <Loader><PropagateLoader/></Loader>

	return (
		<ContStudent>
			<TopContent>
				<Image>
					<AvatarImage src={avatar}/>
				</Image>
				<h1>Bienvenido a tu portal estudiantil</h1>
				<p className={'main-paragraph'}>{student.studentName} ya estamos cerca de acabar el año escolar!</p>
				<Progress month="Julio" width="45%"/>
			</TopContent>
			<ContTargets>
				<TitleSections>Secciones pensadas para ti</TitleSections>
				<MainContent>
					<SectionsContainer>
						<AnimatePresence wait>
							{sections.map((section, index) => (
								<motion.div
									key={index}
									initial={{opacity: 0, y: -20}}
									animate={{opacity: 1, y: 0}}
									exit={{opacity: 0, y: -20}}
									transition={{duration: 0.5, delay: index * 0.4}}
									className={'student-section'}
								>
									<Sections
										icon={section.icon}
										text={section.text}
										backgroundGradient={section.backgroundGradient}
										href={section.href}
									/>
								</motion.div>
							))}
						</AnimatePresence>
					</SectionsContainer>
					<ImageWrapper>
						<img src={student_img} alt={'svf_boy'}/>
					</ImageWrapper>
				</MainContent>
			</ContTargets>
		</ContStudent>
	);
}

const Loader = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

const ContStudent = styled.div`
  background-color: #2b4433;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopContent = styled.div`
  padding: 1rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;

  h1 {
    font-size: clamp(28px, 5vw, 48px);
  }

  .main-paragraph {
    font-size: clamp(18px, 3vw, 24px);
    font-weight: 300;
  }
`;

const Image = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const MainContent = styled.div`
  display: flex;
	margin-top: 2rem;
`

const SectionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 70%;
	
	@media (max-width: 768px) {
		width: 100%;
  }
	
	.student-section {
		width: 100%;
		height: fit-content;
  }
`

const ImageWrapper = styled.div`
  width: 30%;
  height: 100%;
	display: flex;
	justify-content: center;
	
	@media (max-width: 768px) {
		display: none;
  }
`

const AvatarImage = styled.img`
  border-radius: 20rem;
  width: 8%;
`;

const ContTargets = styled.div`
  background-color: #e1e1e1;
  padding: 2rem;
  border-radius: 3rem 3rem 0 0;
  color: black;
  gap: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const TitleSections = styled.h2`
  font-weight: 400;
  font-size: clamp(8px, 5vw, 20px);
`;
