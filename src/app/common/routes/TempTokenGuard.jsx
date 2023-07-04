import { Navigate } from "react-router-dom";

export const TempTokenGuard = ({element, redirectTo = '/login'}) => {
    const tempToken = new URLSearchParams(window.location.search).get('tempToken')
    if(!tempToken) {
        return <Navigate to={redirectTo}/>
    }
    return element
}