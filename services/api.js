import axios from 'axios';

const api = axios.create({
  baseURL: 'https://971a-200-73-176-50.ngrok-free.app/api/user/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getById = async (id) => {
  try {
    const response = await api.get(`/${id}`);  
    if (response.status === 200) { 
      console.log(response.data);
    }
  } catch (error) {
    console.log('Error en el código: ', error);
    throw error;
  }
};
