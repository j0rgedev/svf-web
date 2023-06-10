import styled from 'styled-components';
import Sections from '../components/sections';
import { FaMoneyBill } from 'react-icons/fa';
import { FaUserGraduate } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import Progress from '../components/Progress';
import avatar from '../../../../src/app/admin-intranet/assets/avatar.png';
import { motion, AnimatePresence } from 'framer-motion';

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
`;

const Image = styled.div`
  width: 100%;
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const AvatarImage = styled.img`
  border-radius: 20rem;
  width: 8%;
`;

const ContTargets = styled.div`
  background-color: #e1e1e1;
  padding: 2rem;
  border-radius: 3rem 3rem 0rem 0rem;
  color: black;
  gap: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const TitleSections =styled.h2`
    font-weight: 400;
    font-size: clamp(8px, 5vw, 20px);
`;

export default function StudentIntranet() {
  const sections = [
    { icon: <FaMoneyBill />, text: 'Pensiones', backgroundGradient: '#2B2F44, #3D4C6A, #7989A8', href:'/student/pensiones'},
    { icon: <FaBook />, text: 'Cursos', backgroundGradient: '#3B2B44, #4E3D6A, #8B79A8' },
    { icon: <FaCalendarAlt />, text: 'Horarios', backgroundGradient: '#44392B, #6A533D, #A89579' },
    { icon: <FaUserGraduate />, text: 'Matriculas', backgroundGradient: '#2F442B, #436A3D, #83A879' },
  ];

  return (
    <ContStudent>
      <TopContent>
        <Image>
          <AvatarImage src={avatar} />
        </Image>
        <h2>Bienvenido a tu portal estudiantil</h2>
        <p>Alonso, ya estamos cerca de acabar el año escolar!</p>
        <Progress month="Junio" width="50%"/>
      </TopContent>
      <ContTargets>
        <TitleSections>Secciones pensadas para ti</TitleSections>
        <AnimatePresence wait>
    {sections.map((section, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: index * 0.4 }}
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
      </ContTargets>
    </ContStudent>
  );
}
