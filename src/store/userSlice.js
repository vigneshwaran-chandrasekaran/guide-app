import { createSlice } from '@reduxjs/toolkit';
import { message as toaster } from 'antd';

const initialState = {
	me: {},
};

export const authData = {
	user: {
		name: 'Admin',
		permission: 'all',
		password: 'Admin',
	},
	user2: {
		name: 'MyName',
		permission: 'none',
		password: 'test',
	},
};

export const userSlice = createSlice({
	name: 'user', // name of the reducer
	initialState,
	reducers: {
		setUser: (state, { payload }) => {
			state.me = payload;
		},
		logout: (state, { payload = {} }) => {
			state.me = payload;
		},
	},
});

export const { setUser, logout } = userSlice.actions;

export const userLogin = (values) => async () => {
	if (
		(values?.name === authData?.user?.name &&
			values?.password === authData?.user?.password) ||
		(values?.name === authData?.user2?.name &&
			values?.password === authData?.user2?.password)
	) {
		setLocalData(values);
		setUser(values);
		return values;
	} else {
		const error = 'Please enter valid credentials';
		toaster.error(error);
		throw new Error(error);
	}
};

export const userLogout = () => async (dispatch) => {
	dispatch(logout());
};

export function setLocalData(UserData) {
	localStorage.setItem(
		process.env.REACT_APP_AUTH_KEY,
		JSON.stringify(UserData)
	);
}

export default userSlice.reducer;
