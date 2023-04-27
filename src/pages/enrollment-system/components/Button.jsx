import styled, { css } from 'styled-components';

export default function Button ({text, isMain, submit, id, isLoading}) {
    const ButtonComponent = isMain ? MainButton : SecondaryButton;
    return (
        <ButtonComponent
            type={submit ? 'submit' : 'button'}
            id={id}
            disabled={isLoading}
        >
            {text}
        </ButtonComponent>
    )
}

const ButtonStyles = css`
    width: 100%;
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
    background-color: #656A51;
    color: white;
    
    &:hover {
    background-color: #383b29;
    }
`;

const SecondaryButton = styled.button`
    ${ButtonStyles};
    background-color: white;
    border: 1px solid #656A51;
    color: #656A51;
    
    &:hover {
    background-color: rgb(196, 196, 196);
    }
`;

