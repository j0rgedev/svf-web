import Globals from "../styles/globals.js";
import styled from "styled-components";
import {Outlet} from "react-router-dom";
import AdminSidebar from "../components/sidebar/AdminSidebar.jsx";
import React, {useState} from "react";
import {Toaster} from "react-hot-toast";
import {AlertContext} from "../setup/context/AlertContext.jsx";
import {DeleteAlert} from "../components/DeleteAlert.jsx";
import { color } from "framer-motion";

export function AdminRootLayout() {

	const [alert, setAlert] = useState(null)

	return (
		<AlertContext.Provider value={{alert, setAlert}}>
			<Container>
				{
					alert!==null && <DeleteAlert
						title={alert.title}
						description={alert.message}
						data={alert.data}
					/>
				}
				<Globals/>
				<Toaster
					toastOptions={{
						error:{
							style:{
								backgroundColor:"#1D0C0C",
								color:"white"
							}
						}
					}}
				/>
				
				<AdminSidebar/>
				<Wrapper>
				<Main>
					<Outlet/>
				</Main>
				</Wrapper>
			</Container>
		</AlertContext.Provider>
	)
}

const Container = styled.div`
  display: flex;
`
const Wrapper = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
`

const Main = styled.main`
  width: 82%;
  min-height: 100vh;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`