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
            <Label
                htmlFor={id}
                className={`${isError ? 'color-error' : 'color-valid'}`}>
                {labelText}
            </Label>
            <InputWrapper>
                <LeftIcon className={`${isError ? 'color-error' : 'color-valid'}`}>
                    {icon}
                </LeftIcon>
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
                {inputType === 'password' ? (showPassword ?
                        <BsEyeFill
                            className={'eye-icon'}
                            onClick={() => setShowPassword(!showPassword)}/> :
                        <BsEyeSlashFill
                            className={'eye-icon'}
                            onClick={() => setShowPassword(!showPassword)}/>)
                    : null}
            </InputWrapper>
            {errorText && <ErrorText className="error">{errorText}</ErrorText>}
        </InputFieldWrapper>
    )
}

const InputFieldWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    gap: 8px;
  
    .eye-icon{
        position: absolute;
        right: 10px;
        cursor: pointer;
        color: #26261b;
      font-size: clamp(20px, 3vw, 26px);
    }
`;

const ErrorText = styled.p`
    color: red;
    font-weight: 100;
    font-size: clamp(14px, 3vw, 20px);
    line-height: 1.1;
    margin-top: 6px;
`;


const InputWrapper = styled.div`
    position: relative;
`

const Input = styled.input`
    height: 40px;
    width: 100%;
    padding: 0 47px;
    font-size: clamp(16px, 3vw, 22px);
    border: none;
    border-bottom: 1px solid #090000;
    outline: none;
    
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
    font-size: clamp(20px, 3vw, 26px);
    position: absolute;
    left: 10px;
    top: 4px;
    
    &.color-valid {
      color: #848874;
    }
    
    &.color-error {
      color: red;
    }
`;

const Label = styled.label`
    font-size: clamp(16px, 3vw, 22px);
    font-weight: 400;
    letter-spacing: .5px;
  
    &.color-valid {
      color: #848874;
    }
    
    &.color-error {
      color: red;
    }
`;


export default InputField
