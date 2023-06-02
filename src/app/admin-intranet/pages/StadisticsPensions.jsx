import styled from "styled-components";
import avatar from "../assets/avatar.png";
import MainHeader from "../components/MainHeader.jsx";
import React from "react";
import CenteredDoughnutChart from "../components/DoughnutGrafics";
import { Lineals } from "../components/LinealGraphic";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CheckMonths from "../components/CheckMonths";
import DoughnutChart from "../components/RadialChart";


ChartJS.register(ArcElement, Tooltip, Legend);

export const dataDoughnut1 = {
    labels: ['Sin Pago', 'Pagaron'],
    datasets: [
        {
            label: '# Pensiones',
            data: [3, 6],
            backgroundColor: [
                '#FFFFFF',
                '#0F8E0C',
            ],
            borderColor: [
                '#FFFFFF',
                '#0F8E0C',
            ],
            borderWidth: 1,
            cutout: '80%'
        },
    ],
};

const optionsDoughnut1 = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 50, 
        },
      },
    },
  };
export const dataDoughnut2 = {
    labels: ['Sin Pago', 'Pagaron'],
    datasets: [
        {
            label: ['# Pensiones'],
            data: [3, 6],
            backgroundColor: [
                '#50541F',
                '#189CD5',
            ],
            borderColor: [
                '#50541F',
                '#189CD5',
            ],
            borderWidth: 1,
            cutout: '80%',
            circumference: 180,
            rotation: 270,
        },
    ],
};

const optionsDoughnut2 = {
    plugins: {
        legend: {
            display: false,
        },
    },
};

const labels1 = ['Mar', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export const dataLineal = {
    labels: labels1,
    datasets: [
        {
            label: 'Pensiones',
            data: labels1.map(() => Math.floor(Math.random() * (50001 - 0)) + 0),
            borderColor: '#7E0732',
            backgroundColor: '#7E0732',
            tension: 0.5,
            fill: true,
        },
    ],
};

const optionsLineal = {
    scales: {
        y: {
            min: 0,
            max: 50000,
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
};



export function StadisticsPensions() {

    return (
        <>
            <MainHeader isSearch={false} text={'Jhon K.'} src={avatar} />
            <ContentContainer>
                <ContentLineal>
                    <TitleBar>Monto de Pensiones Recaudado</TitleBar>
                    <Lineals data={dataLineal} options={optionsLineal} />
                </ContentLineal>
                <ContentDoughnnut>
                    <TitleDoughnut>Alumnos al dia de Pagos</TitleDoughnut>
                    <DoughnutChart 
                    data={dataDoughnut1} 
                    options={optionsDoughnut1}  
                    />
                </ContentDoughnnut>
            </ContentContainer>
            <ContentGraficsBar>
                <ContentBar2>
                    <TitleBar>Monto de deuda de los estudiantes</TitleBar>
                    <DoughnutChart
                    data={dataDoughnut2} 
                    options={optionsDoughnut2} 
                    />
                </ContentBar2>
                    <ContentBar3>
                        <CheckMonths text={'Marzo'}/>
                        <CheckMonths text={'Abril'}/>
                        <CheckMonths text={'Mayo'}/>
                        <CheckMonths text={'Junio'}/>
                        <CheckMonths text={'Julio'}/>
                        <CheckMonths text={'Agosto'}/>
                        <CheckMonths text={'Septiembre'}/>
                        <CheckMonths text={'Octubre'}/>
                        <CheckMonths text={'Noviembre'}/>
                        <CheckMonths text={'Diciembre'}/>
                    </ContentBar3>
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
    gap: 50px;
    justify-content: space-between;
`;

const ContentBar2 = styled.div`
	width: 400px;
    height: 300px;
    padding: 1rem;
    background-color: #151E1A;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ContentBar3 = styled.div`
    width: 650px;
    height: 300px;
    padding: 1rem;
    background-color: rgb(21, 30, 26);
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: row;
`;

const ContentDoughnnut = styled.div`
    display: flex;
    width: 450px;
    height: 310px;
    background-color: rgb(21, 30, 26);
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
`;
const ContentLineal = styled.div`
    display: flex;
    width: 622px;
    height: 310px;
    padding: 1rem 1rem 2.5rem;
    background-color: rgb(21, 30, 26);
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
`;
const TitleBar = styled.h4`
    text-align: center;
    margin-bottom:10px;
`;
const TitleDoughnut = styled.h4`
    text-align: center;
    margin-top:10px;
`;