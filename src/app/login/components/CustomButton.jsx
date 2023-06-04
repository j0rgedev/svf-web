import styled, { css } from 'styled-components';

export default function CustomButton ({text, isMain, submit, className, isLoading, onClick}) {
    const ButtonComponent = isMain ? MainButton : SecondaryButton;
    return (
        <ButtonComponent
            type={submit ? 'submit' : 'button'}
            disabled={isLoading}
            className={className}
            onClick={onClick}
        >
            {text}
        </ButtonComponent>
    )
}

const ButtonStyles = css`
    width: 100%;
    letter-spacing: 4px;
    height: clamp(48px, 5vw, 60px);
    font-weight: 500;
    font-size: clamp(16px, 3vw, 24px);
    cursor: pointer;
    border: none;
    transition: .5s;
  
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
    background-color: #616C3F;
    color: white;
    
    &:hover {
      background-color: #383b29;
    }
`;

const SecondaryButton = styled.button`
    ${ButtonStyles};
    background-color: white;
    border: 1px solid #616C3F;
    color: #616C3F;
    
    &:hover {
      background-color: rgb(196, 196, 196);
    }
`;

