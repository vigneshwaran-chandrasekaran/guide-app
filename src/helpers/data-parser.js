export function getUserInfo() {
	return localStorage.getItem(process.env.REACT_APP_AUTH_KEY);
}

export function getUserData() {
	const USER_DATA = getUserInfo();

	if (USER_DATA) {
		return JSON.parse(USER_DATA);
	}

	return {};
}
