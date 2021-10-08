import { LoginModel } from "./../model/model";
import axios, { AxiosRequestConfig } from "axios";
import { DataModel } from "../model/model";
import router from "@/router";

const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const jwtToken = localStorage.getItem("token");

request.interceptors.request.use(
  function(config: AxiosRequestConfig) {
    config.headers.Authorization = "Bearer " + jwtToken;
    return config;
  },
  function(error) {
    // Do something with request error
    //console.log(error);
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response?.status === 401) {
      router.push("/SignIn");
    }
    return Promise.reject(error);
  }
);
export const getAllData = () => request.get("api/CRUD/GetAll");
export const addData = (param: DataModel) =>
  request.post("api/CRUD/Add", param);
export const deleteData = (ID: number) =>
  request.delete("api/CRUD/Delete", { data: ID });
export const updateData = (param: DataModel) =>
  request.put("api/CRUD/Update", param);

export const signIn = (login: LoginModel) =>
  request.post("api/Auth/SignIn", login);
