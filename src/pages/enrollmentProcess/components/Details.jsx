import Sidebar from '../../../common/components/Sidebar/Sidebar'
import Button from '../../../common/components/Button/Button'
import React from 'react'
import '../styles/stylesDates.css'
import StepProgress from '../../../common/components/StepProgress/StepProgress'


function Details() {
  return (
      <div className='container4'>
        <Sidebar width={'40%'}/>
        <div className='right-container4'>
          <h1>PROCESO DE MATRíCULA</h1>
          <StepProgress number={'2'}/>
          <div className='TC'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam 
            error perferendis quaerat ducimus quas. Pariatur voluptatum distinctio 
            doloremque repellendus fuga officia dolorum exercitationem, iure non quae
             magni nulla aliquid deleniti.</div>
          <div id='ButtonDetails'>
            <Button text={'REGRESAR'} isMain={false} width={'200px'}/>
            <Button text={'SIGUIENTE'} isMain={true} width={'200px'}/>
          </div>
        </div>
      </div>
    
  )
}

export default Details