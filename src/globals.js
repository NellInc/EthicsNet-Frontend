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

    console.log('the request was intercepted')

    return config;
  },
  error => Promise.reject(error)
);

// Handling errors
base.interceptors.response.use(
  response => {
    console.log('the response was intercepted', response)
    // response.message = 'There was an error processing your request ...'
    if (response.status === 200) {
      response.message = response.data.message
    }
    return response;
  },
  error => {
    if (error.response.data.error) {
      error.message = error.response.data.error;
    } else {
      error.message = 'There was an error processing your request'
    }
    return Promise.reject(error)
  }
);

export default base;