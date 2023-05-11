import Sidebar from '../../../components/sidebar/Sidebar.jsx'
import './confirmationStyles.css'
import {BsFillPatchCheckFill} from 'react-icons/bs'
import '../../styles/globals.css'
import {useContext} from "react";
import {EnrollmentProcessContext} from "../../../context/EnrollmentProcessContext.jsx";
import styled from "styled-components";

function Confirmation() {
    const {enrollmentProcess} = useContext(EnrollmentProcessContext);
    return (
        <div className='container'>
            <Sidebar width={'40%'}/>
            <div className='right-container' style={{justifyContent: 'center'}}>
                <Container>
                    <BsFillPatchCheckFill className={'confirmation-icon'}/>
                    <h1>MATRÍCULA CONFIRMADA</h1>
                    <h2 style={{textAlign: 'center'}}>Tu matrícula se registro correctamente con el siguiente número de
                        orden:</h2>
                    <h2 className={'confirmation-id'}>{enrollmentProcess['enrollmentId']}</h2>
                    <RedirectWrapper>
                        <Paragraph>Puedes cancelarla en tu Portal Estudiantil</Paragraph>
                        <Redirect href={'#'} target={'_blank'}>Ir a mi portal</Redirect>
                    </RedirectWrapper>
                </Container>
            </div>
        </div>
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
  `

const RedirectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
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