import axios from 'axios';
import { registerIntercepters } from './intercepters';
import {API_URL} from '@/utils/constants/url';

const restApi = axios.create({
  baseURL: API_URL,
  headers: {

  },
});

registerIntercepters(restApi);

export default restApi;