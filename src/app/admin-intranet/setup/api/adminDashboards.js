import axios from 'axios';

const baseUrl = axios.create({
	baseURL: 'http://localhost:8080/api/v1/admin',
})

export const mainDashboard = async (token, monthNumber) => {
	const response = await baseUrl.post(`/general-dashboard?monthNumber=${monthNumber}`, {}, {
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	})
	return response.data;
}

export const secondDashboard = async (token) => {
	const response = await baseUrl.post('/enrollment-dashboard', {}, {
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	})
	return response.data;
}

export const pensionDashboard = async (token) => {
	const response = await baseUrl.post('/pension-dashboard', {}, {
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	})
	return response.data;
}

export const debtByMonth = async (token, monthNumber) => {
	const response = await baseUrl.post(`/total-debt/${monthNumber}`, {}, {
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	})
	return response.data;
}


export const generateMainReport = async (token) => {
	const response = await baseUrl.post(`/main-report?fechaInicio=2023-03-01&fechaFin=2023-12-30&tipo=PDF`, {}, {
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

export const generatePensionsReport = async (token) => {
	const response = await baseUrl.post(`/pension-report/pdf`, {}, {
		headers: {
			"Authorization": `Bearer ${token}`,
		}
	})
	return response.data;
}

export const generateExcelReport = async (token) => {
	const response = await baseUrl.post(`/pensions-report`, {}, {
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