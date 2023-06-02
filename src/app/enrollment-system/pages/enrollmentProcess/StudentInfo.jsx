import InputField from '../../components/InputField.jsx'
import {MainParagraph} from "../styles.js";

import {BsFillPersonFill} from 'react-icons/bs'
import {SiLevelsdotfyi} from 'react-icons/si'
import {MdSchool} from 'react-icons/md'
import {AiFillIdcard} from "react-icons/ai";

import {useQuery} from "react-query";
import styled from "styled-components";

function StudentInfo() {

    const {data, isLoading} = useQuery('student');

    const studentData = data.data;

    return (
        <StudentInfoContainer>
            <MainParagraph>Bienvenido a este nuevo año escolar. Por favor, confirma tus datos.</MainParagraph>
            <InputField
                labelText={'Nombres'}
                className={'names_input'}
                inputType={"text"}
                textValue={studentData['names'] + ' ' + studentData['lastnames']}
                icon={<BsFillPersonFill/>}
                disabled={true}
                isLoading={isLoading}
            />
            <InputField
                labelText={'DNI'}
                className={'dni_input'}
                inputType={"text"}
                textValue={studentData['dni']}
                icon={<AiFillIdcard/>}
                disabled={true}
                isLoading={isLoading}
            />
            <InputField
                labelText={'Nivel'}
                className={'level_input'}
                inputType={"text"}
                textValue={studentData['newLevel']}
                icon={<SiLevelsdotfyi/>}
                disabled={true}
                isLoading={isLoading}
            />
            <InputField
                labelText={'Grado'}
                className={'grade_input'}
                inputType={"text"}
                textValue={studentData['newGrade']}
                icon={<MdSchool/>}
                disabled={true}
                isLoading={isLoading}
            />
            <RedirectWrapper>
                <Paragraph>Puedes actualizar tus datos en tu Portal Estudiantil</Paragraph>
                <Redirect href={'#'} target={'_blank'}>Ir a mi portal</Redirect>
            </RedirectWrapper>
        </StudentInfoContainer>
    )
}

const StudentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
`

const RedirectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Paragraph = styled.p`
  font-weight: 400;
`

const Redirect = styled.a`
  text-decoration: none;
  color: #05430C;
  font-weight: bold;
`

export default StudentInfo