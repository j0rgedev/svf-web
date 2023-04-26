import * as yup from 'yup'
import { cardRegex, cvcRegex } from './regexFields.js'

export const creditCardSchema = yup.object().shape({
    card_input: yup
        .string()
        .matches(cardRegex, {message: 'La tarjeta debe tener máximo 16 dígitos'})
        .required('La tarjeta es requerida'),
    cvc_input: yup
        .string()
        .matches(cvcRegex, {message: 'El CVV debe tener máximo 3 dígitos'})
        .required('El CVV es requerido')
})