import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_AES_ENCRYPTION_KEY;

export const setCookie = (key, token) => {
    const ciphertext = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    Cookies.set(key, ciphertext, { expires: 1, secure: true, sameSite: 'strict'});
};

export const getCookie = (key) => {
    const encryptedToken = Cookies.get(key);
    if (encryptedToken) {
        return CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }
    return null;
};

export const removeCookie = (key) => {
    Cookies.remove(key);
}

export const isCookieExpired = (token) => {
    const expirationDate = new Date(token.expires).getTime();
    const now = new Date().getTime();
    return now > expirationDate;
}