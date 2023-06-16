import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.form`
  padding: 0 16px;
  max-width: 550px;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 600;
  line-height: 36px;
`;

const InputGroup = styled.div`
  background-color: rgb(44 52 48);
  display: block;
  position: relative;

  label {
	padding: 4px 20px;
    width: 100%;
    display: block;
    text-align: left;
    color: #ffff;
    cursor: pointer;
    position: relative;
    z-index: 2;
    transition: color 200ms ease-in;
    overflow: hidden;

    &:before {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      content: '';
      background-color: #5562eb;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale3d(1, 1, 1);
      transition: all 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
      opacity: 0;
      z-index: -1;
    }

    &:after {
      width: 24px;
      height: 24px;
      content: '';
      border: 2px solid #D1D7DC;
      background-color: #fff;
      background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
      background-repeat: no-repeat;
      background-position: 1px 1px;
      border-radius: 50%;
      z-index: 2;
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      transition: all 200ms ease-in;
    }
  }

  input:checked ~ label {
    color: #fff;

    &:before {
      transform: translate(-50%, -50%) scale3d(56, 56, 1);
      opacity: 1;
    }

    &:after {
      background-color: #54E0C7;
      border-color: #54E0C7;
    }
  }

  input {
    width: 24px;
    height: 24px;
    order: 1;
    z-index: 2;
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    visibility: hidden;
  }
`;

const ContCheck = styled.div`
  width: 220px;
`;

export default function CheckMonths({ selectedMonth, setSelectedMonth, text, monthNumber }) {

  const handleCheckboxChange = (month_number) => {
    if (selectedMonth === month_number) {
      setSelectedMonth(3);
    } else {
      setSelectedMonth(month_number);
    }
  };

  return (
    <ContCheck >
      <FormGroup>
        <InputGroup>
          <input
            id={monthNumber}
            name={text}
            type="checkbox"
            checked={selectedMonth === monthNumber}
            onChange={() => handleCheckboxChange(monthNumber)}
          />
          <label htmlFor={monthNumber}>{text}</label>
        </InputGroup>
      </FormGroup>
    </ContCheck>
  );
}
