import styled from "styled-components";
import avatar from "../../assets/avatar.png";
import MainHeader from "../../components/MainHeader.jsx";
import React from "react";
import {Outlet} from "react-router-dom";

export function StudentsLayout() {
	return (
		<>
			<MainHeader isSearch={true} text={'Jhon K.'} src={avatar}/>
			<ContentContainer>
				<Outlet/>
			</ContentContainer>
		</>
	)
}

const ContentContainer = styled.div`
	display: flex;
    flex-direction: column;
  	flex: 1 1 0;
`;