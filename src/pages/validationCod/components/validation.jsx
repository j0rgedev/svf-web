import Sidebar from '../../../common/components/Sidebar/Sidebar'
import Button from '../../../common/components/Button/Button'
import '../../validationCod/styles/styles.css'
import React from 'react'

function Validation() {
  return (
      <div className='container3'>
        <Sidebar width={'40%'}/>
        <div className='right-container3'>
          <h1>VALIDACIÓN</h1>
          <h2>Te enviaremos un codigo de verificación a este numero de teléfono</h2>
          <p>Por favor, ingresa el código</p>
          <form className='inputs-container3'>
          <input type="text" placeholder="CÓDIGO"/>
          <Button text={'VALIDAR CÓDIGO'} isMain={true} width={'100%'}/>
          </form>
        </div>
      </div>
    
  )
}

export default Validation