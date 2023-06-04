import React from 'react';
import styled from 'styled-components';

export default function ActionButton({text, className, onClickFn, disabled, type}) {

	return (
		<StyledButton
			className={className}
			onClick={onClickFn}
			type={type ? type : "button"}
			disabled={disabled}
		>
			{text}
		</StyledButton>
	)
}

const StyledButton = styled.button`
  min-width: 250px;
  letter-spacing: 2px;
  border-radius: 1rem;
  height: 46px;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  border: none;
  transition: 0.5s;

  &:disabled {
    cursor: not-allowed;
    background-color: #cccc !important;
    color: #666 !important;
  }

  &.mainButton {
    background-color: #51939B;
    color: white;

    &:hover {
      background-color: rgb(48 94 100);
    }
  }

  &.secondButton {
    background-color: #EF233C;
    color: white;

    &:hover {
      background-color: rgb(119, 9, 19);
    }
  }

  &.thirdButton {
    background-color: #C09463;
    color: white;

    &:hover {
      background-color: #785e42;
    }
  }
`;
