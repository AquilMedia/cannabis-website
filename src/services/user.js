import { callApi, callApiWithAuth, callPostApi, callPostFormData } from "./api";
export const registerUser = async (userData) => {
  return await callApi('/api/user/register', 'POST', userData);
};
export const loginUser = async (credentials) => {
  return await callApi('/api/user/login', 'POST', credentials);
};
export const getHomepageData = async () => {
  return await callApiWithAuth('/api/public/homepage', 'GET');
};
export const getBlogspageData = async () => {
  return await callApiWithAuth('/api/public/blogs', 'GET');
};
export const getBlogDetails = async (id) => {
  return await callApiWithAuth(`/api/public/blogs/${id}`, 'GET');
};
export const getAboutUspageData = async () => {
  return await callApiWithAuth('/api/public/aboutus', 'GET');
};
export const getProductsData = async (query) => {
  return await callApiWithAuth(`/api/public/products?${query}`, 'GET');
};
export const filtersData = async () => {
  return await callApiWithAuth('/api/public/filters', 'GET');
};
export const getPharmsistList = async (query, token) => {
  return await callApiWithAuth(`/api/user/getPharmacists/${query}`, token, 'GET');
};
export const cartItemDelete = async (id, token) => {
  return await callApiWithAuth(`/api/user/deleteItem/${id}`, token, 'GET');
};
export const getCartList = async (token) => {
  return await callApiWithAuth(`/api/user/cartItems`, token, 'GET');
};
export const getClearCart = async (token) => {
  return await callApiWithAuth(`/api/user/clearCart`, token, 'GET');
};
export const AddCart = async (data, token) => {
  return await callPostApi(`/api/user/addToCart`, token, 'POST', data);
};
export const cartUpdateQuantity = async (data, token) => {
  return await callPostApi(`/api/user/updateCartQuantity`, token, 'POST', data);
};
export const CreateCartOrder = async (data, token) => {
  return await callPostApi(`/api/user/createOrder`, token, 'POST', data);
};
export const getProductsDetails = async (id) => {
  return await callApiWithAuth(`/api/public/productDetails/${id}`, 'GET');
};
 export const uploadPrescription = async (data, token) => {
  return await callPostFormData(`/api/user/uploadPrescriptionData`, token, 'POST', data);
};
 export const uploadPrescriptionDr = async (data, token) => {
  return await callPostFormData(`/api/user/createPrescription`, token, 'POST', data);
};
 export const medicalQuestionnaire = async (data, token) => {
  return await callPostApi(`/api/public/medicalQuestionnaire`, token, 'POST', data);
};
 export const getPatientinfo = async ( token) => {
  return await callApiWithAuth(`/api/user/getPatientInfo`, token, 'GET');
};
 export const getOrderDetails = async ( token) => {
  return await callApiWithAuth(`/api/user/recentOrders`, token, 'GET');
};
 export const getMedicalQuestions = async ( token) => {
  return await callApiWithAuth(`/api/user/medicalQuestions`, token, 'GET');
};
export const updatePatientinfo = async (data, token) => {
  return await callPostApi(`/api/user/userUpdate`, token, 'POST', data);
};
export const updatepassword = async (data, token) => {
  return await callPostApi(`/api/user/resetPassword`, token, 'POST', data);
};