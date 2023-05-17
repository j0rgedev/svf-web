import React from 'react';
import styled from 'styled-components';
import ButtonAdmin from '../components/ButtonAdmin.jsx';
import SidebarAdmin from '../components/SidebarAdmin.jsx';
import Table_students from '../components/Table_Students/Table_students.jsx';
import TopAdmin from '../components/TopAdmin.jsx';
import avatar from '../assets/avatar.png';


const Container = styled.div``;

const ContentContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 18rem;
`;

const QuickActionsContainer = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  width: 100%;
  
`;

const Title = styled.h1``;

const ButtonContainer = styled.div`
  gap: 50px;
  display: flex;
`;

const TableContainer = styled.div`
  width: 100%;
`;

export function Students() {
  return (
    <Container>
      <SidebarAdmin />
      <TopAdmin isSearch={true} text={'Jhon K.'} src={avatar} />
      <ContentContainer>
        <Content>
          <QuickActionsContainer>
            <Title>Acciones Rápidas</Title>
            <ButtonContainer>
              <ButtonAdmin className={'mainButton'} text={'AGREGAR NUEVO ALUMNO'} />
              <ButtonAdmin className={'secondButton'} text={'ELIMINAR ALUMNO'} />
            </ButtonContainer>
          </QuickActionsContainer>
          <TableContainer>
            <Table_students text={'Lista de estudiantes'} />
          </TableContainer>
        </Content>
      </ContentContainer>
    </Container>
  );
}