import styled from "styled-components";
import avatar from "../../assets/avatar.png";
import MainHeader from "../../components/MainHeader.jsx";
import React, {useEffect, useState} from "react";
import Bars from "../../components/BarGraphic.jsx";
import LastStudentsTable from "../../components/LastTable/LastStudentTable.jsx";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import CenteredDoughnutChart from "../../components/DoughnutGrafics.jsx";
import {getCookie} from "../../../login/setup/utils/cookiesConfig.js";
import {useMutation, useQuery} from "react-query";
import {mainDashboard} from "../../setup/api/mainDashboard.js";
import toast from "react-hot-toast";
import {PropagateLoader} from "react-spinners";
import {AiOutlineDown} from "react-icons/ai";
import LastStudentTableRow from "../../components/LastTable/LastStudentTableRow.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const optionsBar = {
	plugins: {
		legend: {
			display: false
		}
	}
};

const dataBar = {
	labels: ['Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
	datasets: [
		{
			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			backgroundColor: ['white', 'white', 'white', '#0077B6', 'white', 'white', 'white', 'white', 'white', 'white'],
			borderColor: ['white', 'white', 'white', '#0077B6', 'white', 'white', 'white', 'white', 'white', 'white'],
			borderWidth: 1,
			borderRadius: 5,
		}
	]
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

	const [selectedRow, setSelectedRow] = useState(null);

	const handleCheckboxChange = (cod) => {
		if (selectedRow === cod) {
			setSelectedRow(null);
		} else {
			setSelectedRow(cod);
		}
	};

	const {data, isLoading, mutate} = useMutation({
		mutationFn: mainDashboard,
		onError: () => {
			toast.error("Error al cargar los datos")
		}
	})

	useEffect(() => {
		const token = getCookie('SESSION').token;
		mutate(token);
	}, [])

	const dataDoughnut = {
		labels: ['Matriculados', 'No Matriculados'],
		datasets: [
			{
				data: isLoading ? [0, 0] : [data?.data?.EnrollmentInformation?.enrolled || 0, data?.data?.EnrollmentInformation?.notEnrolled || 0],
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


	return (
		<>
			<MainHeader isSearch={false} text={'Jhon K.'} src={avatar}/>
			<MainContent>
				<ContentContainer>
					<ContentBar>
						<TitleBar>Recaudacion de pensiones en los ultimos meses</TitleBar>
						<Bars data={dataBar} options={optionsBar}/>
					</ContentBar>
					<ContentDoughnnut>
						<TitleBar>Alumnos Matriculados</TitleBar>
						<CenteredDoughnutChart data={dataDoughnut} options={optionsDoughnut} total="75%"/>
					</ContentDoughnnut>
				</ContentContainer>
				<TableContainer>
					<Table>
					<thead>
					<tr>
						<th></th>
						<th>
							<DivRows>Código<AiOutlineDown/></DivRows>
						</th>
						<th>
							<DivRows>Nombres<AiOutlineDown/></DivRows>
						</th>
						<th>
							<DivRows>Nivel<AiOutlineDown/></DivRows>
						</th>
						<th></th>
					</tr>
					</thead>
					<tbody>
					{
						isLoading ? (
							<Loader>
								<PropagateLoader color="#672DE3"/>
							</Loader>
						) : (
							data?.data?.lastFiveEnrolledStudents?.map((student) => (
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
			</MainContent>

		</>
	)
}

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
  height: 50%;
  gap: 30px;
`;

const ContentBar = styled.div`
  display: flex;
  background-color: rgb(21, 30, 26);
  padding: 12px;
  width: 50%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const DivRows = styled.div`
    display: flex;
    align-items: center;
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
    border-bottom: 8px solid #000f08;
  }

  tbody tr {
    background-color: #151e1a;
    margin-bottom: 10px;
  }

  .checkbox, .button {
    text-align: center;
  }
`

const ContentDoughnnut = styled.div`
  display: flex;
  width: 50%;
  padding: 12px;
  background-color: rgb(21, 30, 26);
  flex-direction: column;
  align-items: center;
`;
const TitleBar = styled.h4`
  text-align: center;
  margin-bottom: 10px;
`;

const TableContainer = styled.div`
  width: 100%;
  height: 50%;
  flex: 1 1 0;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;