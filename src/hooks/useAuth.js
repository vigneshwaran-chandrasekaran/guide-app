export default function useAuth() {
  return JSON.parse(localStorage.getItem(process.env.REACT_APP_AUTH_KEY)) || {};
}
