import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const api = axios.create({
  baseURL: 'https://wholly-intense-kiwi.ngrok-free.app/api/user/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await api.post('https://wholly-intense-kiwi.ngrok-free.app/api/user/login', {
      username: username,
      password: password,
    });
    const token = response.token;
    const getUserFromToken = (token) => {
      try {
        console.log(token)
        const decodedToken = jwtDecode(token);
        return decodedToken;
      } catch (error) {
        /*console.error('Error decoding token:', error);*/
        return null;
      }
    };

    if (response.data.success) {
      const user = getUserFromToken(token);
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};