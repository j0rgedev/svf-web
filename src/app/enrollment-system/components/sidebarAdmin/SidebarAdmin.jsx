import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesAdmin.css'

export default function SidebarAdmin() {
  return (
    <nav id="sidebar">
      <div className="sidebar-header">
        <h3>Dashboard</h3>
      </div>
      <div className="sidebar-header">
        <h3>General</h3>
      </div>
      <ul className="list-unstyled components">
        <li>
          <a href="#about">Incio</a>
        </li>
        <li>
          <a href="#services">Estadísticas</a>
        </li>
        <li>
          <a href="#contact">Datos</a>
        </li>
        </ul>
        <div className="sidebar-header">
        <h3>Gestión</h3>
      </div>
        <ul className="list-unstyled components">
        <li>
          <a href="#about">Estudiantes</a>
        </li>
        <li>
          <a href="#services">Profesores</a>
        </li>
        <li>
          <a href="#contact">Cursos</a>
        </li>
      </ul>
    </nav>
  );
}

