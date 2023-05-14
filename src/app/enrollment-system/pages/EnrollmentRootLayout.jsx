import styled from 'styled-components';
import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import {EnrollmentProcessContext} from "../setup/context/EnrollmentProcessContext.jsx";
import React, {useState} from "react";
import {AlertInfoContext} from "../setup/context/AlertInfoContext.jsx";
import Alert from "../components/Alert.jsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useQuery, useQueryClient} from "react-query";

export default function EnrollmentRootLayout() {

    const [enrollmentProcess, setEnrollmentProcess] = useState({
        totalAmount: 0,
        date: "",
        level: {levelId: "", levelName: ""},
        paymentMethod: {paymentId: "", paymentType: ""}
    })

    const [alertInfo, setAlertInfo] = useState(null)

    const handleCloseAlert = () => {
        setAlertInfo(null)
    }

    return (
        <EnrollmentProcessContext.Provider value={{enrollmentProcess, setEnrollmentProcess}}>
            <AlertInfoContext.Provider value={{alertInfo, setAlertInfo}}>
                <Container>
                    {
                        alertInfo &&
                        <Alert
                            alertType={alertInfo.type}
                            title={alertInfo.text}
                            description={alertInfo.subtext}
                            onClose={handleCloseAlert}
                            redirectUrl={alertInfo.redirectUrl}
                        />
                    }
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