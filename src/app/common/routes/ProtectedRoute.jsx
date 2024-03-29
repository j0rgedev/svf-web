import {Navigate} from "react-router-dom";
import {getCookie, isCookieExpired} from '../../login/setup/utils/cookiesConfig.js'

export const AdminProtectedRoute = ({element, redirectTo = '/login'}) => {
	const cookies = getCookie('SESSION').token;
	const userRole = getCookie('SESSION').role;

	if (!cookies) {
		return <Navigate to={redirectTo}/>
	}

	return (
		<>
			{!isCookieExpired(cookies) && userRole === 1 ? (
				<Navigate to={redirectTo}/>
			) : (
				element
			)}
		</>
	)
}

export const StudentProtectedRoute = ({element, redirectTo = '/login'}) => {
	const cookies = getCookie('SESSION').token;
	const userRole = getCookie('SESSION').role;

	if (!cookies) {
		return <Navigate to={redirectTo}/>
	}

	return (
		<>
			{!isCookieExpired(cookies) && userRole === 0 ? (
				<Navigate to={redirectTo}/>
			) : (
				element
			)}
		</>
	)
}

export const LoginProtectedRoute = ({element}) => {
	const cookies = getCookie('SESSION').token;
	const userRole = getCookie('SESSION').role;
	const tempToken = new URLSearchParams(window.location.search).get('tempToken')

	if (!cookies || isCookieExpired(cookies)) {
		return element
	}

	console.log('hola')

	console.log(tempToken)

	if (tempToken) {
		return <Navigate to={`validacion?tempToken=${tempToken}`}/>
	}

	return userRole===0 ? ( <Navigate to="/admin"/> ) : ( <Navigate to="/estudiante"/> )
}