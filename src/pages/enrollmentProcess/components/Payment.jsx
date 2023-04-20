import Sidebar from '../../../common/components/Sidebar/Sidebar'
import Button from '../../../common/components/Button/Button'
import React from 'react'
import '../styles/stylesDates.css'
import StepProgress from '../../../common/components/StepProgress/StepProgress'


function Payment() {
  return (
      <div className='container4'>
        <Sidebar width={'40%'}/>
        <div className='right-container4'>
          <h1>PROCESO DE MATRíCULA</h1>
          <StepProgress number={'3'}/>
          <div id='div-conteiner'>
          <div className='Resume'><h3>Resumen</h3>
            <div className='resume-details'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam 
            error perferendis quaerat ducimus quas. Pariatur voluptatum boletymp.
            pag.
            </div>
            <Button text={'REGRESAR'} isMain={false} width={'200px'}/>
            </div>
          <div className='paymentMethods'><h3>Métodos de Pago</h3>
          <div className='buttons-payments'>
          <button>Tarjeta de Crédito o débito</button>
          <button>Pago Efectivo</button>
          </div>
          <Button text={'PAGAR'} isMain={true} width={'200px'}/>
          </div>
          </div>
        </div>
      </div>
    
  )
}

export default Payment