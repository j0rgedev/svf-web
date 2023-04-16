import React from "react"
import './style.css'
export default function Inputfield({label,value, onChange,type, isPassword}){
    return(
        <div className="input-field">
            <label>{label}</label>
            <input type={type} value={value} onChange={onChange} isPassword={isPassword? "text" : "password"} />
            
        </div>
        
    )
}
