import { message as toaster } from 'antd';
import { isEmpty } from 'lodash';
import qs from 'qs';
import store from 'store';
import { hideLoader, showLoader } from 'store/appSlice';
import axios from './api.config';
// import { handle401Error } from './authentication';

class ApiRequestClass {
	// constructor() {
	// 	console.log('instance', ApiRequestClass.instance, this);
	// }
	/**
	 *
	 * @param {string} url
	 * @param {object} data
	 * @param {boolean} showLoader
	 * @param {string} method - must be a lowercase, it's axios get, post, delete, patch methods
	 * @param {object} queryParams
	 */
	async common({
		url,
		data = {},
		showLoading = true,
		method = 'get',
		queryParams = {},
		setErrors = undefined,
	}) {
		if (showLoading) {
			this.handleShowLoader();
		}

		try {
			let URL = this.addQueryParamsWithUrl(url, queryParams);
			const response = await axios[method](URL, data);
			return Promise.resolve(response.data);
		} catch (error) {
			this.handleErrors(error, setErrors);
			return Promise.reject(error);
		} finally {
			this.handleHideLoader();
		}
	}

	addQueryParamsWithUrl(url, queryParams) {
		Object.keys(queryParams).forEach(
			(key) => queryParams[key] === null && delete queryParams[key]
		);
		return url + qs.stringify(queryParams, { addQueryPrefix: true });
	}

	handleErrors(error, setErrors) {
		if (error) {
			try {
				// console.log('error handled', error);
				const data = error.response.data;
				// console.log('error data', data);
				const status = error.response.status;
				// console.log('error status', status);
				let checkNetworkError = JSON.stringify(error);
				const NetworkError = 'Network Error';

				if (checkNetworkError.includes(NetworkError)) {
					toaster.error(NetworkError);
					return false;
				}
				if (status === 500) {
					toaster.error(error.message);
				} else if (status === 401) {
					/**
					 * 401 is authentication error like session failure
					 */
					// handle401Error();
				} else if (status === 422) {
					/**
					 * 422 error is form validation error
					 */
					this.handle422Error(data, setErrors);
				} else {
					this.handleCommonErrors(data);
				}
			} catch (e) {
				if (error.toString().includes('timeout')) {
					toaster.error('API Timeout');
				} else {
					toaster.error('Something went wrong please try again');
					console.log('Unhandled error', e);
				}
			}
		}
	}

	handleCommonErrors(data) {
		const errors = data.errors;
		toaster.error(errors);
	}

	handleShowLoader() {
		store.dispatch(showLoader());
	}

	handleHideLoader() {
		store.dispatch(hideLoader());
	}

	handle422Error(data, setErrors) {
		let serverErrors = data.errors;
		if (!isEmpty(serverErrors)) {
			if (setErrors) {
				setErrors(serverErrors);
				let val = serverErrors[Object.keys(serverErrors)[0]];
				console.log('handle422Error val', val);
				return val;
			}
		}
	}
}

export const API = new ApiRequestClass();
