import axios from 'axios';

const baseUrl = axios.create({
	baseURL: 'http://localhost:8080/api/v1/admin/student',
})

export const deleteStudent = async ({token, studentCod}) => {
	const response = await baseUrl.post(`/delete/${studentCod}`, {}, {
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	})
	return response.data;
}