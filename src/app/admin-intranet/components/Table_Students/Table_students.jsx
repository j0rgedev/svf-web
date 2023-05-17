import React from 'react';
import './table.css'
import {AiOutlineDown} from 'react-icons/ai'
import List_student from '../List_student';

function Table_students({text}) {
    return (

      <div className='form_content'>
      <div className='cont_students'>
      <h1>{text}</h1>
  <table id='table_students' style={{ borderCollapse: 'collapse' }}>
  <thead>
    <tr id='headTable'>
      <th></th>
      <th><div className='thHead'>Código<AiOutlineDown /></div></th>
      <th><div className='thHead'>Nombres<AiOutlineDown /></div></th>
      <th><div className='thHead'>Nacimiento<AiOutlineDown /></div></th>
      <th><div className='thHead'>Estado<AiOutlineDown /></div></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  <List_student cod={'SVF0001'} name={'Arturo Adrian Rodriguez A'} date={'01/01/2000'} state={'Matriculado'}/>
  <List_student cod={'SVF0001'} name={'Arturo Adrian Rodriguez A'} date={'01/01/2000'} state={'Matriculado'}/>
  </tbody>
</table>
      </div>
      </div>
    );
  }
  
  export default Table_students;


