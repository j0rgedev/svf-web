import React from 'react';
import styled, { css } from 'styled-components';
import ButtonMode from './ButtonMode';

const ContentSearch = styled.div`
  display: flex;
  flex-direction: row;
  height: 72px;
  border: 1px solid black;
  padding: 8px;
  border-radius: 1rem;
  gap: 10px;
  width: 70%;
  margin-top: 20px;
  margin-left: 300px;
  background-color: #151E1A;
  justify-content: ${({ isSearch }) => isSearch ? 'space-evenly' : 'flex-end'};
`;

const Input = styled.input.attrs({
  placeholder: 'Buscar por nombre o código'
})`
  ${({ isSearch }) => !isSearch && css`
    display: none;
  `}
  width: 80%;
  height: 50px;
  padding: 20px;
  border: none;
  outline: none;
  font-size: 20px;
  background-color: #151E1A;
  color: white;
  &::placeholder {
    color: white;
  }
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  width: 4rem;
`;

const Avatar = styled.img`
  border-radius: 2rem;
`;

export default function TopAdmin({ isSearch, text, src }) {
  return (
    <ContentSearch isSearch={isSearch}>
      <Input className={isSearch ? 'Search' : 'NoSearch'} isSearch={isSearch} />
      <ButtonMode/>
      <Name>{text}</Name>
      <Avatar id='avatar' src={src} />
    </ContentSearch>
  );
}
