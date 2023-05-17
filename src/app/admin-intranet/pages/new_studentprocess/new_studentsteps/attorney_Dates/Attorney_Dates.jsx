import React from 'react';
import styled from 'styled-components';
import SidebarAdmin from '../../../../components/SidebarAdmin';
import TopAdmin from '../../../../components/TopAdmin';
import ProgressBar from '../../../../components/ProgressBar';
import Inputfields_newStudent from '../../../../components/Inputfields_newStudent';
import avatar from '../../../../assets/avatar.png';
import ButtonGeneral from '../../../../components/ButtonGeneral';

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

export function Attorney_Dates() {
  return (
    <Container>
      <SidebarAdmin />
      <TopAdmin isSearch={false} text={'Jhon K.'} src={avatar} />
      <ProgressContainer>
        <ProgressBar className1={"active"} className2={"complete"} className3={"desactive"} />
      </ProgressContainer>
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
          <ButtonGeneral text={'REGRESAR'} />
          <ButtonGeneral text={'SIGUIENTE'} />
        </ButtonContainer>
        </InputsContainer>
        
      </Content>
    </Container>
  );
}
