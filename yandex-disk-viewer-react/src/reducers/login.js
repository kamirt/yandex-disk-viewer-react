const initialState = {
  token: '',
  loggedIn: false
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_FAIL':
      return state;
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        loggedIn: true,
        token: action.payload.data.token
      })
    default:
      return state;
  }
}
