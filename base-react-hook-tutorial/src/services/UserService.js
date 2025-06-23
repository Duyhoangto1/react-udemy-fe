import axios from 'axios';

const API_URL = 'https://your-api-url.com/api/users'; // Replace with your actual API URL

export const fetchAllUsers = async (page) => {
  const response = await axios.get(`${API_URL}?page=${page}`);
  return response.data;
};

export const addUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const editUser = async (userId, user) => {
  const response = await axios.put(`${API_URL}/${userId}`, user);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/${userId}`);
  return response.data;
};