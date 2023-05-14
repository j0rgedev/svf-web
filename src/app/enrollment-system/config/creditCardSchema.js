import * as yup from 'yup'
import {cardCvvRegex, cardHolderRegex, cardNumberRegex} from './regexFields.js'

export const creditCardSchema = yup.object().shape({
    card_holder: yup
        .string()
        .matches(cardHolderRegex, {message: 'Dígite un nombre válido'})
        .required('Requerido'),
    card_number: yup
        .string()
        .matches(cardNumberRegex, {message: 'La tarjeta debe tener 16 dígitos'})
        .required('Requerido'),
    card_exp: yup
        .string()
        .required('Requerido'),
    card_cvv: yup
        .string()
        .matches(cardCvvRegex, {message: 'El CVV debe tener 3 dígitos'})
        .required('Requerido')
})