import React from 'react';

function List_student({cod, name, date,state}) { 
  return (
     
      <tr>
        <td><input type="checkbox" id='check'/></td>
        <td>{cod}</td>
        <td>{name}</td>
        <td>{date}</td>
        <td>{state}</td>
        <td><input type="submit" value='Ver Detalles' id='details'/></td>
      </tr>
  );
}

export default List_student;  
