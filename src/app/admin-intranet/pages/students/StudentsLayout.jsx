import styled from "styled-components";
import avatar from "../../assets/avatar.png";
import MainHeader from "../../components/MainHeader.jsx";
import React, {useState} from "react";
import {Outlet} from "react-router-dom";

export function StudentsLayout() {

	const [searchText, setSearchText] = useState('');

	return (
		<>
			<MainHeader
				isSearch={true}
				text={'Jhon K.'}
				src={avatar}
				searchText={searchText}
				setSearchText={setSearchText}
			/>
			<ContentContainer>
				<Outlet context={[searchText, setSearchText]}/>
			</ContentContainer>
		</>
	)
}

const ContentContainer = styled.div`
	display: flex;
    flex-direction: column;
  	flex: 1 1 0;
`;