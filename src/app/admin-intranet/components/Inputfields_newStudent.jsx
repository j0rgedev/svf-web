import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputLabel = styled.label`
  color: #fff;
  font-size: 20px;
`;

const InputField = styled.input`
  padding: 12px;
  outline: none;
  border: none;
  width: 282px;
  color: #fff;
  background: #151E1A;
  font-size: 20px;
`;

export default function Inputfields_newStudent({ text }) {
  return (
    <InputContainer>
      <InputLabel>{text}</InputLabel>
      <InputField type={text} />
    </InputContainer>
  );
}
