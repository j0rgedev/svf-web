import React from 'react';
import styled from 'styled-components';
import Inputfields_newStudent from '../../components/Inputfields_newStudent.jsx';
import ButtonGeneral from '../../components/ButtonGeneral.jsx';


const Container = styled.div``;

const ProgressContainer = styled.div`
  width: 100%;
  padding-left: 18rem;
  margin-top: 5rem;
  padding-right: 2rem;
`;

const Content = styled.div`
  width: 100%;
  padding-left: 20rem;
  margin-top: 5rem;
`;

const Title = styled.h1`
  text-align: center;
`;

const InputsContainer = styled.div`
  margin: 3rem 0rem;
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 5rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  gap: 30rem;
`;

export function Attorney_Dates({ handleNextClick }) {

  const handleClickNext = () => {
    handleNextClick(); 
  };
   
  return (
    
      <Content>
        <Title>Apoderado del estudiante</Title>
        <InputsContainer>
          <Inputfields_newStudent text={'Nombres'} type={'text'} />
          <Inputfields_newStudent text={'Apellidos'} type={'text'} />
          <Inputfields_newStudent text={'DNI'} type={'text'} />
          <Inputfields_newStudent text={'Nacimmiento'} type={'date'} />
          <Inputfields_newStudent text={'Télefono'} type={'text'} />
          <Inputfields_newStudent text={'Direccion'} type={'text'} />
          <Inputfields_newStudent text={'Parentesco'} type={'text'} />
          <ButtonContainer>
          <ButtonGeneral text={'REGRESAR'} /* onClick={handleBackClick} */ />
          <ButtonGeneral text={'SIGUIENTE'} onClick={handleClickNext} />
        </ButtonContainer>
        </InputsContainer>
        
      </Content>
    
  );
}