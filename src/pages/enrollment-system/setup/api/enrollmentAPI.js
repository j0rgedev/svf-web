import axios from 'axios';
import { BASE_URL } from "./endpoints.js";

const loginAPI = axios.create({
    baseURL: BASE_URL,
});

