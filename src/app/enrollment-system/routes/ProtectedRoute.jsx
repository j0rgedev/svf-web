import {Navigate, Outlet} from "react-router-dom";
import {getCookie, isCookieExpired} from '../../login/setup/utils/cookiesConfig.js'

export const ProtectedRoute = ({ element, redirectTo = '/login'}) => {
    const cookies = getCookie('SESSION').token;
    if (!cookies|| isCookieExpired(cookies)) {
        return <Navigate to={redirectTo} replace={true}/>
    }

    return element;
}