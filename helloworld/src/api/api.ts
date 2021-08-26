import axios from 'axios';

export const getAllData = () => axios.request({url:'GetAll',method:'post'});