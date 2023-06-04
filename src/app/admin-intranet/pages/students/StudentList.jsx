import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import ActionButton from '../../components/buttons/ActionButton.jsx';
import StudentsTable from '../../components/table/StudentsTable.jsx';
import {useNavigate, useOutletContext} from "react-router-dom";
import {AlertContext} from "../../setup/context/AlertContext.jsx";
import {allStudents} from "../../setup/api/allStudents.js";
import {useMutation, useQuery} from "react-query";
import {PropagateLoader} from "react-spinners";
import {toast} from 'react-hot-toast';
import {getCookie} from "../../../login/setup/utils/cookiesConfig.js";

export function StudentList() {

	const { alert, setAlert } = useContext(AlertContext);
	const [selectedRow, setSelectedRow] = useState(null);
	const navigate = useNavigate();
	const [students, setStudents] = useState([]);
	const [filteredStudents, setFilteredStudents] = useState([]);
	const [searchText, setSearchText] = useOutletContext();

	const studentsMutation = useMutation({
		mutationFn: allStudents,
		onSuccess: ({ data }) => {
			setStudents(data);
			console.log(data);
			setFilteredStudents(data);
			console.log(data);
		},
		onError: ({ response }) => {
			toast.error(response.data.message);
		},
	});

	const handleNewStudentClick = () => {
		navigate('/admin/estudiantes/nuevo');
	};

	const handleDeleteStudentClick = () => {
		setAlert({
			title: 'Estas a punto de eliminar a un estudiante',
			message:
				'¿Estas seguro de que quieres eliminar a este estudiante? Esta acción no puede deshacerse',
			data: { studentCode: selectedRow },
		});
	};

	const filterStudents = () => {
		if (searchText === '') {
			setFilteredStudents(students); // Mostrar todos los estudiantes si no hay texto de búsqueda
		} else {
			const filtered = students.filter((student) => {
				return (
					student.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
					student.studentCod.toLowerCase().includes(searchText.toLowerCase())
				);
			});
			setFilteredStudents(filtered);
		}
	};

	useEffect(() => {
		const token = getCookie('SESSION').token;
		studentsMutation.mutate(token);
	}, [alert]);

	useEffect(() => {
		filterStudents(); // Actualizar estudiantes filtrados cuando cambie el texto de búsqueda
	}, [searchText]);

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
				studentsMutation.isLoading ? <Loader><PropagateLoader color={'#ffffff'}/></Loader> :
					<TableContainer>
						<StudentsTable
							selectedRow={selectedRow}
							setSelectedRow={setSelectedRow}
							studentList={filteredStudents}
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