import styled from "styled-components";
import MainHeader from "../components/MainHeader";
import avatar from '../assets/avatar.png';
import { Students_Dates } from "./new_studentprocess/Student_Dates";
import { Attorney_Dates } from "./new_studentprocess/Attorney_Dates";
import { Confirmation } from "./new_studentprocess/Confirmation";
import ProgressBar from "../components/ProgressBar";
import {useState} from "react";


const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Body = styled.div`
  width: 100%;
  min-height: 520px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 24rem;
  margin-bottom: 2rem;
  margin-top: 8rem;
`;

export function NewStudentProcess() {
	const [currentStep, setCurrentStep] = useState(1);
	const [studentData, setStudentData] = useState({});
	const [attorneyData, setAttorneyData] = useState({});
  
	/* const handleStepClick = (step) => {
	  setCurrentStep(step);
	};
  
	const handleNextClick = () => {
	  if (currentStep === 1) {
		const studentDatesData = {}; 
		setStudentData(studentDatesData);
		handleStepClick(2);
	  } else if (currentStep === 2) {
		const attorneyDatesData = {};
		setAttorneyData(attorneyDatesData);
		handleStepClick(3);
	  }
	}; */
	const handleNextClick = () => {
		setCurrentStep((prevStep) => prevStep + 1);
	  };
  
	let component;
	switch (currentStep) {
	  case 1:
		component = <Students_Dates handleNextClick={handleNextClick} />;
		break;
	  case 2:
		component = <Attorney_Dates handleNextClick={ handleNextClick }/>;
		break;
	  case 3:
		component = <Confirmation cod={cod} password={password} />;
		break;
	  default:
		component = <Students_Dates handleNextClick={handleNextClick} />;
	}
  
	return (
	  <Container>
		<MainHeader isSearch={true} text={'Jhon K.'} src={avatar} />
		<ProgressBar className1={'complete'} className2={'desactive'} className3={'desactive'} />
		<Body>{component}</Body>
	  </Container>
	);
  }
  