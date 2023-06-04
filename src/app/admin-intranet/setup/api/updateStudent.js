import axios from 'axios';

const baseUrl = axios.create({
	baseURL: 'http://localhost:8080/api/v1/admin',
})

export const updateStudent = async ({token, studentCode, body}) => {
	const response = await baseUrl.put(`/student/update/${studentCode}`, body, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": "application/json"
		}
	})
	return response.data;
}