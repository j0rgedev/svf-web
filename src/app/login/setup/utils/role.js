export const isUserAdmin = (code) => {
	const ADMIN = 'ADM';
	const letters = code.slice(0, 3);
	return letters === ADMIN;
}