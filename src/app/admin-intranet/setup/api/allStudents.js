import axios from 'axios';

const baseUrl = axios.create({
	baseURL: 'http://localhost:8080/api/v1/admin',
})

export const allStudents = async ({token}) => {
	const response = await baseUrl.post('/students', {}, {
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	})
	return response.data;
}