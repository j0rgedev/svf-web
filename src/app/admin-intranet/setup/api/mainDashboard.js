import axios from 'axios';

const baseUrl = axios.create({
	baseURL: 'http://localhost:8080/api/v1/admin',
})

export const mainDashboard = async (token) => {
	const response = await baseUrl.post('/dashboard', {}, {
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	})
	return response.data;
}

export const secondDashboard = async (token) => {
	const response = await baseUrl.post('/dashboard2', {}, {
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	})
	return response.data;
}