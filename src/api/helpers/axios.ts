import axios from 'axios';
import envs from '../../config/environment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import md5 from 'md5';
const ts = new Date().getTime().toString();
const publicKey = envs.public_key;
const privateKey = envs.private_key;
const hash = md5(ts + privateKey + publicKey);

const instance = axios.create({
  baseURL: envs.baseApiUrl,
  params: {
    ts: ts,
    apikey: publicKey,
    hash: hash,
  },
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    toast.error('Произошла ошибка при отправке запроса');
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const errorMessage = error?.response?.data?.message || 'Произошла ошибка при загрузке данных';
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);

export default instance;
