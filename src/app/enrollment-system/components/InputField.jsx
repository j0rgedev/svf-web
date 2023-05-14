import {useState} from 'react'
import {BsEyeSlashFill, BsFillPersonFill} from 'react-icons/bs'
import {BsEyeFill} from "react-icons/bs";
import styled from 'styled-components'
import SkeletonInput from "./SkeletonInput.jsx";

function InputField({
        inputType,
        labelText,
        className,
        id,
        icon,
        changeFunction,
        textValue,
        blurFunction,
        disabled,
        errorText,
        isLoading
    }) {

    const [showPassword, setShowPassword] = useState(false)
    const isError = errorText && errorText.length > 0

    return (
        <InputFieldWrapper>
            <LeftIcon className={`${isError ? 'color-error' : 'color-valid'}`}>
                {icon}
            </LeftIcon>
            <Label
                htmlFor={id}
                className={`${isError ? 'color-error' : 'color-valid'}`}>
                {labelText}
            </Label>
            {
                isLoading ? <SkeletonInput icon={<BsFillPersonFill/>} labelText={labelText}/>:
                    <Input
                        type={showPassword ? 'text' : inputType}
                        name={id}
                        aria-label={id}
                        className={`${className} ${isError ? 'input-error' : 'color-valid'}`}
                        onChange={changeFunction}
                        value={textValue}
                        onBlur={blurFunction}
                        disabled={disabled}
                    />
            }
            {errorText && <ErrorText className="error">{errorText}</ErrorText>}
            {inputType === 'password' ? (showPassword ?
                    <BsEyeFill
                        className={'eye-icon'}
                        onClick={() => setShowPassword(!showPassword)}/> :
                    <BsEyeSlashFill
                        className={'eye-icon'}
                        onClick={() => setShowPassword(!showPassword)}/>)
                : null}
        </InputFieldWrapper>
    )
}

const InputFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
  
    .eye-icon{
        position: absolute;
        top: 40px;
        right: 10px;
        cursor: pointer;
        color: #26261b;
    }
`;

const ErrorText = styled.p`
    color: red;
    font-weight: 100;
    font-size: 12px;
    line-height: 1.1;
    margin-top: 6px;
`;

const Input = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #090000;
    outline: none;
    padding: 10px 35px 5px 35px;
    
    &.input-error {
        color: red;
        border-bottom: 1px solid red !important;
    }

    &.color-valid {
        color: #848874;
        border-bottom: 1px solid #848874;
    }
`;

const LeftIcon = styled.i`
    font-size: 1.2rem;
    position: absolute;
    top: 33px;
    left: 10px;
    
    &.color-valid {
      color: #848874;
    }
    
    &.color-error {
      color: red;
    }
`;

const Label = styled.label`
    &.color-valid {
      color: #848874;
    }
    
    &.color-error {
      color: red;
    }
`;

const PasswordEye = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    margin-right: 10px;
    
    &.eye-icon {
        color: #26261b;
    }
`;

export default InputField
