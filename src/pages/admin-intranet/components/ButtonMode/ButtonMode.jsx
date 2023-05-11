import React, {useState} from 'react';
import './styleButton.css';
import {FaSun} from 'react-icons/fa';
import {BsMoonFill} from 'react-icons/bs';
import Mode from '../../config/Mode.js';

function ButtonMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    const styles = isDarkMode ? Mode.dark : Mode.light;

    return (
        <>
            <input type="checkbox" id="switch" onChange={handleToggle}/>

            <div className="switch-btn">
                <label htmlFor="switch">
                    <div className="icons">
                        <span className="material-symbols-rounded"> <FaSun/> </span>
                        <span className="material-symbols-rounded"> <BsMoonFill/> </span>
                    </div>
                </label>
            </div>

            <style>{`
        body {
          background-color: ${styles.backgroundColor};
          color: ${styles.color};
        }
        a{
            color: ${styles.color};
        }
        
      `}</style>
        </>
    );
}

export default ButtonMode;

