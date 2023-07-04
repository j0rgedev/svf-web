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
		console.log('no hay cookies')
		return <Navigate to={redirectTo}/>
	}

	console.log(!isCookieExpired(cookies) && userRole === 0)

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

	if (!cookies || isCookieExpired(cookies)) {
		return element
	}

	console.log(!isCookieExpired(cookies) && userRole === 0)

	return (
		<>
			{!isCookieExpired(cookies) && userRole === 0 ? (
				<Navigate to={'/estudiante'}/>
			) : (
				<Navigate to={'/admin'}/>
			)}
		</>
	)
}