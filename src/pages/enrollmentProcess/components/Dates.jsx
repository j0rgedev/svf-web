import InputField from '../../../common/components/Inputfield/Inputfield'
import Sidebar from '../../../common/components/Sidebar/Sidebar'
import {BsFillPersonFill} from 'react-icons/bs'
import {MdSettingsCell} from 'react-icons/md'
import {SiLevelsdotfyi} from 'react-icons/si'
import {MdSchool} from 'react-icons/md'
import Button from '../../../common/components/Button/Button'
import React from 'react'
import '../styles/stylesDates.css'
import StepProgress from '../../../common/components/StepProgress/StepProgress'


function Dates() {
  return (
      <div className='container4'>
        <Sidebar width={'40%'}/>
        <div className='right-container4'>
          <h1>PROCESO DE MATRíCULA</h1>
          <StepProgress number={'1'}/>
          <h2>Bienvenido a este nuevo año escolar. Por favor, confirma tus datos.</h2>
          <form className='inputs-container4'>
            <div className='inputs1'>
            <InputField label={'Nombres'} type={"text"} icon={<BsFillPersonFill/>} isPassword={false}/>
            <InputField label={'Celular'} type={"text"} icon={<MdSettingsCell/>} isPassword={false}/>
            <InputField label={'Nivel'} type={"text"} icon={<SiLevelsdotfyi/>} isPassword={false}/>
            <InputField label={'Grado y Sección'} type={"text"} icon={<MdSchool/>} isPassword={false}/>
            </div>
            <div className='ButtonDates'>
            <Button text={'SIGUIENTE'} isMain={true} width={'100%'}/>
          </div>
          </form>
          
        </div>
      </div>
    
  )
}

export default Dates