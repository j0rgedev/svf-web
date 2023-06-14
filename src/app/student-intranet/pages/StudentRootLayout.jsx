import styled from "styled-components";
import {Outlet} from "react-router-dom";
import React, {useState} from "react";
import {Toaster} from "react-hot-toast";

export function StudentRootLayout() {

	const [alert, setAlert] = useState(null)

	return (
			<Container>
				<Toaster />
				<Main>
					<Outlet/>
				</Main>
			</Container>
	)
}

const Container = styled.div`
  display: flex;
`

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
`