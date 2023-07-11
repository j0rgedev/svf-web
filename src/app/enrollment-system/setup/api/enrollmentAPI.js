import axios from 'axios';

const baseURL = axios.create({
    baseURL: 'http://localhost:8080/api/v1/enrollment',
});

export const useEnrollment = async ({token, body}) => {
    const response = await baseURL.post('/process', body,
        {
            headers: {
                Authorization: `Bearer ${token.token}`,
                "Content-Type": "application/json"
            }
        });
    return response.data;
};
  
  
  
  
  
  