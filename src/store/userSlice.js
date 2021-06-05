import { createSlice } from '@reduxjs/toolkit';
// import { message as toaster } from 'antd';

const initialState = {
	me: {},
};

const authData = {
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
	console.log('values', values);
	console.log('authData', authData);

	setLocalData(values);

	return values;
};

export const userLogout = () => async (dispatch) => {
	dispatch(logout());
};

export function setLocalData(UserData) {
	localStorage.setItem(
		process.env.REACT_APP_AUTH_KEY,
		JSON.stringify(UserData)
	);
	console.log('setLocalData came', UserData);
}

export default userSlice.reducer;
