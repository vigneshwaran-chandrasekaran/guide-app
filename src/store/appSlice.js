import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	recentlyVisitedUrl: '/login',
};

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
	},
});

export const { showLoader, hideLoader } = appSlice.actions;

// console.log('appSlice inside', appSlice);

export default appSlice.reducer;
