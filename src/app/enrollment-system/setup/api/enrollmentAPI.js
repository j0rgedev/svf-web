import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'http://localhost:8080/api/v1/enrollment',
});

export const useEnrollment = async (token) => {

  const response = await baseURL.post('/', {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
  
  
  
  
  
  