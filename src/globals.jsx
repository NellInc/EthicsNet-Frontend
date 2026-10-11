import axios from 'axios';

const connectionError = () => new Error('There was an error connecting to the server');

function apiOrigin() {
  if (import.meta.env.DEV) return 'http://localhost';
  const configured = import.meta.env.VITE_API_URL;
  try {
    if (typeof configured !== 'string' ||
        !/^https:\/\/[^/?#\\\s]+\/?$/.test(configured)) throw connectionError();
    const url = new URL(configured);
    if (url.protocol !== 'https:' || url.username || url.password ||
        url.search || url.hash || url.pathname !== '/') throw connectionError();
    return url.origin;
  } catch {
    throw connectionError();
  }
}

function apiTarget(path) {
  const origin = apiOrigin();
  if (typeof path !== 'string' || !path.startsWith('/') ||
      path.startsWith('//') || path.includes('\\')) throw connectionError();
  const url = new URL(path, origin);
  if (url.origin !== origin) throw connectionError();
  return url.href;
}

export async function apiFetch(path, options) {
  return fetch(apiTarget(path), options);
}

const base = axios.create({ timeout: 10000 });

// Setting defaults
base.interceptors.request.use(
  config => {
    config.url = apiTarget(config.url);
    delete config.baseURL;
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
    // response.message = 'There was an error processing your request ...'
    if (response.status === 200) {
      response.message = response.data.message;
    }
    return response;
  },
  error => {
    if (!error.response) {
      error.message = 'There was an error connecting to the server';
    } else if (error.response.data.error) {
      error.message = error.response.data.error;
    } else {
      error.message = 'There was an error processing your request';
    }
    return Promise.reject(error);
  }
);

export default base;
