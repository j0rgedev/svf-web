import styled from "styled-components";

export default function PaidPensions({pension}) {

	return (
		<Container className={'pension'}>
			<p>{pension.pensionCod}</p>
			<p>{pension.pensionName}</p>
			<p>{pension.dueDate}</p>
			<ReceiptButton>Ver recibo</ReceiptButton>
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
`;

