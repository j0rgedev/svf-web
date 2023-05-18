import Globals from "../styles/globals.js";
import styled from "styled-components";
import {Outlet} from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";

export function AdminRootLayout() {
    return (
        <Container>
            <Globals/>
            <AdminSidebar/>
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
  display: flex;
  justify-content: center;
  align-items: center;
`