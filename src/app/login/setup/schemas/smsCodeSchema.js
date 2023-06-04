import * as yup from 'yup'
import { smsCodeRegex } from './regexFields.js'

export const smsCodeSchema = yup.object().shape({
    code_sms: yup
        .string()
        .matches(smsCodeRegex, 'El código debe tener 5 dígitos')
        .required('El código es requerido'),
})