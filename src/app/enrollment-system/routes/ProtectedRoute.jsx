import {Navigate, Outlet} from "react-router-dom";
import {getCookie, isCookieExpired} from '../setup/config/cookiesConfig.js'

export const ProtectedRoute = ({ element, redirectTo = '/matricula/login'}) => {
    const cookies = getCookie('SESSION')
    if (!cookies || isCookieExpired(cookies)) {
        return <Navigate to={redirectTo} replace={true}/>
    }

    return element;
}