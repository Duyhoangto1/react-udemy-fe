import axios from './axios';

const fetchAllUsers = async (page) => {
  try {
    const response = await axios.get(`/api/users?page=${page}`);
    return response;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};
const postCreateUser = async (name , job) => {
  try {
    const response = await axios.post('/api/users', name, job);
    return response;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}


export { fetchAllUsers , postCreateUser };