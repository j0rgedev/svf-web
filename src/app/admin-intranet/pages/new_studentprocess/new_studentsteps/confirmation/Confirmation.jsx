import React from 'react';
import styled from 'styled-components';
import SidebarAdmin from '../../../../components/SidebarAdmin';
import TopAdmin from '../../../../components/TopAdmin';
import ProgressBar from '../../../../components/ProgressBar';
import avatar from '../../../../assets/avatar.png';
import ButtonGeneral from '../../../../components/ButtonGeneral';
import { BsFillCheckSquareFill } from 'react-icons/bs';

const Container = styled.div``;

const ProgressContainer = styled.div`
  width: 100%;
  padding-left: 18rem;
  margin-top: 5rem;
  padding-right: 2rem;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  margin-left: 20rem;
`;

const ConfirmationIcon = styled(BsFillCheckSquareFill)`
  color: #9EFF00;
  width: 92px;
  height: 91px;
`;

const Content = styled.div`
  width: 100%;
  padding-left: 20rem;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Inputs = styled.div`
  display: flex;
  h1 {
    font-weight: 100;
  }
`;

const Row1 = styled.h1`
  text-align: right;
  margin-right: 2rem;
`;

const Row2 = styled.h1`
  text-align: right;
  margin-right: 2rem;
  margin-left: 8rem;
`;

const ButtonContainer = styled.div`
  margin: 5rem 0rem;
`;

export function Confirmation({ cod, password }) {
  return (
    <Container>
      <SidebarAdmin />
      <TopAdmin isSearch={false} text={'Jhon K.'} src={avatar} />
      <ProgressContainer>
        <ProgressBar className1={"active"} className2={"active"} className3={"active"} />
      </ProgressContainer>
      <IconContainer>
        <ConfirmationIcon className={'confirmation-icon'} />
      </IconContainer>
      <Content>
        <Title>Confirmación de nuevo estudiante</Title>
        <Inputs>
          <Row1 id='row1'>Código:</Row1>
          <h1>{cod}</h1>
        </Inputs>
        <Inputs>
          <Row2 id='row2'>Contraseña:</Row2>
          <h1>{password}</h1>
        </Inputs>
        <ButtonContainer>
          <ButtonGeneral text={'REGRESAR'} />
        </ButtonContainer>
      </Content>
    </Container>
  );
}
