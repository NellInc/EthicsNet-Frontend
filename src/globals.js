// export let apiURL = 'http://167.71.163.123';
// export let apiURL = 'http://localhost';

export let apiURL;

export const extensionProfile = 'http://extension.lupuselit.me/';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  apiURL = 'http://localhost';
} else {
  // production code
  apiURL = 'http://167.71.163.123';
}
