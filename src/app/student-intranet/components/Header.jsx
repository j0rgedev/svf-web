import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from "react";
import avatar from '../../../../src/app/admin-intranet/assets/avatar.png';

export default function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!isDropdownOpen);
      };
    
      const dropdownVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      };    

  return (
    <TopContent>
        <div className={'top-left'}>
          <Return href='/estudiante'><FaArrowLeft style={{ fontSize: '24px' }} /></Return>
          <h2>Pensiones</h2>
        </div>
        <Image onClick={handleDropdownToggle}>
          <img src={avatar} alt="student_avatar" />
          {isDropdownOpen && (
            <DropdownContent
              initial="hidden"
              animate="visible"
              variants={dropdownVariants}
              transition={{ duration: 0.3 }}>
              <DropdownItem>Cerrar Sesión</DropdownItem>
            </DropdownContent>
          )}
        </Image>
      </TopContent>
  );
}

const TopContent = styled.div`
  padding: 1rem 2rem 2rem;
  display: flex;
  flex-direction: row;
  gap: 15px;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  background: rgb(43, 68, 51);
  color: white;

  .top-left {
    display: flex;
    gap: 10px;
  }
`;

const Return = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: white;
`;

const Image = styled.div`
  width: 8%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 10px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #d1b33e;
	border-radius: 4px;
  }
`;
const DropdownContent = styled(motion.div)`
  background-color: #a8923a;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  z-index: 999;
`;