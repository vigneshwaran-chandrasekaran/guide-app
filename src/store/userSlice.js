import { createSlice } from '@reduxjs/toolkit';
import { message as toaster } from 'antd';
import { API } from 'api';
import jsSha512 from 'js-sha512';

const initialState = {
	userFormVisible: false,
	editableUser: {},
	me: {},
};

export const userSlice = createSlice({
	name: 'user', // name of the reducer
	initialState,
	reducers: {
		setUserFormVisible: (state) => {
			let data = state.userFormVisible;
			state.userFormVisible = !data;
		},
		setSelectedUser: (state, { payload }) => {
			console.log(payload);
			state.editableUser = payload;
		},
		setUser: (state, { payload }) => {
			state.me = payload;
		},
		logout: (state, { payload = {} }) => {
			state.me = payload;
		},
	},
});

export const {
	setUserFormVisible,
	setSelectedUser,
	setUser,
	logout,
} = userSlice.actions;

export const getUser = () => async (dispatch) => {
	const CREDENTIALS = {
		url: `/users/me`,
	};
	return API.common(CREDENTIALS).then((response) => {
		dispatch(setUser(response.data));
		return response;
	});
};

export const userLogin = (values, setErrors) => async () => {
	const { password, ...rest } = values;
	const newVal = {
		password: jsSha512(password),
		...rest,
	};

	const CREDENTIALS = {
		url: `/users/login`,
		method: 'post',
		data: newVal,
		setErrors,
	};

	return API.common(CREDENTIALS).then((response) => {
		setLocalData(response.data);
		return response;
	});
};

export const userSignup = (values, setErrors) => async () => {
	const { password, ...rest } = values;
	const newVal = {
		password: jsSha512(password),
		...rest,
	};

	const CREDENTIALS = {
		url: `/users`,
		method: 'post',
		data: newVal,
		setErrors,
	};

	return API.common(CREDENTIALS).then((response) => {
		setLocalData(response.data);
		return response;
	});
};

export const userLogout = () => async (dispatch) => {
	dispatch(logout());
};

export const updateUser = (
	values,
	setErrors,
	isNotProfileUpdate = false
) => async (dispatch) => {
	let url = isNotProfileUpdate ? `/users/${values?.id}` : 'users/me';

	const { password, ...rest } = values;
	let newVal;

	if (password) {
		newVal = {
			password: jsSha512(password),
			...rest,
		};
	} else {
		newVal = {
			...rest,
		};
	}

	const CREDENTIALS = {
		url,
		method: 'put',
		data: newVal,
		setErrors,
	};
	return API.common(CREDENTIALS).then((response) => {
		dispatch(setUser(response.data));
		let text = isNotProfileUpdate
			? `'User updated successfully`
			: 'Profile updated successfully';
		toaster.success(text);
		return response;
	});
};

export function setLocalData(UserData) {
	localStorage.setItem(
		process.env.REACT_APP_AUTH_KEY,
		JSON.stringify(UserData)
	);
	console.log('setLocalData came', UserData);
}

// console.log('userSlice inside', userSlice);

export default userSlice.reducer;
