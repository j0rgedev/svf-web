import React from 'react'
import './buttonStyles.css'

export default function Button ({text, isMain, width, submit,id, isLoading}) {
    return (
        <button
            className={ isMain === true ? 'main-button' : 'secondary-button'}
            type={submit ? 'submit' : 'button'}
            style={{width: width}}
            id={id}
            disabled={isLoading}
        >
            {text}
        </button>
    )
  
}
