import axios from 'axios';

const baseURL = axios.create({
    baseURL: 'http://localhost:8080/api/v1/enrollment',
});

export const useSMS = async ({code_sms, temp_token}) => {
    const response = await baseURL.post(
        `/smsvalidation`,
        {
            "sms": code_sms
        },
        {
            headers: {
                Authorization: `Bearer ${temp_token}`,
            }
        }
    );
    return response.data;
};
