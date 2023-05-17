import React from 'react';
import styled from 'styled-components';
import { AiOutlineDown } from 'react-icons/ai';
import { useState } from 'react';

const OptionsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OptionItem = styled.li`
  a {
    gap: 10px;
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 18px;
    color: #fff;
    text-decoration: none;

    &:hover {
      background-color: #905D00;
      border-radius: 1rem;
      transition: 0.7s;
    }
  }

  &.selected a {
    background-color: white;
    color: #000;
  }
`;

const OptionLink = styled.a`
  text-decoration: none;
  color: white;
  align-items: center;
    padding: 10px;
    font-size: 18px;
    color: #fff;
    text-decoration: none;

  &:hover {
    cursor:pointer;
    background-color: #905D00;
    border-radius: 1rem;
    transition: 0.7s;
  }
`;

const DropdownButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color:white;
  gap: 10px;
  display:flex;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  color: #fff;
  text-decoration: none;

  &:hover {
    cursor:pointer;
    background-color: #905D00;
    border-radius: 1rem;
    transition: 0.7s;
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  max-height: ${({ isOpen }) => isOpen ? dropdownHeight : "0"};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const SpaceDiv = styled.div`
  display: flex;
  gap: 50px;
`;

const dropdownHeight = "100px";



export default function Options({ href, text, icon, isDropdown, isSelected }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const handleClick = () => {
    setIsSelected(true);
  }

  return (
    <OptionsList>
      {!isDropdown && (
        <OptionItem>
          <a href={href}>
            {icon}
            {text}
          </a>
        </OptionItem>
      )}
      {isDropdown && (
        <>
          <DropdownButton id="btnDrop" onClick={toggleDropdown}>
            {icon}
            <SpaceDiv>
              {text}
              <AiOutlineDown />
            </SpaceDiv>
          </DropdownButton>
          <DropdownMenu isOpen={isOpen}>
            <OptionLink className="Item" href="#" isSelected={false}>
              Opción 1
            </OptionLink>
            <OptionLink className="Item" href="#" isSelected={true}>
              Opción 2
            </OptionLink>
          </DropdownMenu>
        </>
      )}
    </OptionsList>
  );
}