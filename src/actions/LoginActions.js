export function login(options) {
  return {
    type: 'LOGIN',
    payload: {
      client: 'default',
      request:{
        url:'login/',
        data: {login: options.login, password: options.password},
        method: 'POST',
        login: options.login,
        password: options.password
      }
    }
  };
}
