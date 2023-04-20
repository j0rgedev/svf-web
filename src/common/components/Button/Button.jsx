import React from 'react'
import './style.css'

export default function Button ({text, isMain, width}) {
    return (
      <div className='button-content'style={{width:width}}>
      <button className={isMain === true ? 'button1' : 'button2'}>{text}</button>
      </div>
    )
  
}
