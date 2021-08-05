import axios from 'axios';

import { ENV } from '../../constants';

export const api = axios.create({
  baseURL: ENV.REACT_APP_DUMMYAPI_URL,
  headers: {
    'app-id': ENV.REACT_APP_DUMMYAPI_KEY,
  },
});
