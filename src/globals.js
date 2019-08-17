export let apiURL;

if (process.env.NODE_ENV === 'production') {
  apiURL = 'http://localhost';
} else {
  apiURL = 'http://167.71.163.123';
}

export const extensionProfile = 'http://extension.lupuselit.me/';
