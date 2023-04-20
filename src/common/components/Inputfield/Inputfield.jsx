import React from 'react'
import './style.css'
import {BsEyeSlashFill} from 'react-icons/bs'


function Inputfield({ type,label, icon, isPassword, onClick}){
    return(
        <div className="input-field">
            <label>{label}</label>
            <input type={type}  /> 
            <i className="i1">{icon}</i>
            {isPassword && <i className="i2" onClick={onClick}><BsEyeSlashFill/></i>}

        </div>
        
    )
}

export default Inputfield
