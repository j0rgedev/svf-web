import { useState } from 'react';
import { useFormik } from "formik";
import { creditCardSchema } from "../../config/creditCardSchema.js";
import InputField from '../inputField/InputField.jsx';

export default function BotonWithDiv({ text, id }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
        setIsChecked(!isChecked);
    };

    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = async (values, actions) => {
        console.log(values)
        console.log(actions)
    }

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit
    } = useFormik({
        initialValues: {
            code_input: '',
            password_input: '',
            confirmpassword: '',
        },
        validationSchema: creditCardSchema,
        onSubmit
    })

    return (
        <div>
            <button onClick={handleClick} id={id} >
                <input type="checkbox" checked={isChecked} onChange={() => { }} />&nbsp;
                {text}</button>

            <form className={`content ${isOpen ? 'open' : ''}`}
                style={{ height: isOpen ? '350px' : '0px' }} onSubmit={handleSubmit}>

                <InputField
                    labelText={'Numero de Tarjeta'}
                    inputType={'text'}
                    id={'card_input'}
                    className={errors.card_input && touched.card_input ? 'card_input input-error' : ''}
                    icon={''}
                    textValue={values.card_input}
                    blurFunction={handleBlur}
                    changeFunction={handleChange}
                    isValid={!errors.card_input && touched.card_input}
                    errorText={errors.card_input}
                />
                <InputField
                    labelText={'Fecha de expiracion'}
                    inputType={'date'}
                    id={'date_input'}
                />
                <InputField
                    labelText={'CVV'}
                    inputType={'text'}
                    id={'cvc_input'}
                    className={errors.cvc_input && touched.cvc_input ? 'cvc_input input-error' : ''}
                    icon={''}
                    textValue={values.cvc_input}
                    blurFunction={handleBlur}
                    changeFunction={handleChange}
                    isValid={!errors.cvc_input && touched.cvc_input}
                    errorText={errors.cvc_input}
                />
            </form>
        </div>
    );
}

