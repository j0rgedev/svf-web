import React from 'react';
import styled from 'styled-components';

export default function NavigationButton(
	{
		text,
		type,
		isLoading
	}) {

	return (
		<StyledButton type={type} disabled={isLoading}>
			{text}
		</StyledButton>
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

  &:disabled {
    cursor: not-allowed;
    background-color: #cccc !important;
    color: #666 !important;
  }

`;
