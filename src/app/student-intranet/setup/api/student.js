import axios from 'axios';

const baseUrl = axios.create({
	baseURL: 'http://localhost:8080/api/v1/student',
});

export const getStudent = async (token) => {
	const response = await baseUrl.post('/', {}, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	});
	return response.data;
}


export const getPensions = async (token, index) => {
	const response = await baseUrl.post(`/pensions/${index}`, {}, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	});
	return response.data;
}

