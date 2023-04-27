import axios from 'axios';
import { BASE_URL } from "./endpoints.js";

const loginAPI = axios.create({
    baseURL: BASE_URL,
});

export const useLogin = async ({code_input, password_input}) => {
    const res = await loginAPI.post('/login',
        {
            'studentCod': code_input,
            'password': password_input
        });
    return res.data;
}