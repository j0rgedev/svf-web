import axios from 'axios';
import { useMutation } from 'react-query';
import { BASE_URL } from "./endpoints.js";

const loginAPI = axios.create({
    baseURL: BASE_URL,
});

export const useLogin = async ({code_input, password_input}) => {
    const res = await loginAPI.post('/students/login',
        {
            'studentCod': code_input,
            'password': password_input
        });
    return res.data;
}