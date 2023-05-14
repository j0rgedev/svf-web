import {MainParagraph, MainTitle} from "../styles.js";
import styled from "styled-components";

export default function NotFoundPage() {
    return (
        <Container>
            <MainTitle>Página No Encontrada</MainTitle>
            <MainParagraph>Al parecer estas intentando ingresar a una página erronea</MainParagraph>
            <a href="/matricula/login">Regresar</a>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 2rem clamp(1rem, 5vw, 2.5rem);
  
    a {
      font-size: clamp(16px, 3vw, 24px);
    }
`
