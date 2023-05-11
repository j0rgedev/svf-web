import * as yup from 'yup'
import { smsCodeRegex } from './regexFields.js'

export const smsvalidationSchema = yup.object().shape({
    code_sms: yup
        .string()
        .matches(smsCodeRegex, {message: 'El código es inválido'})
        .required('El código es requerido'),
})