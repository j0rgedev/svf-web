import styled from "styled-components";
import {StudentForm} from "./StudentForm.jsx";
import {Confirmation} from "./Confirmation.jsx";
import ProgressBar from "../../../components/ProgressBar.jsx";
import {useState} from "react";
import {RepresentativeForm} from "./RepresentativeForm.jsx";
import {NewStudentContext} from "../../../setup/context/NewStudentContext.jsx";

export function AddStudentLayout() {
	const [currentStep, setCurrentStep] = useState(1);
	const [studentInfo, setStudentInfo] = useState({});
	const [newStudentInfo, setNewStudentInfo] = useState({studentCode: null, password: null});

	const handleNextClick = () => {
		setCurrentStep(currentStep + 1);
	};

	const handleBackClick = () => {
		setCurrentStep(currentStep - 1)
	}

	let progressBarClasses = {
		className1: '',
		className2: '',
		className3: '',
	};

	let component;
	switch (currentStep) {
		case 1:
			component = <StudentForm handleNextForm={handleNextClick}/>;
			progressBarClasses.className1 = 'complete';
			progressBarClasses.className2 = 'desactive';
			progressBarClasses.className3 = 'desactive';
			break;
		case 2:
			component = <RepresentativeForm
				handleNextForm={handleNextClick}
				handleBackForm={handleBackClick}
				setNewStudentInfo={setNewStudentInfo}
			/>;
			progressBarClasses.className1 = 'complete';
			progressBarClasses.className2 = 'complete';
			progressBarClasses.className3 = 'desactive';
			break;
		case 3:
			component = <Confirmation
				studentCode={newStudentInfo.studentCode}
				studentPassword={newStudentInfo.password}
			/>;
			progressBarClasses.className1 = 'complete';
			progressBarClasses.className2 = 'complete';
			progressBarClasses.className3 = 'complete';
			break;
	}

	return (
		<Container>
			<NewStudentContext.Provider value={
				{
					studentInfo,
					setStudentInfo
				}
			}>
				<ProgressBar {...progressBarClasses}/>
				<Body>{component}</Body>
			</NewStudentContext.Provider>
		</Container>
	);
}

const Body = styled.div`
  width: 100%;
  flex: 1 1 0;
  padding: 1rem 0;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  
`
  