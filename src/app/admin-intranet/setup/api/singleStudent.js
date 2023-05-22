import axios from 'axios';

const baseUrl = axios.create({
	baseURL: 'http://localhost:8080/api/v1/admin',
})

export const singleStudent = async ({token, studentCode}) => {
	const response = await baseUrl.post(`/student?studentCod=${studentCode}`, {}, {
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	})
	return response.data;
}