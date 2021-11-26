import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import { getPreloadedState, saveToLocalStorage } from './localStorage';

export function redirectToLogin() {
  /**
   * Refresh token session time also expired, so clear the local storage
   * then redirect the user to login page
   */

  localStorage.clear();
  window.location = `${window.origin}/login`;
}

const combinedReducer = combineReducers({
  app: appSlice,
});

const rootReducer = (state, action) => {
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
