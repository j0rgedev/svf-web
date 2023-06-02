import axios from 'axios';

const baseURL = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
});

export const useLogin = async ({code_input, password_input}) => {
    const res = await baseURL.post('/login',
        {
            'studentCod': code_input,
            'password': password_input
        });
    return res.data;
}