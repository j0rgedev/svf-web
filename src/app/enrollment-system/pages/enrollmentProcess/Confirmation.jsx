import {BsFillPatchCheckFill} from 'react-icons/bs'
import {useContext, useEffect} from "react";
import {EnrollmentProcessContext} from "../../setup/context/EnrollmentProcessContext.jsx";
import styled from "styled-components";
import {MainContainer, MainParagraph, MainTitle} from "../styles.js";
import {useNavigate} from "react-router-dom";

function Confirmation() {
	const {enrollmentProcess} = useContext(EnrollmentProcessContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (!enrollmentProcess['enrollmentID']) {
			navigate('/estudiante/matricula', {replace: true})
		}
	}, [enrollmentProcess, navigate])

	return (
		enrollmentProcess['enrollmentID'] && (
			<MainContainer>
				<Container>
					<BsFillPatchCheckFill className={'confirmation-icon'}/>
					<MainTitle fontSize={'clamp(36px, 3vw, 48px)'}>MATRÍCULA CONFIRMADA</MainTitle>
					<MainParagraph color={'#565656'}>Tu matrícula se registro correctamente con el siguiente número de orden:</MainParagraph>
					<EnrollmentId className={'confirmation-id'}>{enrollmentProcess['enrollmentID']}</EnrollmentId>
					<RedirectWrapper>
						<Paragraph>Regresar a mi Portal Estudiantil</Paragraph>
						<Redirect href={'/estudiante'}>Ir a mi portal</Redirect>
					</RedirectWrapper>
				</Container>
			</MainContainer>
		)
	)
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;
  gap: 30px;
  justify-content: center;

  .confirmation-icon {
    font-size: 9em;
    color: #A1C02B;
  }
`

const EnrollmentId = styled.h2`
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 700;
  letter-spacing: 1px;
  color: #3A470F;
`

const RedirectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 26px;
`

const Paragraph = styled.p`
  font-weight: 400;

  @media screen and (min-width: 450px) {
    font-size: 22px;
  }
`

const Redirect = styled.a`
  font-size: 20px;
  text-decoration: none;
  color: #05430C;
  font-weight: bold;
`

export default Confirmation