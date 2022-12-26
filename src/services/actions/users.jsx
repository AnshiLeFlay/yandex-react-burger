import { forgotPassword, resetPassword, registerUser } from '../../utils/users';

export const PASSWORD_FORGOT_REQUEST = 'PASSWORD_FORGOT_REQUEST';
export const PASSWORD_FORGOT_SUCCESS = 'PASSWORD_FORGOT_SUCCESS';
export const PASSWORD_FORGOT_FAILED = 'PASSWORD_FORGOT_FAILED';

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function forgot( email ) {
    return function( dispatch ) {
        dispatch({
            type: PASSWORD_FORGOT_REQUEST
        });
        forgotPassword( email ).then(res => {
            if (res && res.success) {
                dispatch({
                    type: PASSWORD_FORGOT_SUCCESS
                    /*items: res.data*/
                });
            } else {
                dispatch({
                    type: PASSWORD_FORGOT_FAILED
                });
            }
        });
    };
}

export function reset( password, token ) {
    return function( dispatch ) {
        dispatch({
            type: PASSWORD_RESET_REQUEST
        });
        resetPassword( password, token ).then(res => {
            if (res && res.success) {
                dispatch({
                    type: PASSWORD_RESET_SUCCESS
                    /*items: res.data*/
                });
            } else {
                dispatch({
                    type: PASSWORD_RESET_FAILED
                });
            }
        });
    };
}

export function register( name, email, password ) {
    return function( dispatch ) {
        dispatch({
            type: REGISTER_REQUEST
        });
        registerUser( name, email, password ).then(res => {
            if (res && res.success) {
                dispatch({
                    type: REGISTER_SUCCESS
                    /*items: res.data*/
                });
            } else {
                dispatch({
                    type: REGISTER_FAILED
                });
            }
        });
    };
}