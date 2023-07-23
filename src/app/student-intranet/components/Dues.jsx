import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export default function Dues({ id, cod, text, nameState, amount, date, onClick, isSelected }) {
  const stateId = id === 'state' ? 'state' : 'state2';

  return (
    <Container
      className={'pension'}
      onClick={onClick}
      isSelected={isSelected}
    >
      {isSelected ? (
        <SelectedContent>
          <SelectedPin>{cod}</SelectedPin>
          <SelectedText>{text}</SelectedText>
        </SelectedContent>
      ) : (
        <DuesText>
          <Pin>{cod}</Pin>
          <Text>{text}</Text>
          <State id={stateId}>{nameState}</State>
        </DuesText>
      )}
      <DuesAmmount>
        <Text>S/{amount}</Text>
        <Pin>{date}</Pin>
      </DuesAmmount>
    </Container>
  );
}

const Container = styled(motion.div)`
  background-color: #d7d3d1;
  display: flex;
  justify-content: space-between;
  font-size: clamp(12px, 5vw, 18px);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${props => (props.isSelected ? '#d7d3d1' : '#d2d2d2')};
  }
`;

const DuesText = styled.div`
  padding: 0.2rem 1rem 1rem 1rem;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const SelectedContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SelectedPin = styled.p`
  font-size: clamp(5px, 3vw, 12px);
`;

const SelectedText = styled.p`
  font-size: clamp(12px, 4vw, 18px);
`;

const DuesAmmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-left: 1px solid #a6a2a0;
  padding: 1.5rem 1rem 1rem 2rem;
`;

const Pin = styled.p`
  font-size: clamp(5px, 3vw, 12px);
`;

const State = styled.p`
  font-size: clamp(4px, 2.5vw, 10px);
  color: ${props => (props.id === 'state' ? '#ff0000' : '#ff6b00')};
  background-color: ${props => (props.id === 'state' ? '#dec2c2' : '#decec3')};
  padding: 4px 8px;
  width: fit-content;
  text-align: center;
  border-radius: 5px;
`;

const Text = styled.p`
  font-size: clamp(12px, 4vw, 18px);
`;
