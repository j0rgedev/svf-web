import StepProgress from "../../components/StepProgress.jsx";
import styled from "styled-components";
import StudentInfo from "./StudentInfo.jsx";
import {useContext, useState} from "react";
import SchoolTerms from "./SchoolTerms.jsx";
import Payment from "./Payment.jsx";
import {Navigate, useNavigate} from "react-router-dom";
import {EnrollmentProcessContext} from "../../setup/context/EnrollmentProcessContext.jsx";
import {MainContainer, MainTitle} from "../styles.js";
import {AlertInfoContext} from "../../setup/context/AlertInfoContext.jsx";
import {useQuery} from "react-query";
import {useStudent} from "../../setup/api/studentAPI.js";
import {getCookie} from "../../setup/config/cookiesConfig.js";
/* import {PropagateLoader} from "react-spinners"; */

export const EnrollmentProcess = () => {

    const {setEnrollmentProcess} = useContext(EnrollmentProcessContext);
    const {setAlertInfo} = useContext(AlertInfoContext);

    const token = getCookie('SESSION');
    const [currentStep, setCurrentStep] = useState(1);
    const [termAccepted, setTermAccepted] = useState(false);

    const handleStepClick = (step) => {
        setCurrentStep(step);
    };

    const handleTermsAccepted = () => {
        setTermAccepted(true);
    }

    const navigate = useNavigate();

    const {isLoading} = useQuery('student', () => useStudent(token), {
        onSuccess: ({data}) => {
            data['enrollmentID'] &&
            setEnrollmentProcess({
                'studentCod': data['studentCod'],
                'names': data['names'],
                'enrollmentID': data['enrollmentID']
            })
            navigate('/matricula/confirmacion')
        },
        onError: () => {
            setAlertInfo({
                type: "error",
                text: "Ups, error inesperado",
                subtext: "Por favor, intenta nuevamente. Si el error persiste, contáctate con nosotros",
            });
        }
    });

    let component;
    switch (currentStep) {
        case 1:
            component = <StudentInfo/>;
            break;
        case 2:
            component = <SchoolTerms termsAccepted={termAccepted} setHandleTermAccepted={handleTermsAccepted}/>;
            break;
        case 3:
            termAccepted ?
                component = <Payment setAlertInfo={setAlertInfo}/> :
                component = <SchoolTerms termsAccepted={termAccepted} setHandleTermAccepted={handleTermsAccepted}/>;
            break;
        default:
            component = <StudentInfo/>;
    }
    

    if (isLoading) return (
        <MainContainer>
            <Container>
                <PropagateLoader color={'#000000'}/>
            </Container>
        </MainContainer>
    )

    return (
        <MainContainer>
            <Container>
                <MainTitle fontSize={'clamp(32px, 3vw, 42px)'}>PROCESO DE MATRÍCULA</MainTitle>
                <StepProgress number={currentStep} onStepClick={handleStepClick}
                              termsAccepted={termAccepted}/>
                <Body>{component}</Body>
            </Container>
        </MainContainer>
    )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const Body = styled.div`
  width: 100%;
  height: 100%;
  min-height: 520px;
`






