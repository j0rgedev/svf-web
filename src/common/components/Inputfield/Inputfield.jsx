import React from "react"

export default function Inputfield({text, type, icon, isPassword}){
    return(
        <div className="input-field">
            <label htmlFor="">{text}</label>
            <input type="text" />
            <label htmlFor="">{isPassword}</label>
            <input type="password" />
            {isPassword ? <input type="password"/>: <input type={text}/>}
        </div>
    )
}
