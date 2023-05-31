import styled from "styled-components";
import avatar from "../assets/avatar.png";
import MainHeader from "../components/MainHeader.jsx";
import React from "react";
import Bars from "../components/BarGraphic.jsx";
import LastStudentsTable from "../components/LastTable/LastStudentTable";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CenteredDoughnutChart from "../components/DoughnutGrafics";

ChartJS.register(ArcElement, Tooltip, Legend);

export const dataBar = {
  labels: ['Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      data: [3, 6, 9, 4, 5, 8, 2, 8, 3, 4],
      backgroundColor: ['white', 'white', 'white', '#0077B6', 'white', 'white', 'white', 'white', 'white', 'white'],
      borderColor: ['white', 'white', 'white', '#0077B6', 'white', 'white', 'white', 'white', 'white', 'white'],
      borderWidth: 1,
      borderRadius: 5,
    }
  ]
};

const optionsBar = {
  plugins: {
    legend: {
      display: false
    }
  }
};

export const dataDoughnut = {
  labels: ['300', '1200'],
  datasets: [
    {
      label: '# de Matriculados',
      data: [3, 6],
      backgroundColor: [
        '#FFFFFF',
        '#672DE3',
      ],
      borderColor: [
        '#FFFFFF',
        '#672DE3',
      ],
      borderWidth: 1,
      cutout: '80%'
    },
  ],
};

const optionsDoughnut = {
  plugins: {
    legend: {
      position: 'right',
      labels: {
        padding: 50, 
      },
    },
  },
};

export function Dashboard() {

  return (
    <>
      <MainHeader isSearch={false} text={'Jhon K.'} src={avatar} />
      <ContentContainer>
        <ContentBar>
          <TitleBar>Recaudacion de pensiones en los ultimos meses</TitleBar>
          <Bars data={dataBar} options={optionsBar} />
        </ContentBar>
        <ContentDoughnnut>
          <TitleBar>Alumnos Matriculados</TitleBar>
          <CenteredDoughnutChart data={dataDoughnut} options={optionsDoughnut} total="75%" />
        </ContentDoughnnut>
      </ContentContainer>
      <Title>Ultimos 5 estudiantes</Title>

      <TableContainer>
        <LastStudentsTable
        />
      </TableContainer>
    </>
  )
}

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ContentBar = styled.div`
    display: flex;
    width: 622px;
    height: 300px;
    padding: 1rem 1rem 2.5rem;
    background-color: rgb(21, 30, 26);
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
`;
const ContentDoughnnut = styled.div`
    display: flex;
    width: 400px;
    height: 300px;
    padding: 1rem;
    background-color: rgb(21, 30, 26);
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
`;
const TitleBar = styled.h4`
    text-align: center;
    margin-bottom:10px;
`;

const Title = styled.h1`
  margin-top: 2rem;
  text-align: left;
`;

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1 1 0;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
`;