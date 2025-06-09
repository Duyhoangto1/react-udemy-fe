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

export { fetchAllUsers };