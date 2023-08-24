import axios from 'axios';
import API_KEY from '../constants/apiKey';

export const signAxios = axios.create({
    baseURL: API_KEY,
    headers: {
        'Content-Type': 'application/json',
    },
});
