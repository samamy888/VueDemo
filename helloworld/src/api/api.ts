import axios from 'axios';

const request = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
})

export const getAllData = () => request.post('api/CRUD/GetAll');