import React from 'react'
import './stepProgressStyles.css'

export default function StepProgress ({number}) {
    return (
      <div className='step-content'>
        <div id="stepProgressBar">
          <div className="step">
            <div className={number === '1' ? 'bullet completed': 'bullet'}>1</div>
            <p className='step-text'>Datos</p>
          </div>
          <div className="step">
            <div className={number === '2' ? 'bullet completed': 'bullet'}>2</div>
            <p className='step-text'>Detalles</p>
          </div>
          <div className="step">
            <div className={number === '3' ? 'bulletP completed': 'bulletP'}>3</div>
            <p className='step-text'>Pagos</p>
          </div>
        </div>
      </div>
    )
}