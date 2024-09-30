// EventServices.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wholly-intense-kiwi.ngrok-free.app/api/event/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEvents = async () => {
  try {
    const response = await api.get('/');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getEventById = async (id) => {
    try {
      const response = await api.get(`/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  };
