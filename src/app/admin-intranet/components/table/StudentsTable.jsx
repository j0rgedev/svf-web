import {AiOutlineDown} from 'react-icons/ai'
import StudentTableRow from './StudentTableRow.jsx';
import styled from 'styled-components';
import {useState} from "react";
import Skeleton from "react-loading-skeleton";

function StudentsTable({selectedRow, setSelectedRow, studentList}) {

	const handleCheckboxChange = (cod) => {
		if (selectedRow === cod) {
			setSelectedRow(null);
		} else {
			setSelectedRow(cod);
		}
	};

	return (
		<>
			<Table>
				<thead>
				<tr>
					<th></th>
					<th>
						<div>Código<AiOutlineDown/></div>
					</th>
					<th>
						<div>Nombres<AiOutlineDown/></div>
					</th>
					<th>
						<div>Nacimiento<AiOutlineDown/></div>
					</th>
					<th>
						<div>Estado<AiOutlineDown/></div>
					</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{
					studentList && studentList['data'].map((student) => (
						<StudentTableRow
							key={student['studentCod']}
							cod={student['studentCod']}
							name={student['fullName']}
							date={student['birthday']}
							state={
								student['enrolled'] ? 'Matriculado' : 'No Matriculado'
							}
							handleChange={handleCheckboxChange}
							selected={selectedRow === student['studentCod']}
						/>
					))
				}
				</tbody>
			</Table>
		</>
	);
}

const Wrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  height: inherit;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead tr {
    background-color: transparent;
  }

  thead th {
    font-weight: 300;
    color: #909090;
    font-size: 18px;
  }

  th,
  td {
    padding: 10px;
    text-align: left;

  }

  tbody td {
    border-bottom: 8px solid #000f08;
  }

  tbody tr {
    background-color: #151e1a;
    margin-bottom: 10px;
  }

  .checkbox, .button {
    text-align: center;
  }
`

export default StudentsTable;


