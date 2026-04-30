import axios from 'axios';

const api = axios.create({
  // Utilise l'URL définie en variable d'environnement, sinon tombe sur localhost en dev
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

export default api;
