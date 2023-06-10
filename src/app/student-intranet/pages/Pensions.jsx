import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import avatar from '../../../../src/app/admin-intranet/assets/avatar.png';
import Dues from '../components/Dues';

const ContStudent = styled.div`
  background-color: #2b4433;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopContent = styled.div`
    padding: 1rem 2rem 2rem;
    display: flex;
    flex-direction: row;
    gap: 15px;
    text-align: center;
    align-items: center;
`;

const Image = styled.div`
  width: 100%;
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const AvatarImage = styled.img`
  border-radius: 20rem;
  width: 10%;

  @media (max-width: 540px) {
    width: 30px;
    }
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

const Return = styled.a`
    display: flex;
    align-items: center;
    cursor:pointer;
    text-decoration:none;
    color: white;
`;

const TitleSections =styled.h2`
    font-weight: 500;
    font-size: clamp(8px, 5vw, 24px);
`;

const ContTitle =styled.div`
    display: flex;
    justify-content: space-between;
`;

const ContSection =styled.div`
    gap: 20px;
    display: flex;
    border-bottom: #818181 solid 1px;
`;

const SectionDues =styled.a`
    border-bottom: rgb(59, 43, 68) solid 1px;  
    font-size: clamp(8px, 4vw, 18px);
    cursor:pointer;
    text-decoration:none;
    color: black;
`;
const SectionHistory =styled.a`
    font-size: clamp(8px, 4vw, 18px);
    cursor:pointer;
    text-decoration:none;
    color: black;
`;

export default function Pensions() {
  return (
    <ContStudent>
      <TopContent>
        <Return href='/student'><FaArrowLeft style={{ fontSize: '24px' }} /></Return>
        <h2>Pensiones</h2>
        <Image>
          <AvatarImage src={avatar} />
        </Image>
      </TopContent>
      <ContTargets>
      <ContTitle>
      <TitleSections>Deuda total</TitleSections>
      <TitleSections>S/. 1000.00</TitleSections>
      </ContTitle>
      <ContSection>
        <SectionDues>Cuotas</SectionDues>
        <SectionHistory href='/student/historial'>Historial</SectionHistory>
      </ContSection>
        <Dues 
        id={"state"} cod={"#10010"} text={"Cuota Mes Marzo"} 
        nameState={"Atrasado"} ammount={"s/ 200.00"} date={"24/10/2023"}
        />
        <Dues 
        id={"state2"} cod={"#10010"} text={"Cuota Mes Abril"} 
        nameState={"Pendiente"} ammount={"s/ 200.00"} date={"24/10/2023"}
        />
      </ContTargets>
    </ContStudent>
  );
}
