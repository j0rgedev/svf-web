import React, {useEffect, useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import {FaSun} from 'react-icons/fa';
import {BsMoonFill} from 'react-icons/bs';
import Theme from '../../styles/theme.js';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.styles.backgroundColor};
    color: ${(props) => props.styles.color};
  }

  a {
    color: ${(props) => props.styles.color};
  }

  p{
    color: ${(props) => props.styles.color};
  }
  
  
`;

const SwitchInput = styled.input.attrs({ type: 'checkbox', id: 'switch' })`
  display: none;
`;

const SwitchButton = styled.div`
  width: 61px;
  height: 38px;
  background-color: #C5CCD3;
  border: 4px solid rgb(46, 48, 82);
  border-radius: 30px;
  display: flex;
  align-items: center;
  margin-top: 10px;

  & label {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f8f9;
    border-radius: 30px;
    overflow: hidden;
    cursor: pointer;

    & .icons {
      display: flex;
      align-items: center;
      gap: 20px;
      transform: translate(-11px, 19px) rotate(120deg);
      transition-duration: 500ms;
      user-select: none;
      color: #17193F;

      & .material-symbols-rounded {
        margin: 20px 6px 14px 0px;
      }
    }
  }

  ${SwitchInput}:checked ~ & {
    border: 4px solid #2e3052;
    background-color: #000F08;

    & label {
      transform: translateX(calc(50px - 30px));
      box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.2);
      transition-duration: 500ms;

      & .icons {
        transform: translateX(-20px);
      }
    }
  }
`;

function DarkModeButton() {

	const getDarkMode = () => {
		const savedMode = sessionStorage.getItem('dark');
		return savedMode ? JSON.parse(savedMode) : false;
	};

	const setDarkMode = (darkMode) => {
		sessionStorage.setItem('dark', JSON.stringify(darkMode));
	};

	const [isDarkMode, setIsDarkMode] = useState(false);

	const handleToggle = () => {
		const newDarkMode = !isDarkMode;
		setIsDarkMode(newDarkMode);
		setDarkMode(newDarkMode);
	};

	const styles = isDarkMode ? Theme.dark : Theme.light;

	useEffect(() => {
		setIsDarkMode(getDarkMode());
	}, []);

	return (
		<>
			<SwitchInput onChange={handleToggle} checked={isDarkMode}/>
			<SwitchButton>
				<label htmlFor="switch">
					<div className="icons">
						<span className="material-symbols-rounded"> <FaSun/> </span>
						<span className="material-symbols-rounded"> <BsMoonFill/> </span>
					</div>
				</label>
			</SwitchButton>
			<GlobalStyle styles={styles}/>
		</>
	);
}

export default DarkModeButton;
