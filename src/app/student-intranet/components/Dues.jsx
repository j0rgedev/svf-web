import styled from 'styled-components';

const Container = styled.div`
  background-color: #D7D3D1;
  display: flex;
  justify-content: space-between;
  font-size: clamp(12px, 5vw, 18px);
`;

const DuesText = styled.div`
  padding: 0.2rem 1rem 1rem 1rem;;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const DuesAmmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-left: 1px solid #A6A2A0;
  padding: 1.5rem 1rem 1rem 2rem;
`;

const Pin = styled.p`
  font-size: clamp(5px, 3vw, 12px);
`;

const State = styled.p`
  font-size: clamp(4px, 2.5vw, 10px);
  color: ${props => props.id === 'state' ? '#FF0000' : '#FF6B00'};
  background-color: ${props => props.id === 'state' ? '#DEC2C2' : '#DECEC3'};
  padding: 0.2rem;
  max-width: 54px;
  text-align: center;
  border-radius: 5px;
`;

const Text = styled.p`
  font-size: clamp(12px, 4vw, 18px);
`;

export default function Dues({ id, cod, text, nameState, ammount, date }) {
  const stateId = id === 'state' ? 'state' : 'state2';

  return (
    <Container>
      <DuesText>
        <Pin>{cod}</Pin>
        <Text>{text}</Text>
        <State id={stateId}>{nameState}</State>
      </DuesText>
      <DuesAmmount>
        <Text>{ammount}</Text>
        <Pin>{date}</Pin>
      </DuesAmmount>
    </Container>
  );
}
