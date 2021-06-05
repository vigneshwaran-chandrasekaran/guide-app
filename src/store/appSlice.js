import { createSlice } from '@reduxjs/toolkit';
import { message as toaster } from 'antd';

const allFruits = [
	{
		id: 1,
		name: 'Apple',
		color: 'red',
		colorHex: '#CA3526',
		maxCount: 10,
	},
	{
		id: 2,
		name: 'Orange',
		color: 'gold',
		colorHex: '#F6A128',
		maxCount: 10,
	},
	{
		id: 3,
		name: 'Grapes',
		color: 'purple',
		colorHex: '#523584',
		maxCount: 10,
	},
];

const initialState = {
	allFruits,
	loading: false,
	recentlyVisitedUrl: '/login',
	cart: [],
};

function checkValidUser() {
	const user = JSON.parse(localStorage.getItem('userInfo'));
	if (user?.name === 'Admin') {
		return true;
	} else {
		toaster.error('You are not a admin user');
		return false;
	}
}

export const appSlice = createSlice({
	name: 'app', // name of the reducer
	initialState,
	reducers: {
		showLoader: (state) => {
			console.log('show loader');
			state.loading = true;
		},
		hideLoader: (state) => {
			state.loading = false;
		},
		addToCart: (state, { payload }) => {
			if (checkValidUser()) {
				console.log('addToCart payload', payload);
				state?.cart?.unshift(payload);
			}
		},
		removeFromCart: (state, { payload }) => {
			console.log('removeFromCart payload', payload);
			if (checkValidUser()) {
				if (state?.cart?.[0]?.name === payload?.name) {
					state?.cart?.shift();
				} else if (state?.cart?.length === 0) {
					toaster.error('Cart is empty');
				} else {
					toaster.error('Please select correct fruit');
				}
			}
		},
	},
});

export const { showLoader, hideLoader, addToCart, removeFromCart } =
	appSlice.actions;

// console.log('appSlice inside', appSlice);

export default appSlice.reducer;
