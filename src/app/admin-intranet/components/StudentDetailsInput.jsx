import styled from 'styled-components';
import {useField} from "formik";

export default function StudentDetailsInput({icon, ...props}) {

	const [field, meta] = useField(props)

	return (
			<InputContainer>
				{icon}
				<InputField
					{...field}
					{...props}
					className={meta.touched && meta.error && 'input-error'}
				/>
			</InputContainer>
	);
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  width: 300px;
  gap: 8px;

`;

const InputField = styled.input`
  padding: 8px;
  outline: none;
  border: none;
  color: #fff;
  background-color: rgba(140, 140, 140, 0.1);
  font-size: 20px;
  width: 100%;
  transition: all .5s ease-in-out;
	
	&.input-error {
		background-color: rgba(255, 0, 0, 0.1);
		color: #ff0000;
  }

  &::placeholder {
    color: white;
  }

  &:disabled {
    color: #d7d7d7;
    background-color: transparent;
  }
`;