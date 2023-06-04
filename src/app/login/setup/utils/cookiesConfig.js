import Cookies from 'js-cookie';

export const setCookie = (key, token, role) => {
    const cookieValue = `${token}|${role}`;
    Cookies.set(key, cookieValue, { expires: 1, secure: true, sameSite: 'strict'});
};

export const getCookie = (key) => {
    const cookieValue = Cookies.get(key);
    const parts = cookieValue?.split('|') || [];
    const token = parts[0];
    const role = parts[1];
    return { token, role };
};

export const removeCookie = (key) => {
    Cookies.remove(key);
}

export const isCookieExpired = (token) => {
    const expirationDate = new Date(token.expires).getTime();
    const now = new Date().getTime();
    return now > expirationDate;
}