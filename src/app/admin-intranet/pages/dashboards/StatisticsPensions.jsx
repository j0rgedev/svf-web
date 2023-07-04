import styled from "styled-components";
import avatar from "../../assets/avatar.png";
import MainHeader from "../../components/MainHeader.jsx";
import React, {useState} from "react";
import CenteredDoughnutChart from "../../components/DoughnutGrafics.jsx";
import {Lineals} from "../../components/LinealGraphic.jsx";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import CheckMonths from "../../components/CheckMonths.jsx";
import DoughnutChart from "../../components/RadialChart.jsx";
import {useQuery} from "react-query";
import {getCookie} from "../../../login/setup/utils/cookiesConfig.js";
import {debtByMonth, generateReport, pensionDashboard} from "../../setup/api/adminDashboards.js";
import toast from "react-hot-toast";


ChartJS.register(ArcElement, Tooltip, Legend);

const optionsDoughnut1 = {
	responsive: true, // Permite que el gráfico se ajuste al contenedor
	maintainAspectRatio: false, // Desactiva el mantenimiento del aspecto para poder ajustar el ancho y alto

	// Configuración del tamaño
	width: 200, // Ancho en píxeles
	height: 200, // Alto en píxeles

	plugins: {
		legend: {
			position: 'right',
			labels: {
				padding: 50,
			},
		},
	},
};

const optionsDoughnut2 = {
	plugins: {
		legend: {
			display: false,
		},
	},
};

const labels1 = ['Mar', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

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


export function StatisticsPensions() {

	const [monthPensionsAmount, setMonthPensionsAmount] = useState([]);
	const [studentPaymentStatus, setStudentPaymentStatus] = useState([]);
	const [paidStudentsPercentage, setPaidStudentsPercentage] = useState(0);
	const [totalDebt, setTotalDebt] = useState({});
	const [selectedMonth, setSelectedMonth] = useState(3);

	const {isLoading: arePensionStatsLoading} = useQuery({
		queryKey: 'pensionStats',
		queryFn: async () => {
			const token = getCookie('SESSION').token;
			return await pensionDashboard(token);
		},
		onSuccess: ({data}) => {
			setMonthPensionsAmount(data.monthPensionsAmount);
			setStudentPaymentStatus(data.studentsPaymentStatus);
			setPaidStudentsPercentage(calculatePercentage(data.studentsPaymentStatus));
		},
		onError: () => {
			toast.error('Error al cargar los gráficos')
		}
	})

	const {isLoading: isTotalDebtLoading} = useQuery({
		queryKey: ['totalDebt', selectedMonth],
		queryFn: async () => {
			const token = getCookie('SESSION').token;
			return await debtByMonth(token, selectedMonth);
		},
		onSuccess: ({data}) => {
			setTotalDebt(data);
		},
		onError: () => {
			toast.error('Error al cargar la deuda total');
		}
	});


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

	const calculatePercentage = (studentsPaymentStatus) => {
		const totalStudents = studentsPaymentStatus.totalStudentsWithPayment + studentsPaymentStatus.totalStudentsWithoutPayment;
		return (studentsPaymentStatus.totalStudentsWithPayment / totalStudents) * 100;
	}

	const dataLineal = {
		labels: labels1,
		datasets: [
			{
				label: 'Pensiones',
				data: monthPensionsAmount.map(({amount}) => amount),
				borderColor: '#7E0732',
				backgroundColor: '#7E0732',
				tension: 0.5,
				fill: true,
			},
		],
	};


	const dataDoughnut1 = {
		labels: ['Pagaron', 'No pagaron'],
		datasets: [
			{
				label: '# Pensiones',
				data: [studentPaymentStatus?.totalStudentsWithPayment || 0,
					studentPaymentStatus?.totalStudentsWithoutPayment || 0],
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

	const dataDoughnut2 = {
		labels: ['Pago pendiente', 'Total pagado'],
		datasets: [
			{
				label: ['Monto S/'],
				data: [totalDebt?.totalPending || 0, totalDebt?.totalPaid || 0],
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

	return (
		<>
			<MainHeader isSearch={false} text={'Jhon K.'} src={avatar}/>
			<Title>Pensiones</Title>
			<ContentContainer>
				<ContentLineal>
					<TitleBar>Monto de Pensiones Recaudado</TitleBar>
					<Lineals data={dataLineal} options={optionsLineal}/>
				</ContentLineal>
				<ContentDoughnnut>
					<TitleDoughnut>Alumnos al dia de Pagos</TitleDoughnut>
					<ReportButton onClick={handleCreateReport}>Generar reporte</ReportButton>
					<ContDoughnut>
						<DoughnutChart
							data={dataDoughnut1}
							options={optionsDoughnut1}
						/>
					</ContDoughnut>
				</ContentDoughnnut>
			</ContentContainer>
			<ContentGraficsBar>
				<ContentBar2>
					<TitleBar>Monto de deuda por mes</TitleBar>
					<TitleDebt>
						Total de deuda: S/{totalDebt?.totalDebt || 0}
					</TitleDebt>
					{!isTotalDebtLoading && (
						<DoughnutChart
							data={dataDoughnut2}
							options={optionsDoughnut2}
						/>
					)}
				</ContentBar2>
				<ContentBar3>
					<CheckMonths monthNumber={3} text={'Marzo'} selectedMonth={selectedMonth}
					             setSelectedMonth={setSelectedMonth}/>
					<CheckMonths monthNumber={4} text={'Abril'} selectedMonth={selectedMonth}
					             setSelectedMonth={setSelectedMonth}/>
					<CheckMonths monthNumber={5} text={'Mayo'} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/>
					<CheckMonths monthNumber={6} text={'Junio'} selectedMonth={selectedMonth}
					             setSelectedMonth={setSelectedMonth}/>
					<CheckMonths monthNumber={7} text={'Julio'} selectedMonth={selectedMonth}
					             setSelectedMonth={setSelectedMonth}/>
					<CheckMonths monthNumber={8} text={'Agosto'} selectedMonth={selectedMonth}
					             setSelectedMonth={setSelectedMonth}/>
					<CheckMonths monthNumber={9} text={'Septiembre'} selectedMonth={selectedMonth}
					             setSelectedMonth={setSelectedMonth}/>
					<CheckMonths monthNumber={10} text={'Octubre'} selectedMonth={selectedMonth}
					             setSelectedMonth={setSelectedMonth}/>
					<CheckMonths monthNumber={11} text={'Noviembre'} selectedMonth={selectedMonth}
					             setSelectedMonth={setSelectedMonth}/>
					<CheckMonths monthNumber={12} text={'Diciembre'} selectedMonth={selectedMonth}
					             setSelectedMonth={setSelectedMonth}/>
				</ContentBar3>
			</ContentGraficsBar>
		</>
	)
}

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
  margin-top: 2rem;
  margin-left: 2rem;
  text-align: left;
`;

const TitleDebt = styled.p`
  color: ${(props) => props.theme.textColor};
`;

const ContDoughnut = styled.div`
  width: 70%;
  height: 70%;
`;

const ReportButton = styled.button`
  border: none;
  background-color: #FFFFFF;
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40%;
  gap: 40px;
`;
const ContentGraficsBar = styled.div`
  display: flex;
  gap: 50px;
  justify-content: space-between;
`;

const ContentBar2 = styled.div`
  width: 40%;
  height: 300px;
  padding: 1rem;
  background-color: ${props =>
          props.theme === 'dark' ? 'rgb(21, 30, 26)' : 'rgb(76 74 74 / 30%);'};
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContentBar3 = styled.div`
  width: 60%;
  height: 300px;
  padding: 1rem;
  background-color: ${props =>
          props.theme === 'dark' ? 'rgb(21, 30, 26)' : 'rgb(76 74 74 / 30%);'};
  margin-top: 2rem;
  display: flex;
  -webkit-box-align: center;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: row;
`;

const ContentDoughnnut = styled.div`
  display: flex;
  width: 40%;
  background-color: ${props =>
          props.theme === 'dark' ? 'rgb(21, 30, 26)' : 'rgb(76 74 74 / 30%);'};
  margin-top: 2rem;
  flex-direction: column;
  align-items: center;
  gap: 16px
`;

const ContentLineal = styled.div`
  display: flex;
  width: 60%;
  padding: 1rem 1rem 2.5rem;
  background-color: ${props =>
          props.theme === 'dark' ? 'rgb(21, 30, 26)' : 'rgb(76 74 74 / 30%);'};
  margin-top: 2rem;
  flex-direction: column;
  align-items: center;
`;
const TitleBar = styled.h4`
  text-align: center;
  margin-bottom: 10px;
`;
const TitleDoughnut = styled.h4`
  text-align: center;
  margin-top: 10px;
`;