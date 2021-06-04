import axios from 'axios';
import { useAuth } from 'hooks';
import { isEmpty } from 'lodash';
import store from 'store';

let userInfo;

(() => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	if (urlParams.has(process.env.REACT_APP_AUTH_KEY)) {
		/**
		 * when first time login, clear old redux state and localStorage data
		 */
		store.dispatch({
			type: 'user/logout',
		});
		userInfo = urlParams.get(process.env.REACT_APP_AUTH_KEY);
		localStorage.setItem(process.env.REACT_APP_AUTH_KEY, userInfo);
	} else {
		userInfo = useAuth();
	}
})();

/**
 * set baseurl for all axios request
 */
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = false; // to allow cookie to api request
axios.defaults.timeout = 28000; // Max timeout

// Add a request interceptor
axios.interceptors.request.use(
	function (config) {
		// console.log('request interceptors', config.url);
		// Do something before request is sent
		if (isEmpty(userInfo)) {
			/**
			 * Sometime token will set on hard refresh,
			 * on email invite user we don't do hard refresh, on that to set api token
			 */
			userInfo = useAuth();
		}

		// config.headers = {
		// 	//'Content-Type': 'application/json',
		// };
		// //config.headers['Access-Control-Allow-Credentials'] = true;

		try {
			if (!isEmpty(userInfo)) {
				let token = userInfo?.accessToken;
				config.headers.Authorization = `Bearer ${token}`;
			}
		} catch (error) {
			console.log('catch', error);
		}

		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// console.log('response interceptors', response);
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export default axios;
