const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token) => {
  if (token.access_token) {
    localStorage.setItem(TOKEN_KEY, token.access_token);
  }
  if (token.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token.refresh_token);
  }
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getRefresToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};
