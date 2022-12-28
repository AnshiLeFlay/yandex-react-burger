import {
    PASSWORD_FORGOT_REQUEST,
    PASSWORD_FORGOT_SUCCESS,
    PASSWORD_FORGOT_FAILED,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    UPDATE_TOKEN_REQUEST,
    UPDATE_TOKEN_SUCCESS,
    UPDATE_TOKEN_FAILED
} from '../actions/users';

const initialState = {
    forgotRequest: false,
    forgotFailed: false,
    resetRequest: false,
    resetFailed: false,
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    tokenRequest: false,
    tokenFailed: false,
    user: {
        email: '',
        name: '',
        accessToken: '',
        refreshToken: ''
    }
}

export const users = ( state = initialState, action ) => {
    switch (action.type) {
        case PASSWORD_FORGOT_REQUEST: {
            return {
                ...state,
                forgotRequest: true
            };
        }
        case PASSWORD_FORGOT_SUCCESS: {
            return { ...state, forgotFailed: false, forgotRequest: false };
        }
        case PASSWORD_FORGOT_FAILED: {
            return { ...state, forgotFailed: true, forgotRequest: false };
        }
        case PASSWORD_RESET_REQUEST: {
            return {
                ...state,
                resetRequest: true
            };
        }
        case PASSWORD_RESET_SUCCESS: {
            return { ...state, resetFailed: false, resetRequest: false };
        }
        case PASSWORD_RESET_FAILED: {
            return { ...state, resetFailed: true, resetRequest: false };
        }
        case REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true
            };
        }
        case REGISTER_SUCCESS: {
            return { ...state, registerFailed: false, registerRequest: false };
        }
        case REGISTER_FAILED: {
            return { ...state, registerFailed: true, registerRequest: false };
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true
            };
        }
        case LOGIN_SUCCESS: {
            return { ...state, loginFailed: false, loginRequest: false,
                user: {
                    email: action.email,
                    name: action.name,
                    accessToken: action.accessToken,
                    refreshToken: action.refreshToken
                }
            };
        }
        case LOGIN_FAILED: {
            return { ...state, loginFailed: true, loginRequest: false };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true
            };
        }
        case LOGOUT_SUCCESS: {
            return { ...state, logoutFailed: false, logoutRequest: false,
                user: {
                    email: '',
                    name: '',
                    accessToken: '',
                    refreshToken: ''
                }
            };
        }
        case LOGOUT_FAILED: {
            return { ...state, logoutFailed: true, logoutRequest: false };
        }
        case UPDATE_TOKEN_REQUEST: {
            return {
                ...state,
                tokenRequest: true
            };
        }
        case UPDATE_TOKEN_SUCCESS: {
            return { ...state, tokenFailed: false, tokenRequest: false,
                user: {
                    ...state.user,
                    accessToken: action.accessToken,
                    refreshToken: action.refreshToken
                }
            };
        }
        case UPDATE_TOKEN_FAILED: {
            return { ...state, tokenFailed: true, tokenRequest: false };
        }
        default: {
            return state;
        }
    }
}