import styled from "styled-components";
import {useMutation} from "react-query";
import {getReceipt} from "../setup/api/student.js";
import {getCookie} from "../../login/setup/utils/cookiesConfig.js";
import toast from "react-hot-toast";

export default function PaidPensions({pension}) {


	let toastId = null;
	const {isLoading, mutateAsync} = useMutation({
		mutationFn: getReceipt,
		onSuccess: (response) => {
			const fileName = 'recibo.pdf';

			const blob = new Blob([response.data], { type: response.headers['content-type'] });
			saveAs(blob, fileName);
			toast.success('Reporte generado correctamente', {id: toastId});
		},
		onError: () => {
			toast.error('Error al generar el reporte', {id: toastId});
		}
	})

	const handlePensionClick = async () => {
		const token = getCookie('SESSION').token;
		const values = {
			token,
			receiptCode: pension.receiptId
		}
		toastId = toast.loading('Generando recibo...');
		await mutateAsync(values);
	}

	return (
		<Container className={'pension'}>
			<p>{pension.pensionCod}</p>
			<p>{pension.pensionName}</p>
			<p>{pension.dueDate}</p>
			<ReceiptButton onClick={handlePensionClick}>Ver recibo</ReceiptButton>
		</Container>
	);
}

const Container = styled.div`
  background-color: #d7d3d1;
  display: flex;
  justify-content: space-between;
  font-size: clamp(12px, 5vw, 18px);
	padding: 1.5rem;
	
	p {
		font-size: clamp(14px, 5vw, 20px)
	}
`;

const ReceiptButton = styled.button`
	font-size: clamp(5px, 3vw, 12px);
	background-color: #2A490B;
	color: white;
	padding: 4px 10px;
	border: none;
	cursor: pointer;
	
	&:hover {
		background-color: #1E3A07;
  }
	
	&:disabled{
		background-color: #d7d3d1;
		cursor: not-allowed;
	}
`;

