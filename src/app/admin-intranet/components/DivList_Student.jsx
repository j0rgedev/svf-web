import React from 'react';
import styled from 'styled-components';

const DivList = styled.div`
  background: #151E1A;
  color: #fff;
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 70%;
  justify-content: space-evenly;
  border-radius: 0.5rem;
  align-items: center;
  padding: 18px;

  input[type="checkbox"] {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    background-color: #000;
    color: #fff;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    width: 24px;
    height: 24px;
    appearance: none;
    border: 2px solid #B4F6FF;
    background-position: 0 -2rem;
    background-size: 100%;
    background-repeat: no-repeat;
    transition: all 0.3s ease-in-out;

    &:checked {
      background-color: rgb(75, 156, 13);
      color: rgb(75, 156, 13);
      background-position: 0 0;
    }
  }

  input[type="submit"] {
    border-radius: 10px;
    outline: none;
    padding: 6px 15px;
    background: #1E656D;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;

function DivList_Student({cod, name, date, state}) {
  return (
    <DivList>
      <input type="checkbox" id='check'/>
      <p>{cod}</p>
      <p>{name}</p>
      <p>{date}</p>
      <p>{state}</p>
      <input type="submit" value='Ver Detalles'/>
    </DivList>
  );
}

export default DivList_Student;
