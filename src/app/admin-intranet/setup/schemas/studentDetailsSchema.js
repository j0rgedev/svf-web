import * as yup from 'yup'

const dniRegex = /^[0-9]{8}$/
const phoneRegex = /^[0-9]{9}$/

export const studentDetailsSchema = yup.object().shape({
	dni: yup.string().matches(dniRegex, 'DNI no es válido').required('Campo requerido'),
	phone : yup.string().matches(phoneRegex, 'Teléfono no es válido').required('Campo requerido'),
	email: yup.string().email('Email no es válido').required('Campo requerido'),
	birthday: yup.date().required('Campo requerido'),
	level: yup.string().required('Campo requerido'),
	grade: yup.string().required('Campo requerido'),
	address: yup.string().required('Campo requerido'),
})