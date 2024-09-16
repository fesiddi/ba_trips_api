import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiClient = axios.create({
    baseURL: process.env.API_ENDPOINT,
    headers: {
        'x-api-key': process.env.API_KEY,
    },
});

const constructUrl = (origin, destination) => {
    const url = new URL(process.env.API_ENDPOINT);
    url.searchParams.append('origin', origin);
    url.searchParams.append('destination', destination);
    return url.toString();
};

export { apiClient, constructUrl };