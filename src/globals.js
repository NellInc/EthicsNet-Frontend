import axios from 'axios';

export let apiURL;
export const extensionProfile = 'http://extension.lupuselit.me/';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  apiURL = 'http://localhost';
} else {
  // production code
  apiURL = 'http://167.71.163.123';
}

const base = axios.create({
  baseURL: apiURL,
  timeout: 10000,
});

// setting defaults
base.interceptors.request.use(
  config => {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.token}`,
    };

    return config;
  },
  error => Promise.reject(error)
);

// Handling errors
base.interceptors.response.use(
  response => {
    if (response.status === 400) {
      // your failure logic here
      console.log('ops login failed');
    }

    return response;
  },
  error => Promise.reject(error)
);

export default base;