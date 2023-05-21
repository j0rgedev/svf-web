import React from 'react';
import styled from 'styled-components';
import {BsFillCheckSquareFill} from 'react-icons/bs';
import {useNavigate} from "react-router-dom";

export function Confirmation(
	{
		studentCode,
		studentPassword
	}
){
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/admin/estudiantes')
	}

	return (
		<Container>
			<IconContainer>
				<ConfirmationIcon className={'confirmation-icon'}/>
			</IconContainer>
			<Content>
				<h1>Confirmación de nuevo estudiante</h1>
				<Credentials>
					<h2>Código:</h2>
					<p>{studentCode}</p>
				</Credentials>
				<Credentials>
					<h2>Contraseña</h2>
					<p>{studentPassword}</p>
				</Credentials>
			</Content>
			<ButtonContainer>
				<StyledButton onClick={handleClick}>
					Ir al menú
				</StyledButton>
			</ButtonContainer>
		</Container>
	);
}

const StyledButton = styled.button`
  background-color: #1E656D;
  padding: 0.5rem 1.5rem;
  border-radius: 0.2rem;
  outline: none;
  border: none;
  color: #fff;
  width: 280px;
  height: 50px;
  font-size: 22px;
  cursor: pointer;
  transition: .5s ease-in-out;

  &:hover {
    background-color: rgb(53 157 169);
  }
  `;

const Container = styled.div`
	width: 100%;
  	height: 100%;
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: space-evenly;
`

const IconContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const ConfirmationIcon = styled(BsFillCheckSquareFill)`
	color: #9EFF00;
	width: 92px;
	height: 91px;
`;

const Content = styled.div`
	width: 100%;
  	margin-top: 22px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
  
  	h1 {
		font-size: 40px;
    }
`;


const Credentials = styled.div`
  	display: flex;
  	width: 100%;
	align-items: center;
	justify-content: center;
	gap: 100px;
  
  	h2 {
	  	width: 50%;
	  	text-align: right;
	  	font-weight: 300;
	  	font-size: 26px;
    }
  
  	p {
	  	width: 50%;
	  	text-align: left;
	  	font-size: 30px;
	  	font-weight: 500;
    }
`;

const ButtonContainer = styled.div`
	margin: 5rem 0;
`;
