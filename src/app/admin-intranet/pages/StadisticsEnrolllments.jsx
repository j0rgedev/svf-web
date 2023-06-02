import styled from "styled-components";
import avatar from "../assets/avatar.png";
import MainHeader from "../components/MainHeader.jsx";
import React from "react";
import Bars from "../components/BarGraphic.jsx";
import { Lineals } from "../components/LinealGraphic";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CenteredDoughnutChart from "../components/DoughnutGrafics";

ChartJS.register(ArcElement, Tooltip, Legend);

export const dataBar1 = {
    labels: ['3', '4', '5'],
    datasets: [
        {
            label: '# de Matriculados',
            data: [3, 6, 9],
            backgroundColor: '#00D87D',
            borderColor: '#00D87D',
            borderWidth: 0.5,
            borderRadius: 5,
            height:244,
        }
    ]
};

const optionsBar1 = {
    plugins: {
        legend: {
            display: false
        }
    },

    maintainAspectRatio: 0,
    barThickness: 40,
};

export const dataBar2 = {
    labels: ['1°', '2°', '3°', '4°', '5°', '6°'],
    datasets: [
        {
            label: '# de Matriculados',
            data: [3, 6, 9, 4, 3, 6],
            backgroundColor: '#00B4D8',
            borderColor: '#00D87D',
            borderWidth: 0.5,
            borderRadius: 5,
        }
    ]
};

const optionsBar2 = {
    plugins: {
        legend: {
            display: false
        }
    },

    maintainAspectRatio: 0,
    barThickness: 40,
};

export const dataBar3 = {
    labels: ['1°', '2°', '3°', '4°', '5°'],
    datasets: [
        {
            label: '# de Matriculados',
            data: [3, 6, 9, 4, 6],
            backgroundColor: '#C34F0F',
            borderColor: '#C34F0F',
            borderWidth: 0.5,
            borderRadius: 5,
        }
    ]
};

const optionsBar3 = {
    plugins: {
        legend: {
            display: false
        }
    },

    maintainAspectRatio: 0,
    barThickness: 40,
};

export const dataDoughnut = {
    labels: ['Mujeres', 'Hombres'],
    datasets: [
        {
            label: '# de Matriculados',
            data: [3, 6],
            backgroundColor: [
                '#AB26AE',
                '#2970C4',
            ],
            borderColor: [
                '#AB26AE',
                '#2970C4',
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


const labels1 = ['2020', '2021', '2022', '2023'];

export const dataLineal = {
    labels: labels1,
    datasets: [
        {
            label: 'Inicial',
            data: labels1.map(() => Math.floor(Math.random() * (1000 - 800 + 1)) + 800),
            borderColor: 'rgb(53, 162, 135)',
            backgroundColor: 'rgba(0, 128, 0, 0.5)',
        },
        {
            label: 'Primaria',
            data: labels1.map(() => Math.floor(Math.random() * (1000 - 800 + 1)) + 800),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Secundaria',
            data: labels1.map(() => Math.floor(Math.random() * (1000 - 800 + 1)) + 800),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

const optionsLineal = {
    plugins: {
        legend: {
            position: 'bottom',
        },
    },
};

export function StadisticsEnrollments() {

    return (
        <>
            <MainHeader isSearch={false} text={'Jhon K.'} src={avatar} />
            <ContentContainer>
                <ContentDoughnnut>
                    <TitleBar>Alumnos Matriculados</TitleBar>
                    <CenteredDoughnutChart data={dataDoughnut} options={optionsDoughnut} total="65%" />
                </ContentDoughnnut>
                <ContentLineal>
                    <TitleLine>Aumento y disminucion de matriculas</TitleLine>
                    <Lineals data={dataLineal} options={optionsLineal} />
                </ContentLineal>
            </ContentContainer>
            <ContentGraficsBar>
                <ContentGrafic>
                <TitleBar>Inicial</TitleBar>
                <ContentBar>
                    <Bars data={dataBar1} options={optionsBar1} />
                </ContentBar>
                </ContentGrafic>
                <ContentGrafic>
                <TitleBar>Primaria</TitleBar>
                <ContentBar2>
                    <Bars data={dataBar2} options={optionsBar2} />
                </ContentBar2>
                </ContentGrafic>
                <ContentGrafic>
                <TitleBar>Secundaria</TitleBar>
                <ContentBar3>
                    <Bars data={dataBar3} options={optionsBar3} />
                </ContentBar3>
                </ContentGrafic>
            </ContentGraficsBar>
        </>
    )
}

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const ContentGraficsBar = styled.div`
    display: flex;
    justify-content: space-between;
`;
const ContentGrafic = styled.div`
    height: 300px;
    margin-top: 2rem;
    background: rgb(21, 30, 26);
`;
const ContentBar2 = styled.div`
	width: 400px;
    height: 260px;
    padding: 1rem;
    background-color: #151E1A;
`;
const ContentBar3 = styled.div`
	width: 350px;
    height: 260px;
    padding: 1rem;
    background-color: #151E1A;
`;
const ContentBar = styled.div`
	width: 300px;
    height: 260px;
    padding: 1rem;
    background-color: #151E1A;
`;
const ContentDoughnnut = styled.div`
    display: flex;
    width: 450px;
    height: 310px;
    padding: 1rem;
    background-color: rgb(21, 30, 26);
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
`;
const ContentLineal = styled.div`
	width: 600px;
    height: 310px;
    padding: 1rem 2rem 2rem 2rem;
    background-color: #151E1A;
    margin-top: 2rem;
`;
const TitleBar = styled.h4`
    text-align: center;
    background: rgb(21, 30, 26);
    margin-top:10px;
`;
const TitleLine = styled.h4`
    text-align: center;
    background: rgb(21, 30, 26);
`;