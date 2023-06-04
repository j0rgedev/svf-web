import styled from 'styled-components';
import DarkModeButton from './buttons/DarkModeButton.jsx';
import avatar from '../assets/avatar.png';

export default function MainHeader({isSearch, text, searchText, setSearchText}) {

	return (
		<ContentSearch isSearch={isSearch}>
			<Input
				placeholder={isSearch ? 'Buscar por nombre o código' : ''}
				className={isSearch ? 'Search' : 'NoSearch'}
				disabled={!isSearch}
				value={isSearch ? searchText : ''}
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<DarkModeButton/>
			<Name>{text}</Name>
			<Avatar>
				<img src={avatar} alt="admin_avatar"/>
			</Avatar>
		</ContentSearch>
	);
}

const ContentSearch = styled.div`
  display: flex;
  flex-direction: row;
  height: 66px;
  padding: 0 1.5rem;
  border-radius: 1rem;
  gap: 10px;
  background-color: #151E1A;
  justify-content: ${({isSearch}) => isSearch ? 'space-evenly' : 'flex-end'};
`;

const Input = styled.input`
  width: 80%;
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: 300;
  color: #E4E4E4;
  background-color: transparent;

  &::placeholder {
    color: white;
    font-weight: 200;
  }
`

const Name = styled.div`
  display: flex;
  align-items: center;
  width: 4rem;
`;

const Avatar = styled.div`
  width: 100%;
  height: 100%;
  flex: 1 1 0;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: 80%;
    object-fit: cover;
  }
`;
