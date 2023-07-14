import styled from 'styled-components';
import Sections from '../components/sections';
import DivHistory from '../components/DivHistory';

const ContStudent = styled.div`
  background-color: #2b4433;
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SectionsH =styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Historial() {
  return (
      <SectionsH>
        <DivHistory cod={"#110010"} text={"Cuota Mes Marzo"} date={"24/10/23"}/>
        <DivHistory cod={"#110010"} text={"Cuota Mes Marzo"} date={"24/10/23"}/>
        <DivHistory cod={"#110010"} text={"Cuota Mes Marzo"} date={"24/10/23"}/>
        </SectionsH>
  );
}
