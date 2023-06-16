import styled from 'styled-components';

const Container = styled.div`
  background-color: #D7D3D1;
  display: flex;
  justify-content: space-between;
  font-size: clamp(12px, 5vw, 18px);
  padding: 0.5rem;
  align-items: center;
`;

const Pin = styled.p`
  font-size: clamp(5px, 2.5vw, 18px);
`;

const ButtonDetail = styled.button`
  background: #2A490B;
  padding: 0.3rem;
  font-size: clamp(7px, 2.5vw, 14px);
  color: #FFFF;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(65 116 14);
    transition: 0.5s;
  }
`;

export default function DivHistory({cod, text, date }) {
  
    return (
      <Container>
        
          <Pin>{cod}</Pin>
          <Pin>{text}</Pin>
          <Pin>{date}</Pin>
          <ButtonDetail>Ver Recibo</ButtonDetail>
      </Container>
    );
  }
  