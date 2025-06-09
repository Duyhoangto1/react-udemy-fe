import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in',
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    'x-api-key': 'reqres-free-v1', // Add the required API key
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    console.log('Request made with ', config);
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Request error: ', error);
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('Response received: ', response);
    return response.data;
  }, function (error) {
        return Promise.reject(error);
  });

export default axiosInstance;