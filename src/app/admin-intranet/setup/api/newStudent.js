import axios from 'axios';

const baseUrl = axios.create({
	baseURL: 'http://localhost:8080/api/v1/admin/student',
})

export const newStudent = async ({token, info}) => {
	const response = await baseUrl.post('/add', info, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	})
	return response.data;
}