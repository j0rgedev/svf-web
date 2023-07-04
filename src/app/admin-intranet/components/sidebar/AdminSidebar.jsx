import React from 'react';
import logoIntranet from '../../assets/logo-Intranet.png'
import SidebarSections from './SidebarSections.jsx';
import {BsFillBarChartFill} from 'react-icons/bs';
import {AiTwotoneHome, AiFillDatabase} from 'react-icons/ai';
import {FaUserGraduate, FaChalkboardTeacher, FaSignOutAlt} from 'react-icons/fa';
import {RiParentFill} from 'react-icons/ri';
import styled from 'styled-components';
import {removeCookie} from "../../../login/setup/utils/cookiesConfig.js";

export default function AdminSidebar() {

	return (
		<Sidebar>
			<SidebarHeader>
				<img src={logoIntranet} alt="svf_logoIntranet"/>
			</SidebarHeader>
			<h3>General</h3>
			<ContentOptions>
				<SidebarSections icon={<AiTwotoneHome/>} text={'Inicio'} href={'/admin'}/>
				<SidebarSections hasDropdown={true} icon={<BsFillBarChartFill/>} text={'Estadísticas'}/>
				<SidebarSections icon={<AiFillDatabase/>} text={'Datos'} href={'/admin/datos'}/>
			</ContentOptions>
			<h3>Gestión</h3>
			<ContentOptions>
				<SidebarSections icon={<FaUserGraduate/>} text={'Estudiantes'} href={'/admin/estudiantes'}/>
				<SidebarSections icon={<FaChalkboardTeacher/>} text={'Profesores'} href={'/admin/profesores'}/>
				<SidebarSections icon={<RiParentFill/>} text={'Padres'} href={'/admin/padres'}/>
			</ContentOptions>
			<SidebarSections icon={<FaSignOutAlt/>} text={'Cerrar Sesión'} onClick={() => {removeCookie('SESSION')}}/>
		</Sidebar>
	);
}

const Sidebar = styled.nav`
  height: 100%;
  width: 18%;
  position: fixed;
  min-height: 100vh;
  padding: 20px;
  max-width: 300px;
  border-right: 1px solid #2C3531;
`;

const SidebarHeader = styled.div`
  img {
    width: 100%;
    height: 100%;

  }
`;

const ContentOptions = styled.div`
  margin: 20px 0px;
`;


