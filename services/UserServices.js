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
      alert(`nombre: ${response.data.first_name} ${response.data.last_name}`);
    }
  } catch (error) {
    console.log('Error en el código: ', error);
    throw error;
  }
};

export const Login = async (nombre, apellido) => {
    axios.post('/login', {
        firstName: `${nombre}`,
        lastName: `${apellido}`,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}


// IMPORTANTE PARA EL PUT

// https://axios-http.com/docs/post_example

// axios.post('/user', {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });

