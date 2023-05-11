import InputField from '../../../../components/InputField.jsx'
import {BsFillPersonFill} from 'react-icons/bs'
import {SiLevelsdotfyi} from 'react-icons/si'
import {MdSchool} from 'react-icons/md'
import './studentInfoStyles.css'
import '../../../styles/globals.css'
import {AiFillIdcard} from "react-icons/ai";
import {useContext} from "react";
import {useQuery} from "react-query";
import {useStudent} from "../../../../setup/api/studentAPI.js";
import {getCookie} from "../../../../setup/utils/cookiesConfig.js";
import student_enrolled from '../../../../assets/enrollment_confirmed.png';
import Skeleton from "react-loading-skeleton";
import {EnrollmentProcessContext} from "../../../../context/EnrollmentProcessContext.jsx";
import styled from "styled-components";


function StudentInfo() {

    const {enrollmentProcess, setEnrollmentProcess} = useContext(EnrollmentProcessContext);
    const token = getCookie('SESSION');

    const {isLoading, data, error} = useQuery('student', () => useStudent(token), {
        onSuccess: (data) => {
            if (data['enrollmentId']) {
                setEnrollmentProcess({
                    'studentCod': data['student_cod'],
                    'names': data['names'],
                    'enrollmentId': data['enrollmentId']
                })
            }
        },
        onError: (error) => {
            console.log(error);
        },
        staleTime: 60000, // 1 minute
        cacheTime: 3600000, // 1 hour
    });

    return (
        <Container>
            {
                isLoading ? <Skeleton /> :
                (
                    <StudentInfoContainer>
                        <p>Bienvenido a este nuevo año escolar. Por favor, confirma tus datos.</p>
                        <InputField
                            labelText={'Nombres'}
                            className={'names_input'}
                            inputType={"text"}
                            textValue={!isLoading && data['names'] + ' ' + data['lastnames']}
                            icon={<BsFillPersonFill/>}
                            disabled={true}
                            isLoading={isLoading}
                        />
                        <InputField
                            labelText={'DNI'}
                            className={'dni_input'}
                            inputType={"text"}
                            textValue={!isLoading && data['dni']}
                            icon={<AiFillIdcard/>}
                            disabled={true}
                            isLoading={isLoading}
                        />
                        <InputField
                            labelText={'Nivel'}
                            className={'level_input'}
                            inputType={"text"}
                            textValue={!isLoading && data['newLevel']}
                            icon={<SiLevelsdotfyi/>}
                            disabled={true}
                            isLoading={isLoading}
                        />
                        <InputField
                            labelText={'Grado'}
                            className={'grade_input'}
                            inputType={"text"}
                            textValue={isLoading ? <Skeleton/> : data['newGrade']}
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

        </Container>
    )
}

const Container = styled.div`
  height: 100%;
`

const StudentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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