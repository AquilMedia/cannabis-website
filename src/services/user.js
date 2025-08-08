import { callApi, callApiWithAuth } from "./api";



export const registerUser = async (userData) => {
  return await callApi('/user/register', 'POST', userData);
};

export const loginUser = async (credentials) => {
  return await callApi('/user/login', 'POST', credentials);
};

export const getHomepageData = async (token) => {
  return await callApiWithAuth('/user/homepage', token, 'GET');
};