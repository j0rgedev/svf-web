import { MainParagraph, MainTitle } from "../../admin-intranet/styles/styles.js";
import styled from "styled-components";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import MainHeader from "../components/MainHeader.jsx";

export default function NotFoundPage404() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    const handleGoBack = () => {
        navigate(-1); 
    };

    return (
      <>
      <Header>
      <MainHeader isSearch={false} text={'Jhon K.'}  />
      </Header>
        <Container>
            <MainTitle>404</MainTitle>
            <MainTitle>Página No Encontrada</MainTitle>
            <MainParagraph>Al parecer estás intentando ingresar a una página errónea</MainParagraph>
            <StyledLink onClick={handleGoBack}>
                Regresar
            </StyledLink>
        </Container>
        </>
    );
}

const Header = styled.div`
   display: none;
`

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
const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  background: green;
  padding: 1rem;
  color: white;
  border-radius: 1rem;

  &:hover {
    background: #0f570f;
    transition: 0.5s;
  }
`;