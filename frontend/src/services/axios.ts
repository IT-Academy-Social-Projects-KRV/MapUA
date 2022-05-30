import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Accept-Language': localStorage.getItem('i18nextLng') || ''
  }
});

export default axios;
