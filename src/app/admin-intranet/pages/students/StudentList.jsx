import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import ActionButton from '../../components/buttons/ActionButton.jsx';
import StudentsTable from '../../components/table/StudentsTable.jsx';
import {useNavigate} from "react-router-dom";
import {AlertContext} from "../../setup/context/AlertContext.jsx";
import {allStudents} from "../../setup/api/allStudents.js";
import {useQuery} from "react-query";
import {PropagateLoader} from "react-spinners";
export function StudentList() {

	const {setAlert} = useContext(AlertContext)
	const [selectedRow, setSelectedRow] = useState(null);
	const navigate = useNavigate();
	const cookie = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTVkYwMDA3IiwiaWF0IjoxNjg0NjE1Njc4LCJleHAiOjE2ODQ3MDIwNzh9.ImH5mgwsr046vYo_gx_X3akEMsI3kFu5NzJ5nVlfSjc"
	const {isLoading, data} = useQuery('student', () => allStudents(cookie), {})

	const handleNewStudentClick = () => {
		navigate('/admin/estudiantes/nuevo');
	}

	const handleDeleteStudentClick = () => {
		setAlert({
			title: 'Estas a punto de eliminar a un estudiante',
			message: '¿Estas seguro de que quieres eliminar a este estudiante? Esta acción no puede deshacerse',
			data: { studentCode: selectedRow },
		})
	}

	return (
		<>
			<ButtonContainer>
				<ActionButton
					className={'mainButton'}
					text={'NUEVO ALUMNO'}
					onClickFn={handleNewStudentClick}
				/>
				<ActionButton
					className={'secondButton'}
					text={'ELIMINAR ALUMNO'}
					onClickFn={handleDeleteStudentClick}
					disabled={!selectedRow}
				/>
			</ButtonContainer>
			<Title>Lista de estudiantes</Title>
			{
				isLoading ? <Loader><PropagateLoader color={'#ffffff'}/></Loader> :
					<TableContainer>
						<StudentsTable
							selectedRow={selectedRow}
							setSelectedRow={setSelectedRow}
							studentList={data}
						/>
						<PaginationContainer>
							<PaginationButton>Anterior</PaginationButton>
							<PaginationNumber active>1</PaginationNumber>
							<PaginationNumber>2</PaginationNumber>
							<PaginationNumber>3</PaginationNumber>
							<PaginationNumber>4</PaginationNumber>
							<PaginationNumber>5</PaginationNumber>
							<PaginationButton>Siguiente</PaginationButton>
						</PaginationContainer>
					</TableContainer>
			}
		</>
	);
}

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Title = styled.h1`
  text-align: left;
`;

const ButtonContainer = styled.div`
  gap: 50px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin: 22px 0;
`;

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1 1 0;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const PaginationButton = styled.button`
  background-color: #151e1a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #1c2923;
  }
`;

const PaginationNumber = styled.button`
  background-color: ${({active}) => (active ? '#1c2923' : '#151e1a')};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;

  &:hover {
    background-color: #1c2923;
  }
`;