import React from 'react';
import styled from 'styled-components';
import {useField} from "formik";

export default function CustomTextField({label, ...props}){

	const [field, meta] = useField(props)

	return (
		<InputContainer>
			<InputLabel>{label}</InputLabel>
			<InputField
				{...field}
				{...props}
				className={meta.touched && meta.error && 'input-error'}
			/>
			{meta.touched && meta.error ? (
				<p className="error">{meta.error}</p>
			) : null}
		</InputContainer>
	);
}

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
  	height: 110px;
  
    p {
		color: #FF0000;
		text-align: left;
		font-size: 14px;
		FONT-WEIGHT: 300;
    }
`;

const InputLabel = styled.label`
	color: #fff;
	font-size: 20px;
`;

const InputField = styled.input`
	padding: 12px;
	outline: none;
	border: none;
	width: 282px;
	color: #fff;
	background: #151E1A;
	font-size: 20px;
  	font-weight: 300;
`;
