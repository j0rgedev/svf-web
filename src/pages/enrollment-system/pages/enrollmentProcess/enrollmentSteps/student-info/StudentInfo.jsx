import InputField from '../../../../components/inputField/InputField.jsx'
import Sidebar from '../../../../components/sidebar/Sidebar.jsx'
import { BsFillPersonFill } from 'react-icons/bs'
import { SiLevelsdotfyi } from 'react-icons/si'
import { MdSchool } from 'react-icons/md'
import Button from '../../../../components/Button.jsx'
import './studentInfoStyles.css'
import '../../../styles/globals.css'
import StepProgress from '../../../../components/stepProgress/StepProgress.jsx'
import { AiFillIdcard } from "react-icons/ai";
import {useEffect, useState} from "react";
import {getCookie} from "../../../../setup/utils/cookiesConfig.js";

function StudentInfo() {

  return (
    <div className='container'>
      <Sidebar width={'40%'} />
      <div className='right-container'>
        <h1>PROCESO DE MATRÍCULA</h1>
        <StepProgress number={'1'} />
        <p>Bienvenido a este nuevo año escolar. Por favor, confirma tus datos.</p>
        <form className='studentInfo-container'>
          <div className='studentInfo-inputs-container'>
            <InputField
              labelText={'Nombres'}
              className={'names'}
              inputType={"text"}
              icon={<BsFillPersonFill />} 
              disabled={true}/>
            <InputField
              labelText={'DNI'}
              className={'names'}
              inputType={"text"}
              icon={<AiFillIdcard />} 
              disabled={true}/>
            <InputField
              labelText={'Nivel'}
              className={'names'}
              inputType={"text"}
              icon={<SiLevelsdotfyi />} 
              disabled={true}/>
            <InputField
              labelText={'Grado'}
              className={'names'}
              inputType={"text"}
              icon={<MdSchool />}
              disabled={true} />
          </div>
          <Button text={'SIGUIENTE'} isMain={true} width={'100%'}/>
        </form>
      </div>
    </div>

  )
}

export default StudentInfo