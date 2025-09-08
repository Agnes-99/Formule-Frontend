import axios from 'axios';

const BASE_URL = 'http://localhost:8080/formule/address';

const addressAPI = {

  async create(address) {
    const response = await axios.post(`${BASE_URL}/create`, address);
    return response.data;
  },

  async update(address) {
    const response = await axios.put(`${BASE_URL}/update`, address);
    return response.data;
  },

  async delete(id) {
    await axios.delete(`${BASE_URL}/delete/${id}`);
  },

  async read(id) {
    const response = await axios.get(`${BASE_URL}/read/${id}`);
    return response.data;
  },

  async getAll() {
    const response = await axios.get(`${BASE_URL}/getall`);
    return response.data;
  },

  async findByCustomerId(customerId) {
    const response = await axios.get(`${BASE_URL}/customer/${customerId}`);
    return response.data;
  },
};
export default addressAPI;
