import * as yup from "yup";
import {passwordRegex} from './regexFields.js'

export const passwordSchema = yup.object().shape({
    password_input: yup
        .string()
        .matches(passwordRegex, {message: '8 caracteres, una mayúscula, una minúscula, un número y un caracter especial'})
        .required('La contraseña es requerida'),
    confirmation_password_input: yup
        .string()
        .oneOf([yup.ref('password_input'), null], 'Las contraseñas deben ser iguales')
        .required('La confirmación de la contraseña es obligatoria'),
});