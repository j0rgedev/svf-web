import Sidebar from '../../../common/components/Sidebar/Sidebar'
import React from 'react'
import '../styles/stylesConfirm.css'
import {BsFillPatchCheckFill} from 'react-icons/bs'

function Confirmation() {
  return (
      <div className='container5'>
        <Sidebar width={'40%'}/>
        <div className='right-container5'>
          <i><BsFillPatchCheckFill/></i>
          <h1>PAGO CONFIRMADO</h1>
          <h2>Tu matrícula se registro correctamente con el siguiente numero de orden:</h2>
          <h2 id='cod'>N°1000321</h2>
        </div>
      </div>
    
  )
}

export default Confirmation