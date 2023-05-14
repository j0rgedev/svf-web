import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  color: #fff;
`;

const InputField = styled.input`
  padding: 6px;
  outline: none;
  border: none;
  width: 200px;
  color: #fff;
  background: #151E1A;
`;

export default function Inputfields_newStudent({ text }) {
  return (
    <InputContainer>
      <InputLabel>{text}</InputLabel>
      <InputField type={text} />
    </InputContainer>
  );
}
