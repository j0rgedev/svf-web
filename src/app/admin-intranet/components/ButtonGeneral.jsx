import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #1E656D;
  padding: 0.5rem 1.5rem;
  border-radius: 0.2rem;
  outline: none;
  border: none;
  color: #fff;
`;

export default function ButtonGeneral({ text }) {
  return (
    <StyledButton>
      {text}
    </StyledButton>
  );
}
