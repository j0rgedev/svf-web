import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 22rem;
  letter-spacing: 4px;
  border-radius: 1rem;
  height: 50px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  border: none;
  transition: 0.5s;
  margin-top: 20px;
  
  &:disabled {
    cursor: not-allowed;
    background-color: #cccc;
      
    &:hover {
      background-color: #cccc;
    }
  }

  &.mainButton {
    background-color: #51939B;
    color: white;
    
    &:hover {
      background-color: rgb(48 94 100);
    }
  }

  &.secondButton {
    background-color: #EF233C;
    border: 1px solid #656A51;
    color: white;
    
    &:hover {
      background-color: rgb(160 20 37);
    }
  }

  &.thirdButton {
    background-color: #C09463;
    border: 1px solid #656A51;
    color: white;
    
    &:hover {
      background-color: #785e42;
    }
  }
`;

export default function ButtonAdmin ({text, className}) {
  return (
    <StyledButton className={className}>
      {text}
    </StyledButton>
  )
}
