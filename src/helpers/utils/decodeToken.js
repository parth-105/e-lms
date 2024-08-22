// utils/decodeToken.js
import {jwtDecode} from 'jwt-decode';
import { parseCookies } from 'nookies';
import { getCookie } from 'cookies-next';

export const decodeToken = () => {
  try {
    const token = getCookie('e-learninigtoken');
    if (!token) {
      console.error('No token found in cookies');
      return null;
    }
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
