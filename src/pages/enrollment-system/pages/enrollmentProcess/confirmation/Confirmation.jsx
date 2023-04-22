import Sidebar from '../../../components/sidebar/Sidebar.jsx'
import './confirmationStyles.css'
import {BsFillPatchCheckFill} from 'react-icons/bs'
import '../../styles/globals.css'

function Confirmation() {
  return (
      <div className='container'>
          <Sidebar width={'40%'}/>
          <div className='right-container'>
              <BsFillPatchCheckFill className={'confirmation-icon'}/>
              <h1>PAGO CONFIRMADO</h1>
              <h2 style={{textAlign: 'center'}}>Tu matrícula se registro correctamente con el siguiente numero de orden:</h2>
              <h2 className={'confirmation-id'}>N° 1000321</h2>
        </div>
      </div>
  )
}

export default Confirmation