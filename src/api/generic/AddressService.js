import axios from "axios";
const API_URL = "http://localhost:8080/formule/address";

export default {
  getAll() {
    return axios.get(`${API_URL}/getall`).then(res => res.data);
  },
  create(address) {
    return axios.post(`${API_URL}/create`, address).then(res => res.data);
  },
  update(address) {
    return axios.put(`${API_URL}/update`, address).then(res => res.data);
  },
  delete(id) {
    return axios.delete(`${API_URL}/delete/${id}`).then(res => res.data);
  },
  getAddressesByCustomerId(customerId) {
    return axios.get(`${API_URL}/customer/${customerId}`).then(res => res.data);
  }
};
