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

export const payPensions = async ({token, body}) => {
	const response = await baseUrl.post('/pensions/pay', body,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			}
		});
	return response.data;
}

export const getReceipt = async ({token, receiptCode}) => {
	console.log(receiptCode)
	const response = await baseUrl.post(`/receipt?reciboCod=${receiptCode}&tipo=PDF`, {}, {
		headers: {
			"Authorization": `Bearer ${token}`,
		},
		responseType: 'arraybuffer'
	})
	return {
		data: response.data,
		headers: response.headers
	}
}

