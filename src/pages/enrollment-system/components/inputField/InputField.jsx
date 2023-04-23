import {useState} from 'react'
import './inputFieldStyles.css'
import {BsEyeSlashFill} from 'react-icons/bs'
import {BsEyeFill} from "react-icons/bs";

function InputField({
        inputType,
        labelText,
        className,
        id,
        icon,
        changeFunction,
        textValue,
        blurFunction,
        isValid,
        errorText
    }) {

    const [showPassword, setShowPassword]= useState(false)
    const inputClass = isValid ? '' : 'input-error'
    const isError = errorText && errorText.length > 0

    console.log(isValid)
    return(
        <div className="input-field">
            <i
                className={`left-icon ${isError ? 'color-error' : 'color-valid'}`}
            >
                {icon}
            </i>
            <label
                htmlFor={id}
                className={`input-label ${isError ? 'color-error' : 'color-valid'}`}
            >{labelText}</label>
            <input
                type={showPassword ? 'text' : inputType}
                name={id}
                id={id}
                aria-label={id}
                className={`${className} ${isError ? 'input-error' : 'color-valid'}`}
                onChange={changeFunction}
                value={textValue}
                onBlur={blurFunction}
            />
            {errorText && <p className="error">{errorText}</p>}
            {inputType === 'password' ? ( showPassword ?
                <BsEyeFill
                    className={'eye-icon'}
                    onClick={()=>setShowPassword(!showPassword)}/> :
                <BsEyeSlashFill
                    className={'eye-icon'}
                    onClick={()=>setShowPassword(!showPassword)}/>)
            : null}
        </div>
    )
}

export default InputField
