import axios from 'axios';
import {DataModel} from '../model/model';

const request = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
})

export const getAllData = () => request.post('api/CRUD/GetAll');

export const addData = (param:DataModel) => request.post('api/CRUD/Add',param);

export const deleteData = (ID:number) => request.post('api/CRUD/Delete',ID);

export const updateData = (param:DataModel) => request.post('api/CRUD/Update',param);
