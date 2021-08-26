import axios from 'axios';
import {DataModel} from '../model/model';

const request = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
})

export const getAllData = () => request.post('api/CRUD/GetAll');

export const addData = (param:DataModel) => request.post('api/CRUD/Add',param);

export const deleteData = (ID:string) => request.post('api/CRUD/Delete',ID);

export const updateData = (param:DataModel) => request.post('api/CRUD/Update',param);
