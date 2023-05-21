import * as yup from 'yup'

const dniRegex = /^[0-9]{8}$/
const phoneRegex = /^[0-9]{9}$/

export const studentSchema = yup.object().shape({
	names: yup.string().required('El nombre es requerido'),
	lastnames: yup.string().required('El apellido es requerido'),
	dni: yup.string().matches(dniRegex, 'El DNI no es válido').required('El DNI es requerido'),
	birthdate: yup.string().required('La fecha de nacimiento es requerida'),
	direction: yup.string().required('La dirección es requerida'),
	email: yup.string().email('El correo no es válido').required('El correo es requerido'),
	phone: yup.string().matches(phoneRegex, 'El teléfono no es válido').required('El teléfono es requerido'),
	level: yup.string().required('El nivel es requerido'),
	grade: yup.string().required('El grado es requerido')
})