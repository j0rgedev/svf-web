import {useJwt} from "react-jwt";

export const isTokenValid = (tempToken) => {
    const { decodedToken, isExpired } = useJwt(tempToken);
    try{
        return !!(decodedToken && !isExpired);
    } catch (error) {
        return false;
    }
}