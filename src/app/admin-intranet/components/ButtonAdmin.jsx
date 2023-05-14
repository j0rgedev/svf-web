import React from 'react';
import styled, { css } from 'styled-components';

const ButtonStyles = css`
    width: 22rem;
    letter-spacing: 4px;
    border-radius: 1rem;
    height: 50px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    border: none;
    transition: .5s;
    margin-top: 20px;
  
    &:disabled {
        cursor: not-allowed;
        background-color: #cccc;
      
        &:hover {
            background-color: #cccc;
        }
    }
`;

const MainButton = styled.button`
    ${ButtonStyles};
    background-color:  #51939B;
    color: white;
    
    &:hover {
    background-color: rgb(48 94 100);
    }
`;

const SecondaryButton = styled.button`
    ${ButtonStyles};
    background-color: #EF233C;
    border: 1px solid #656A51;
    color: white;
    
    &:hover {
    background-color: rgb(160 20 37);
    }
`;

export default function ButtonAdmin ({text, isMain}) {
    const ButtonComponent = isMain ? MainButton : SecondaryButton;
    return (
        <ButtonComponent >
            {text}
        </ButtonComponent>
    )
}