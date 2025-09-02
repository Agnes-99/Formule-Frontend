// src/services/CategoryService.js
import axios from "axios";

const API_URL = "http://localhost:8080/formule/category";

export default {
  
  getAllCategories() {
    return axios.get(`${API_URL}/getall`);
  },
  getCategoryById(id) {
    return axios.get(`${API_URL}/read/${id}`);
  },
  createCategory(category) {
    return axios.post(`${API_URL}/create`, category);
  },
  updateCategory(category) {
    return axios.put(`${API_URL}/update`, category);
  },
  deleteCategory(id) {
    return axios.delete(`${API_URL}/delete/${id}`);
  },
  searchByName(name) {
    return axios.get(`${API_URL}/search/name/${name}`);
  },
  searchByDescription(keyword) {
    return axios.get(`${API_URL}/search/description`, {
      params: { keyword },
    });
  },
};
