import * as yup from "yup";
import {studentSchema} from "./studentSchema.js";

const dniRegex = /^[0-9]{8}$/
const phoneRegex = /^[0-9]{9}$/

export const representativeSchema = yup.object().shape({
	names: yup.string().required('El nombre es requerido'),
	lastnames: yup.string().required('El apellido es requerido'),
	dni: yup.string().matches(dniRegex, 'El DNI no es válido').required('El DNI es requerido'),
	birthdate: yup.string().required('La fecha de nacimiento es requerida'),
	direction: yup.string().required('La dirección es requerida'),
	email: yup.string().email('El correo no es válido').required('El correo es requerido'),
	phone: yup.string().matches(phoneRegex, 'El teléfono no es válido').required('El teléfono es requerido'),
	occupation: yup.string().required('La ocupación es requerida'),
	kinship: yup.string().required('El parentesco es requerido'),
})