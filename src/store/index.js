import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { redirectToLogin } from 'api/authentication';
import appSlice from './appSlice';
import { getPreloadedState, saveToLocalStorage } from './localStorage';

// console.log('userSlice reducer 1', userSlice);
// console.log('appSlice reducer 2', appSlice);

const combinedReducer = combineReducers({
	app: appSlice,
});

const rootReducer = (state, action) => {
	// console.log('rootReducer state', state);
	// console.log('rootReducer action', action);
	if (action.type === 'user/logout') {
		state = undefined;
		redirectToLogin();
	}
	return combinedReducer(state, action);
};

const store = configureStore({
	reducer: rootReducer,
	preloadedState: getPreloadedState(),
});

function onStateChange() {
	saveToLocalStorage(store.getState());
}

store.subscribe(onStateChange);

// console.log('store data', store);

export default store;

// https://stackoverflow.com/a/61943631/3882241
// https://codesandbox.io/s/reset-state-redux-toolkit-p515y?file=/src/components/counter/counterSlice.ts
