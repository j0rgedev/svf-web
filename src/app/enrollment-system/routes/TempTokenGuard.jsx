import {Navigate, Route} from "react-router-dom";
import {isTokenValid} from "../config/validateToken.js";
import {useEffect, useState} from "react";
import {useJwt} from "react-jwt";

export const TempTokenGuard = ({element, redirectTo}) => {
    const tempToken = new URLSearchParams(window.location.search).get('tempToken')
    if(!tempToken) {
        return <Navigate to={redirectTo} />
    }
    return element
}