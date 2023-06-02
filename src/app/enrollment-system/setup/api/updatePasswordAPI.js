import axios from 'axios';

const baseURL = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
});

export const useUpdatePwd = async ({password_input, tempCookie}) => {
    const response = await baseURL.put(
        `/updatepassword`,
        {
            "password": password_input
        },
        {
            headers: {
                Authorization: `Bearer ${tempCookie}`,
            }
        }
    );
    return response.data;
};