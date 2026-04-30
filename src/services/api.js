import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/apartments',
});

export const getApartments = async () => {
  const response = await api.get('/');
  return response.data;
};

export const createApartment = async (apartmentData) => {
  const response = await api.post('/', apartmentData);
  return response.data;
};

export const updateApartment = async (id, apartmentData) => {
  const response = await api.put(`/${id}`, apartmentData);
  return response.data;
};

export const deleteApartment = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export const scrapeUrl = async (url) => {
  const response = await api.post('/scrape', { url });
  return response.data;
};

export default api;
