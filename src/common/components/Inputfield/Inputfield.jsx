import React from "react"
import './style.css'

function Inputfield({ label, type, icon, isPassword}){
    return(
        <div className="input-field">
            <label>{label}</label>
            <input type={type}/>
            {icon}
        </div>
        
    )
}

export default Inputfield
