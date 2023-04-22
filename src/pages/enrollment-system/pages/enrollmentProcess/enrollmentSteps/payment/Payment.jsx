import Sidebar from '../../../../components/sidebar/Sidebar.jsx'
import Button from '../../../../components/button/Button.jsx'
import './paymentStyles.css'
import '../../../styles/globals.css'
import StepProgress from '../../../../components/stepProgress/StepProgress.jsx'

function Payment() {
  return (
<div className='container'>
    <Sidebar width={'40%'}/>
    <div className='right-container'>
        <h1>PROCESO DE MATRíCULA</h1>
        <StepProgress number={'3'}/>
        <div className='payment-container'>
            <div className='summary-container'><h2>Resumen</h2>
                <p className='summary-info'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                    error perferendis quaerat ducimus quas. Pariatur voluptatum boletymp.
                    pag.
                </p>
                <Button text={'REGRESAR'} isMain={false} width={'200px'}/>
            </div>
            <div className='payment-methods'>
                <h3>Métodos de Pago</h3>
                <div className='payment-buttons'>
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