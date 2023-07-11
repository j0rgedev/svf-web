import styled from 'styled-components';
import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import React, {useState} from "react";
import {AlertInfoContext} from "../../login/setup/utils/AlertInfoContext.jsx";
import Alert from "../../login/components/Alert.jsx";
import {EnrollmentProcessContext} from "../setup/context/EnrollmentProcessContext.jsx";

export default function EnrollmentRootLayout() {

	const [alertInfo, setAlertInfo] = useState(null)

	const [enrollmentProcess, setEnrollmentProcess] = useState({
		totalAmount: 0,
		date: "",
		level: {levelId: "", levelName: ""},
		paymentMethod: {paymentId: "", paymentType: ""}
	})

	return (
		<EnrollmentProcessContext.Provider value={{enrollmentProcess, setEnrollmentProcess}}>
			<AlertInfoContext.Provider value={{alertInfo, setAlertInfo}}>
				{
					alertInfo !== null &&
					<Alert
						alertType={alertInfo.type}
						title={alertInfo.text}
						description={alertInfo.subtext}
						onClose={() => setAlertInfo(null)}
						redirectUrl={alertInfo.redirectUrl}
					/>
				}
				<Container>
					<Sidebar/>
					<Main>
						<Outlet/>
					</Main>
				</Container>
			</AlertInfoContext.Provider>
		</EnrollmentProcessContext.Provider>
	)
}

const Container = styled.div`
  display: flex;

`

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`