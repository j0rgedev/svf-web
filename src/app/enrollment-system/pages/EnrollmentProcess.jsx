import Sidebar from "../components/sidebar/Sidebar.jsx";
import StepProgress from "../components/stepProgress/StepProgress.jsx";
import styled from "styled-components";
import StudentInfo from "./enrollmentProcess/enrollmentSteps/student-info/StudentInfo.jsx";
import {useContext, useEffect, useState} from "react";
import SchoolTerms from "./enrollmentProcess/enrollmentSteps/SchoolTerms.jsx";
import Payment from "./enrollmentProcess/enrollmentSteps/Payment.jsx";
import Alert from "../components/Alert.jsx";
import {useNavigate} from "react-router-dom";
import {EnrollmentProcessContext} from "../context/EnrollmentProcessContext.jsx";
import student_enrolled from "../assets/enrollment_confirmed.png";

export const EnrollmentProcess = () => {

    const {enrollmentProcess} = useContext(EnrollmentProcessContext);
    const [currentStep, setCurrentStep] = useState(1);
    const [termAccepted, setTermAccepted] = useState(false);
    const [alertInfo, setAlertInfo] = useState(null)

    const onAlertClose = () => {
        setAlertInfo(null)
    }

    const handleStepClick = (step) => {
        setCurrentStep(step);
    };

    const handleTermsAccepted = () => {
        setTermAccepted(true);
    }

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

    const navigate = useNavigate();


    return (
        <div className='container'>
            {alertInfo &&
                <Alert
                    alertType={alertInfo.type}
                    title={alertInfo.text}
                    description={alertInfo.subtext}
                    redirectUrl={alertInfo.redirectUrl}
                    onClose={onAlertClose}
                />
            }
            <Sidebar width={'40%'}/>
            <div className='right-container' style={{justifyContent: 'unset'}}>
                {
                    enrollmentProcess['enrollmentId'] ? (
                        navigate('/matricula/confirmacion')
                    ) : (
                        <Container>
                            <h1>PROCESO DE MATRÍCULA</h1>
                            <StepProgress number={currentStep} onStepClick={handleStepClick}
                                          termsAccepted={termAccepted}/>
                            <Body>{component}</Body>
                        </Container>
                    )
                }
            </div>
        </div>
    )
}

const Body = styled.div`
  height: 100%;
  width: 100%;
`

const Container = styled.div`
  padding: 1rem 1.5rem;
  width: 100%;

  @media screen and (min-width: 450px) {
    padding: 1rem;
  }
`





