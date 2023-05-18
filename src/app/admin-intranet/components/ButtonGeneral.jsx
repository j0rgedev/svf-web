import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #1E656D;
  padding: 0.5rem 1.5rem;
  border-radius: 0.2rem;
  outline: none;
  border: none;
  color: #fff;
  width: 225px;
  height: 50px;
  font-size: 22px;
  cursor: pointer;
  
  &:hover {
    background-color: rgb(53 157 169);
  }
`;

export default function ButtonGeneral({ text , onClick}) {
  const handleClick=()=>{onClick}

  return (
    <StyledButton onClick={handleClick}>
      {text}
    </StyledButton>
  );
}
