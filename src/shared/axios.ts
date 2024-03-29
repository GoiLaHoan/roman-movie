import { PROXY } from './constants';
import axios from 'axios';

const instance = axios.create({
  baseURL: `${PROXY}https://ga-mobile-api.loklok.tv/cms/app`,
  headers: {
    lang: 'en',
    versioncode: '11',
    clienttype: 'ios_jike_default',
  },
});

instance.interceptors.request.use((config) => {
  const lang = localStorage.getItem('lang');
  const items = lang && JSON.parse(lang);
  if (items) {
    const header = config.headers;
    if (header) header.lang = items;
  }
  return config;
});
export default instance;
