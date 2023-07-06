import styled, { ThemeContext } from 'styled-components';
import avatar from "../../assets/avatar.png";
import MainHeader from "../../components/MainHeader.jsx";
import React, { useEffect, useState, useContext } from "react";
import Bars from "../../components/BarGraphic.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getCookie } from "../../../login/setup/utils/cookiesConfig.js";
import {useMutation, useQuery} from "react-query";
import { mainDashboard } from "../../setup/api/adminDashboards.js";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { AiOutlineDown } from "react-icons/ai";
import LastStudentTableRow from "../../components/LastTable/LastStudentTableRow.jsx";
import {Pie} from "react-chartjs-2";
import { Lineals } from '../../components/LinealGraphic';

ChartJS.register(ArcElement, Tooltip, Legend);

const optionsBar = {
	plugins: {
		legend: {
			display: false
		}
	}
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

export function Dashboard() {

	const [month, setMonth] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);

	const handleCheckboxChange = (cod) => {
		if (selectedRow === cod) {
			setSelectedRow(null);
		} else {
			setSelectedRow(cod);
		}
	};

	const handleMonthChange = (e) => {
		setMonth(e.target.value);
	}

	const {data, isLoading} = useQuery({
		queryKey: ['mainDashboard', month],
		queryFn: async () => {
			const token = getCookie('SESSION').token;
			return await mainDashboard(token, month);
		},
		onError: () => {
			toast.error("Error al cargar los datos")
		}
	})

	const dataBar = {
		labels: ['Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		datasets: [
			{
				data: data?.data?.paidPensionsCount.map((item) => item.count) || [],
				backgroundColor: ['white', 'white', 'white', '#0077B6', 'white', 'white', 'white', 'white', 'white', 'white'],
				borderColor: ['white', 'white', 'white', '#0077B6', 'white', 'white', 'white', 'white', 'white', 'white'],
				borderWidth: 1,
				borderRadius: 5,
			}
		]
	};

	const pieData = {
		labels: ['Matriculados', 'No Matriculados'],
		datasets: [
			{
				label: '# de estudiantes',
				data: isLoading ? [0, 0] : [data?.data?.enrollmentCount?.enrolled || 0, data?.data?.enrollmentCount?.notEnrolled || 0],
				backgroundColor: [
					'rgba(255, 159, 64, 0.5)',
					'rgba(54, 162, 235, 0.5)',
				],
				borderColor: [
					'rgba(255, 159, 64, 1)',
					'rgba(54, 162, 235, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	const handleCreateReport = async () => {
		const token = getCookie('SESSION').token;
		await toast.promise(
			generateReport(token),
			{
				loading: 'Generando reporte...',
				success: 'Reporte guardado en la carpeta de descargas',
				error: 'Error al generar el reporte',
			}
		)
	}
	const dataLineal = {
		labels:  ['Mar', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		datasets: [
			{
				label: 'Matriculados',
				data: ['3', '4', '3', '5', '6', '3', '5', '6', '0'],
				borderColor: 'rgb(53, 162, 135)',
				backgroundColor: 'rgba(0, 128, 0, 0.5)',
			},
		],
	};

	const theme = useContext(ThemeContext);

	return (
		<>
			<MainHeader isSearch={false} text={'Jhon K.'} src={avatar} />
			<MainContent>
				<Filter>
					<MonthSelect name="MES" onChange={handleMonthChange}>
						<option value="0" selected={true}>Por defecto</option>
						<option value="3">Marzo</option>
						<option value="4">Abril</option>
						<option value="5">Mayo</option>
						<option value="6">Junio</option>
						<option value="7">Julio</option>
						<option value="8">Agosto</option>
						<option value="9">Septiembre</option>
						<option value="10">Octubre</option>
						<option value="11">Noviembre</option>
						<option value="12">Diciembre</option>
					</MonthSelect>
					<ReportButton onClick={handleCreateReport}>Generar reporte</ReportButton>
				</Filter>
				<ContentContainer>
					<ContentBar>
						<TitleBar>Cantidad de pensiones pagadas por mes</TitleBar>
						<Bars data={dataBar} options={optionsBar} />
					</ContentBar>
					<ContentDoughnnut>
						<TitleBar>Cantidad de matrículas</TitleBar>
						<Pie data={pieData} options={
							{
								plugins: {
									legend: {
										position: 'right',
										labels: {
											color: theme === 'light' ? 'black' : 'white',
										},
									}
								}
							}
						}/>
					</ContentDoughnnut>
				</ContentContainer>
				<ContentDiv>
				<ContentLineal>
					<TitleLine>Aumento y disminucion de matriculas</TitleLine>
					<Lineals data={dataLineal} options={optionsLineal}/>
					</ContentLineal>
				<TableContainer>
					<TitleBar>Últimos 5 alumnos matriculados</TitleBar>
					<Table>
						<thead>
							<tr>
								<th></th>
								<th>
									<DivRows>Código<AiOutlineDown /></DivRows>
								</th>
								<th>
									<DivRows>Nombres<AiOutlineDown /></DivRows>
								</th>
								<th>
									<DivRows>Nivel<AiOutlineDown /></DivRows>
								</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								isLoading ? (
									<Loader>
										<PropagateLoader color="#672DE3" />
									</Loader>
								) : (
									data?.data?.lastEnrolledStudents?.map((student) => (
										<LastStudentTableRow
											key={student['studentCod']}
											cod={student['studentCod']}
											name={student['fullName']}
											level={student['level']}
											handleChange={() => handleCheckboxChange(student['studentCod'])}
											selected={selectedRow === student['studentCod']}
										/>
									))
								)
							}
						</tbody>
					</Table>
				</TableContainer>
				</ContentDiv>
			</MainContent>

		</>
	)
}

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
	width: 100%;
  height: 100%;
`;

const Filter = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 20px;
`;

const MonthSelect= styled.select`
	text-align: center;
	outline: none;
	cursor: pointer;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1 1 0;
  padding: 1rem;
  gap: 20px;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
	height: 100%;
	max-height: 350px;
  gap: 30px;
`;

const ContentBar = styled.div`
  display: flex;
  background-color: ${props =>
    props.theme === 'dark' ? 'rgb(21, 30, 26)' : 'rgb(76 74 74 / 30%);'};
  padding: 12px;
  width: 50%;
  height: 100%;
	min-height: 300px;
  flex-direction: column;
  align-items: center;
`;

const DivRows = styled.div`
    display: flex;
    align-items: center;
	font-size: 14px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead tr {
    background-color: transparent;
  }

  thead th {
    font-weight: 300;
    color: #909090;
    font-size: 18px;
  }

  th,
  td {
    padding: 10px;
    text-align: left;

  }

  tbody td {
	font-size: 14px;
    border-bottom: 8px solid  ${props =>
		props.theme === 'dark' ? '#000F08' : 'rgb(250 250 250/ 5%)'};
  }

  tbody tr {
    background-color: ${props =>
		props.theme === 'dark' ? 'rgb(21, 30, 26)' : 'rgb(76 74 74 / 30%);'};
    margin-bottom: 10px;
  }

  .checkbox, .button {
    text-align: center;
  }
`
const ContentLineal = styled.div`
  width: 50%;
  gap: 30px;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem 2rem 2rem;
  background-color:  ${props =>
    props.theme === 'dark' ? 'rgb(21, 30, 26)' : 'rgb(76 74 74 / 30%);'};
  margin-top: 2rem;
`;

const TitleLine = styled.h4`
  text-align: center;
  background: transparent;
`;

const ContentDiv = styled.div`
	display: flex;
	gap: 20px;
`;

const ContentDoughnnut = styled.div`
  display: flex;
  width: 50%;
	height: 100%;
	min-height: 300px;
  padding: 12px;
  background-color: ${props =>
    props.theme === 'dark' ? 'rgb(21, 30, 26)' : 'rgb(76 74 74 / 30%);'};
  flex-direction: column;
  align-items: center;
`;
const TitleBar = styled.h4`
  text-align: center;
  margin-bottom: 10px;
`;

const TableContainer = styled.div`
  margin-top: 12px;
  width: 50%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ReportButton = styled.button`
    border: none;
    background-color: rgb(219 215 215);
    color: #000000;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all .3s;

    &:hover {
        background-color: #6b6b6b;
        color: #FFFFFF;

    }
`