import styled from "styled-components";
import avatar from "../../assets/avatar.png";
import MainHeader from "../../components/MainHeader.jsx";
import React, {useEffect, useState} from "react";
import Bars from "../../components/BarGraphic.jsx";
import {Lineals} from "../../components/LinealGraphic.jsx";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import CenteredDoughnutChart from "../../components/DoughnutGrafics.jsx";
import {getCookie} from "../../../login/setup/utils/cookiesConfig.js";
import {secondDashboard} from "../../setup/api/adminDashboards.js";
import {useMutation} from "react-query";
import toast from "react-hot-toast";

ChartJS.register(ArcElement, Tooltip, Legend);


const optionsBar1 = {
	plugins: {
		legend: {
			display: false
		}
	},

	maintainAspectRatio: 0,
	barThickness: 40,
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

const optionsBar3 = {
	plugins: {
		legend: {
			display: false
		}
	},

	maintainAspectRatio: 0,
	barThickness: 40,
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

const optionsLineal = {
	plugins: {
		legend: {
			position: 'bottom',
		},
	},
};

export function EnrollmentDashboard() {

	const [dashboardData, setDashboardData] = useState({});
	const [totalStudents, setTotalStudents] = useState(0);

	const {mutate} = useMutation({
		mutationFn: secondDashboard,
		onSuccess: ({data}) => {
			setDashboardData(data);
			setTotalStudents(data.enrolledStudents.totalCount)
		},
		onError: () => {
			toast.error('Error al cargar los datos')
		}
	})


	const dataDoughnut = {
		labels: ['Mujeres', 'Hombres'],
		datasets: [
			{
				label: '# de Matriculados',
				data: [
					dashboardData?.enrolledStudents?.girlsCount || 0,
					dashboardData?.enrolledStudents?.boysCount || 0,
				],
				backgroundColor: [
					'#AB26AE',
					'#2970C4',
				],
				borderColor: [
					'#AB26AE',
					'#2970C4',
				],
				borderWidth: 1,
				cutout: '80%',
			},
		],
	};

	const dataLineal = {
		labels: ['2021', '2022', '2023'],
		datasets: [
			{
				label: 'Inicial',
				data: [dashboardData?.enrollmentByYear?.['2021']?.find(item => item.level === 'Inicial')?.count || 0,
					dashboardData?.enrollmentByYear?.['2022']?.find(item => item.level === 'Inicial')?.count || 0,
					dashboardData?.enrollmentByYear?.['2023']?.find(item => item.level === 'Inicial')?.count || 0],
				borderColor: 'rgb(53, 162, 135)',
				backgroundColor: 'rgba(0, 128, 0, 0.5)',
			},
			{
				label: 'Primaria',
				data: [dashboardData?.enrollmentByYear?.['2021']?.find(item => item.level === 'Primaria')?.count || 0,
					dashboardData?.enrollmentByYear?.['2022']?.find(item => item.level === 'Primaria')?.count || 0,
					dashboardData?.enrollmentByYear?.['2023']?.find(item => item.level === 'Primaria')?.count || 0],
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
			{
				label: 'Secundaria',
				data: [dashboardData?.enrollmentByYear?.['2021']?.find(item => item.level === 'Secundaria')?.count || 0,
					dashboardData?.enrollmentByYear?.['2022']?.find(item => item.level === 'Secundaria')?.count || 0,
					dashboardData?.enrollmentByYear?.['2023']?.find(item => item.level === 'Secundaria')?.count || 0],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};

	const inicialBarChart = {
		labels: ['3', '4', '5'],
		datasets: [
			{
				label: '# de Matriculados',
				data: Object.values(dashboardData?.enrollmentByLevelAndGrade?.['Inicial'] || {}).map(item => item || 0),
				backgroundColor: '#00D87D',
				borderColor: '#00D87D',
				borderWidth: 0.5,
				borderRadius: 5,
				height: 244,
			}
		]
	};

	const primariaBarChart = {
		labels: ['1°', '2°', '3°', '4°', '5°', '6°'],
		datasets: [
			{
				label: '# de Matriculados',
				data: Object.values(dashboardData?.enrollmentByLevelAndGrade?.['Primaria'] || {}).map(item => item || 0),
				backgroundColor: '#00B4D8',
				borderColor: '#00D87D',
				borderWidth: 0.5,
				borderRadius: 5,
			}
		]
	};

	const secundariaBarChart = {
		labels: ['1°', '2°', '3°', '4°', '5°'],
		datasets: [
			{
				label: '# de Matriculados',
				data: Object.values(dashboardData?.enrollmentByLevelAndGrade?.['Secundaria'] || {}).map(item => item || 0),
				backgroundColor: '#C34F0F',
				borderColor: '#C34F0F',
				borderWidth: 0.5,
				borderRadius: 5,
			}
		]
	};

	useEffect(() => {
		const token = getCookie('SESSION').token;
		mutate(token);
	}, []);

	return (
		<>
			<MainHeader isSearch={false} text={'Jhon K.'} src={avatar}/>
			<Title>Matrículas</Title>
			<ContentContainer>
				<ContentDoughnnut>
					<TitleBar>Alumnos Matriculados</TitleBar>
					{
						totalStudents > 0 && (
							<CenteredDoughnutChart
								data={dataDoughnut}
								options={optionsDoughnut}
								total={totalStudents}/>
						)
					}
				</ContentDoughnnut>
				<ContentLineal>
					<TitleLine>Aumento y disminucion de matriculas</TitleLine>
					<Lineals data={dataLineal} options={optionsLineal}/>
				</ContentLineal>
			</ContentContainer>
			<ContentGraficsBar>
				<ContentGrafic>
					<TitleBar>Matriculados Inicial</TitleBar>
					<ContentBar>
						<Bars data={inicialBarChart} options={optionsBar1}/>
					</ContentBar>
				</ContentGrafic>
				<ContentGrafic>
					<TitleBar>Matriculados Primaria</TitleBar>
					<ContentBar2>
						<Bars data={primariaBarChart} options={optionsBar2}/>
					</ContentBar2>
				</ContentGrafic>
				<ContentGrafic>
					<TitleBar>Matriculados Secundaria</TitleBar>
					<ContentBar3>
						<Bars data={secundariaBarChart} options={optionsBar3}/>
					</ContentBar3>
				</ContentGrafic>
			</ContentGraficsBar>
		</>
	)
}

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #FFFFFF;
    margin-top: 2rem;
    margin-left: 2rem;
    text-align: left;
`;

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
  margin-top: 10px;
`;
const TitleLine = styled.h4`
  text-align: center;
  background: rgb(21, 30, 26);
`;