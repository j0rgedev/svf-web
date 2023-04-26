import Sidebar from '../../../../components/sidebar/Sidebar.jsx'
import Button from '../../../../components/button/Button.jsx'
import './schoolTermsStyles.css'
import '../../../styles/globals.css'
import StepProgress from '../../../../components/stepProgress/StepProgress.jsx'


function SchoolTerms() {
  return (
      <div className='container'>
        <Sidebar width={'40%'}/>
        <div className='right-container'>
          <h1>PROCESO DE MATRíCULA</h1>
          <StepProgress number={'2'}/>
          <div className='terms-container'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              error perferendis quaerat ducimus quas. Pariatur voluptatum distinctio
              doloremque repellendus fuga officia dolorum exercitationem, iure non quae
              magni nulla aliquid deleniti.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              error perferendis quaerat ducimus quas. Pariatur voluptatum distinctio
              doloremque repellendus fuga officia dolorum exercitationem, iure non quae
              magni nulla aliquid deleniti.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              error perferendis quaerat ducimus quas. Pariatur voluptatum distinctio
              doloremque repellendus fuga officia dolorum exercitationem, iure non quae
              magni nulla aliquid deleniti.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              error perferendis quaerat ducimus quas. Pariatur voluptatum distinctio
              doloremque repellendus fuga officia dolorum exercitationem, iure non quae
              magni nulla aliquid deleniti.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              error perferendis quaerat ducimus quas. Pariatur voluptatum distinctio
              doloremque repellendus fuga officia dolorum exercitationem, iure non quae
              magni nulla aliquid deleniti.</div>
          <div className='step-buttons'>
            <a href='http://localhost:5173/matricula/informacion-estudiante'><Button text={'REGRESAR'} isMain={false} width={'200px'} /></a>
            <Button text={'SIGUIENTE'} isMain={true} width={'200px'}/>
          </div>
        </div>
      </div>
    
  )
}

export default SchoolTerms