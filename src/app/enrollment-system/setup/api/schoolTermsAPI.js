import axios from "axios";

const baseURL = axios.create({
    baseURL: 'http://localhost:8080/api/v1/enrollment',
});

export const useSchoolTerms = async () => {
    const response = await baseURL.get(`/details`, {});
    return response.data;
};