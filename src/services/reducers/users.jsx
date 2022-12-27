import {
    PASSWORD_FORGOT_REQUEST,
    PASSWORD_FORGOT_SUCCESS,
    PASSWORD_FORGOT_FAILED,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED
} from '../actions/users';

const initialState = {
    forgotRequest: false,
    forgotFailed: false,
    resetRequest: false,
    resetFailed: false,
    registerRequest: false,
    registerFailed: false
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
        default: {
            return state;
        }
    }
}