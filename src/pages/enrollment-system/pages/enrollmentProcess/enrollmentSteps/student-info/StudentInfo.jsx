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
import { useEffect, useState } from "react";
import {getCookie} from "../../../../../enrollment-system/setup/utils/cookiesConfig.js";
import { useEnrollment } from '../../../../setup/api/enrollmentAPI.js'
import {useMutation, useQuery} from "react-query";

function StudentInfo() {

  const [studentInfo, setStudentInfo] = useState({
    studentCod: "",
    names: "",
    lastNames: "",
    dni: "",
    newLevel: "",
    newGrade: "",
  });

 const enrollmentMutation = useMutation(
  {
      mutationFn: useEnrollment,
      onSuccess: (data) => {
          setStudentInfo(data)
      },
  }
)

  useEffect(() => {
    const token =getCookie('SESSION')
    enrollmentMutation.mutate(token)
    
  }, []);
  

console.log(studentInfo.names)
  
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
              labelText={'Nombre'}
              className={'names'}
              inputType={"text"}
              icon={<BsFillPersonFill />}
              textValue={studentInfo.names}
              disabled={true} />
            <InputField
              labelText={'DNI'}
              className={'names'}
              inputType={"text"}
              icon={<AiFillIdcard />}
              textValue={studentInfo.dni}
              disabled={true} />
            <InputField
              labelText={'Nivel'}
              className={'names'}
              inputType={"text"}
              icon={<SiLevelsdotfyi />}
              textValue={studentInfo.newLevel}
              disabled={true} />
            <InputField
              labelText={'Grado'}
              className={'names'}
              inputType={"text"}
              icon={<MdSchool />}
              textValue={studentInfo.newGrade}
              disabled={true} />
          </div>
          <Button text={'SIGUIENTE'} isMain={true} width={'100%'} />
        </form>
      </div>
    </div>

  )
}

export default StudentInfo