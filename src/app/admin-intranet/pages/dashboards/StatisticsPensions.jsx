import styled from "styled-components";
import avatar from "../../assets/avatar.png";
import MainHeader from "../../components/MainHeader.jsx";
import React, {useState} from "react";
import {Lineals} from "../../components/LinealGraphic.jsx";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import CheckMonths from "../../components/CheckMonths.jsx";
import DoughnutChart from "../../components/RadialChart.jsx";
import {useMutation, useQuery} from "react-query";
import {getCookie} from "../../../login/setup/utils/cookiesConfig.js";
import {
	debtByMonth,
	generateExcelReport,
	generatePensionsReport,
	pensionDashboard
} from "../../setup/api/adminDashboards.js";
import toast from "react-hot-toast";
import {SiMicrosoftexcel} from "react-icons/si";
import {saveAs} from "file-saver";


ChartJS.register(ArcElement, Tooltip, Legend);

const optionsDoughnut1 = {
	responsive: true, // Permite que el gráfico se ajuste al contenedor
	maintainAspectRatio: false, 

	width: 200, 
	height: 200, 

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
			min: 0
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
	const [selectedMonth, setSelectedMonth] = useState(3);
	const [enableExcelReport, setEnableExcelReport] = useState(false);


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

	const {data: totalDebt, isLoading: isTotalDebtLoading} = useQuery({
		queryKey: ['totalDebt', selectedMonth],
		queryFn: async () => {
			const token = getCookie('SESSION').token;
			return await debtByMonth(token, selectedMonth);
		},
		onError: () => {
			toast.error('Error al cargar la deuda total');
		}
	});


	let toastId = null;
	const handleExcelReport = async () => {
		const token = getCookie('SESSION').token;
		toastId = toast.loading('Generando reporte...');
		await mutateAsync(token)
	}

	const {mutateAsync} = useMutation({
		mutationFn: generateExcelReport,
		onSuccess: (response) => {
			const fileName = 'pensiones.xlsx';

			const blob = new Blob([response.data], { type: response.headers['content-type'] });
			saveAs(blob, fileName);
			toast.success('Reporte generado correctamente', {id: toastId});
		},
		onError: () => {
			toast.error('Error al generar el reporte', {id: toastId});
		},
	});

	const handleCreateReport = async () => {
		const token = getCookie('SESSION').token;
		await toast.promise(
			generatePensionsReport(token),
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
				data: [totalDebt?.data.totalPending || 0, totalDebt?.data.totalPaid || 0],
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
			<ContHeader>
			<Title>Pensiones</Title>
			<ButtonExcel onClick={handleExcelReport}><SiMicrosoftexcel style={{ fontSize: '24px' }}/><div>Reporte Excel</div></ButtonExcel>
			</ContHeader>
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
						Total de deuda: S/{totalDebt?.data.totalDebt || 0}
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

const ButtonExcel = styled.button`
	display: flex;
    gap: 10px;
  padding: 0.6rem 0.8rem;
  background: #7f750b;
  border-radius: 0.5rem;
  cursor: pointer;
  color:white;
  border: none;
  
  &:hover{
	background: #afa10f;
  }
`;

const ContHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 2rem;
    margin-left: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.textColor};
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