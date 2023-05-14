import React from 'react';
import logoIntranet from '../../admin-intranet/assets/logo-Intranet.png'
import Options from './Options';
import { BsFillBarChartFill } from 'react-icons/bs';
import { AiTwotoneHome, AiFillDatabase } from 'react-icons/ai';
import { FaUserGraduate, FaChalkboardTeacher, FaSignOutAlt } from 'react-icons/fa';
import { RiParentFill } from 'react-icons/ri';
import styled from 'styled-components';

const Sidebar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #000;
  padding: 20px;
  z-index: 9999;
  overflow-x: hidden;
  color: #fff;
`;

const SidebarHeader = styled.div`
  margin-bottom: 20px;

  img {
    width: 100%;
  }

  h3 {
    margin-top: 0;
  }
`;

const ContentOptions = styled.div`
  margin: 20px 0px;
`;

export default function SidebarAdmin() {
  return (
    <Sidebar>
      <SidebarHeader>
        <img src={logoIntranet} alt="svf_logoIntranet" />
      </SidebarHeader>
      <SidebarHeader>
        <h3>General</h3>
      </SidebarHeader>
      <ContentOptions>
        <Options icon={<AiTwotoneHome />} text={'Inicio'} href={'/'}/>
        <Options isDropdown={true} icon={<BsFillBarChartFill/>} text={'Estadísticas'} />
        <Options icon={<AiFillDatabase />} text={'Datos'} href={'/'}/>
      </ContentOptions>
      <div>
        <h3>Gestión</h3>
      </div>
      <ContentOptions>
        <Options icon={<FaUserGraduate />} text={'Estudiantes'} href={'/'}/>
        <Options icon={<FaChalkboardTeacher />} text={'Profesores'} href={'/'}/>
        <Options icon={<RiParentFill />} text={'Padres'} href={'/'}/>
      </ContentOptions>
      <br /><br />
      <Options icon={<FaSignOutAlt />} text={'Cerrar Sesión'} href={'/'}/>
    </Sidebar>
  );
}

