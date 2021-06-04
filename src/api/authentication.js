import { getUserData } from '../helpers/data-parser';

export function handle401Error() {
	/**
	 * get user data from local storage
	 */
	try {
		let userData = getUserData();
		const { refresh_token = null } = userData;
		const url = `${process.env.REACT_APP_API_URL}/users/refresh`;
		let status;
		fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${refresh_token}`,
			},
		})
			.then((response) => {
				status = response.status;
				return response.json();
			})
			.then((response) => {
				if (status === 200) {
					updateTokens(userData, response);
				} else {
					redirectToLogin();
				}
			})
			.catch((error) => {
				redirectToLogin();
				console.log('generate-token error', error);
			});
	} catch (error) {
		redirectToLogin();
		console.log('generate-token error 2', error);
	}
}

export function redirectToLogin() {
	/**
	 * Refresh token session time also expired, so clear the local storage
	 * then redirect the user to login page
	 */

	localStorage.clear();
	window.location = window.origin + '/login';
}

function updateTokens(UserData, response) {
	console.log('UserData', UserData);
	console.log('response', response);
	UserData = response?.data;
	setLocalData(UserData);
}

export function setLocalData(UserData) {
	localStorage.setItem(
		process.env.REACT_APP_AUTH_KEY,
		JSON.stringify(UserData)
	);
	console.log('setLocalData came', UserData);
	if (UserData?.status !== 0) {
		/**
		 * If user status is 0 means don't refresh the page
		 */
		window.location.reload();
	}
}
