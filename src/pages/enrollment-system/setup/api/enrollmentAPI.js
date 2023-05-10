import axios from 'axios';
import { BASE_URL } from "./endpoints.js";


const enrollmentAPI = axios.create({
  baseURL: BASE_URL,
});

export const useEnrollment = async (token) => {

  const response = await enrollmentAPI.post('/', {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
  
  
  
  
  
  