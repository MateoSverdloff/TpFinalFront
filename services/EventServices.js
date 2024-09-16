import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const api = axios.create({
    baseURL: 'https://wholly-intense-kiwi.ngrok-free.app/api/event/',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getAllEvent = async => {
    try{
        const response = api.get()
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};