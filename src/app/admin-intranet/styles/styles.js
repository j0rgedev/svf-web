import styled from 'styled-components';
export const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem clamp(1rem, 5vw, 2.5rem);
`
export const MainTitle = styled.h1`
    font-size: ${props => props.fontSize ? props.fontSize : 'clamp(42px, 5vw, 64px)'};
    text-align: center;
    line-height: 1.3;
`

export const MainParagraph = styled.p`
    font-size: clamp(18px, 2vw, 24px);
    text-align: center;
    color: ${props => props.color ? props.color : 'unset'};
`