import {AiOutlineDown} from 'react-icons/ai'
import styled from 'styled-components';
import LastStudentTableRow from './LastStudentTableRow.jsx';


function LastStudentsTable({selectedRow, setSelectedRow, studentList}) {

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
						<DivRows>Código<AiOutlineDown/></DivRows>
					</th>
					<th>
						<DivRows>Nombres<AiOutlineDown/></DivRows>
					</th>
					<th>
						<DivRows>Nivel<AiOutlineDown/></DivRows>
					</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{
					studentList && studentList['data'].map((student) => (
						<LastStudentTableRow
							key={student['studentCod']}
							cod={student['studentCod']}
							name={student['fullName']}
                            level={student['level']}
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

const DivRows = styled.div`
    display: flex;
    align-items: center;
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

export default LastStudentsTable;


