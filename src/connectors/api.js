import axios from 'axios';
import Qs from 'qs';

import { SOLANA_SCOPE_API_URL } from 'config';

//for interceptors etc.

export const instance = axios.create({
  baseURL: SOLANA_SCOPE_API_URL,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
});

export const requestApi = async (method, url, data) => {
  const config = {
    method: method,
    url: url,
    params: {},
  };

  if (data) {
    switch (method) {
      case 'post':
      case 'put':
      case 'patch':
        config.data = data;
        break;
      default:
        config.params = { ...config.params, ...data };
        break;
    }
  }

  const { data: responseData } = await instance.request(config);
  return responseData;
};
