import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const getProducts = () => {
  return axios.get(`${API_BASE_URL}/products`);
};

export { getProducts };