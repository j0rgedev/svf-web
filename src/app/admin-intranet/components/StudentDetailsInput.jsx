import React from 'react';
import styled from 'styled-components';

export default function StudentDetailsInput({ icon, text ,type, disabled}) {
	return (
		<InputContainer>
			{icon}
			<InputField value={text} type={type} disabled={disabled}/>
		</InputContainer>
	);
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
  	height: 40px;
  	width: 300px;
`;

const InputField = styled.input`
	padding: 8px;
	outline: none;
	border: none;
  	color: #fff;
	background: rgb(0, 15, 8);
	font-size: 20px;
  	width: 100%;
  
	&::placeholder {
		color: white;
	}
`;