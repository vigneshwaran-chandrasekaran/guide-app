export const saveToLocalStorage = (state) => {
  try {
    // console.log('store.getState()', state);
    const serializedState = JSON.stringify(state);
    // console.log('saveToLocalStorage', serializedState);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const getPreloadedState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    // console.log('getPreloadedState', serializedState);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
};
