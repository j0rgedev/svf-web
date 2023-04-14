import React from "react"
import './style.css'
export default function Inputfield({label,value, onChange,type}){
    return(
        <div className="input-field">
            <label>{label}</label>
            <input type={type} value={value} onChange={onChange} />
        </div>
        
    )
}
