import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

export default function StudentTableRow({cod, name, date, state, handleChange, selected}) {

	const navigate = useNavigate();

	const handleCheckboxChange = () => {
		handleChange(cod);
	};

	const handleClick = () => {
		navigate(`/admin/estudiantes/${cod}`);
	}

	return (
		<tr>
			<Row className={'checkbox'}>
				<Checkbox
					type={'checkbox'}
					checked={selected}
					onChange={handleCheckboxChange}
				/>
			</Row>
			<Row>{cod}</Row>
			<Row>{name}</Row>
			<Row>{date}</Row>
			<Row>{state}</Row>
			<Row className={'button'}>
				<Button
					type={'button'}
					value={'Ver detalles'}
					onClick={handleClick}
				/>
			</Row>
		</tr>
	);
}

const Row = styled.td`
background-color:  ${props =>
    props.theme === 'dark' ? 'rgb(21, 30, 26)' : 'rgba(76 74 74 / 30%);'};
`
const Checkbox = styled.input`
	display: inline-flex;
	align-items: center;
  	vertical-align: middle;
	cursor: pointer;
	color: #fff;
	background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
	width: 24px;
	height: 24px;
	appearance: none;
	border: 2px solid rgb(13, 156, 139);
	background-position: 0 -2rem;
	background-size: 100%;
	background-repeat: no-repeat;
	transition: all 0.3s ease-in-out;
	
	&:checked {
		background-color: rgb(13, 156, 139);
		color: rgb(13, 156, 139);
		background-position: 0 0;
	}
`

const Button = styled.input`
	border-radius: 10px;
	outline: none;
	padding: 6px 15px;
	background: #1E656D;
	color: #fff;
	border: none;
	cursor: pointer;
`