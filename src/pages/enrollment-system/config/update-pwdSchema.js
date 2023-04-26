import * as yup from "yup";
import { studentCodeRegex,passwordRegex} from './regexFields.js'

export const updatePwdSchema = yup.object().shape({
    code_input: yup
        .string()
        .matches(studentCodeRegex, {message: 'El código del estudiante es inválido'})
        .required('El código del estudiante es requerido'),
    password_input: yup
    .string()
    .matches(passwordRegex, {message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial'})
    .required('La contraseña es requerida'),
    confirmpassword: yup
    .string()
    .oneOf([yup.ref('password_input'), null], 'Las contraseñas deben ser iguales')
    .required('La confirmación de la contraseña es obligatoria'),
});