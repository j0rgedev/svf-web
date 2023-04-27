import {Navigate, Outlet} from "react-router-dom";
import {getCookie, isCookieExpired} from '../setup/utils/cookiesConfig.js'

export const ProtectedRoute = ({children, redirectTo = '/matricula/login'}) => {
    const cookies = getCookie('SESSION')
    if (!cookies || isCookieExpired(cookies)) {
        return <Navigate to={redirectTo} replace/>
    }
    return <Outlet/>
}