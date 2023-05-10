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
    }
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
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
`;


export default function Options({ href, text, icon, isDropdown }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          <DropdownButton id="btnDrop" onClick={toggleDropdown} >
            {icon}
            {text}
            <AiOutlineDown />
          </DropdownButton>
          {isDropdownOpen && (
            <DropdownMenu>
              <OptionLink className="Item" href="#">
                Opción 1
              </OptionLink>
              <OptionLink className="Item" href="#">
                Opción 2
              </OptionLink>
            </DropdownMenu>
          )}
        </>
      )}
    </OptionsList>
  );
}
