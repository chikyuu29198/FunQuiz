let initalState = {
    isLogin: null,
    user: {}
  };
  
const userReducer = (state = initalState, action) =>  {
switch (action.type) {
    case 'LOGIN_SUCCESS':
    return {
        isLogin: true,
        user: action.user
    };
    case 'SIGNUP_SUCCESS':
    return {
        isLogin: true,
        user: action.user
    };
    case 'SYNC_AUTH_STATUS':
    return {
        isLogin: true,
        user: action.user
    };
    case 'LOGOUT_SUCCESS':
    return {
        isLogin: false,
        user: {}
    }
    default:
    return state
}
};
  
export default userReducer;