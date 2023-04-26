import React from 'react'
import './alerts.css'

export default function Alerts ({isAlert,text,subtext,icon}) {
    return (
        <div className={isAlert === true ? 'conteiner-alert' : 'conteiner-warning'}>
        <div className={isAlert === true ? 'icon-alert' : 'icon-warning'}>  
         <i>{icon}</i>
         </div>    
        <div 
            className={ isAlert === true ? 'alert' : 'warning'}
            /* htmlFor={id} */
        >
         <div>{text}</div>
         <p>{subtext}</p>
         <button id='btn-accept'>ACEPTAR</button>
         <button id='btn-cancel'>CANCELAR</button>
        </div>
    </div>
    )
  
}

