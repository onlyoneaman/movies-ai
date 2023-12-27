import axios from 'axios';
import { config } from '../config';
import {
  ApiResponse,
  DeleteApiParams,
  GetApiParams,
  PostApiParams,
  PutApiParams,
} from '../types/apiParams';

export const baseURL =
  process.env.NODE_ENV === 'production' ||
  import.meta.env.VITE_PROD_MODE === 'true'
    ? config.backend.prodBaseURL
    : config.backend.devBaseURL;
const apiPath = config.backend.apiPath;

const errHandler = async (promise: Promise<ApiResponse>) => {
  try {
    const { data } = await promise;

    return data;
  } catch (err) {
    console.log('err', err);
    return { data: null, err: err };
  }
};

const api = {
  delete: ({ url, params = {} }: DeleteApiParams) => {
    return errHandler(
      axios.delete(url, {
        params,
      }),
    );
  },

  get: ({ url, params = {}, headers = {} }: GetApiParams) => {
    return errHandler(
      axios.get(url, {
        headers,
        params,
      }),
    );
  },

  init: async () => {
    axios.defaults.baseURL = baseURL + apiPath;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
  },

  post: ({ url, data = null, headers = {} }: PostApiParams) => {
    return errHandler(
      axios.post(url, data, {
        headers,
      }),
    );
  },

  put: ({ url, data = null }: PutApiParams) => {
    return errHandler(axios.put(url, data));
  },
};

export default api;
