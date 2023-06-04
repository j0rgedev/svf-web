import * as yup from 'yup'
import { userCodeRegex } from './regexFields.js'

export const loginSchema = yup.object().shape({
    code_input: yup
        .string()
        .matches(userCodeRegex, {message: 'El código es inválido'})
        .required('El código es requerido'),
    password_input: yup
        .string()
        .required('La contraseña es requerida')
})