import { 
    forgotPassword, 
    resetPassword, 
    registerUser,
    loginUser,
    logoutUser,
    updateToken,
    updateUser,
    getUserData
} from '../../utils/users';

import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";

export const PASSWORD_FORGOT_REQUEST = 'PASSWORD_FORGOT_REQUEST';
export const PASSWORD_FORGOT_SUCCESS = 'PASSWORD_FORGOT_SUCCESS';
export const PASSWORD_FORGOT_FAILED = 'PASSWORD_FORGOT_FAILED';

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESET_REQUEST';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';

export function forgot( email ) {
    return function( dispatch ) {
        dispatch({
            type: PASSWORD_FORGOT_REQUEST
        });
        forgotPassword( email ).then(res => {
            if (res && res.success) {
                dispatch({
                    type: PASSWORD_FORGOT_SUCCESS
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
                });

                //???????????????????????? ???????????????????????? ?????????? ???????????????? ??????????????????????
                dispatch( login( email, password ) );
            } else {
                dispatch({
                    type: REGISTER_FAILED
                });
            }
        });
    };
}

export function login( email, password ) {
    return function( dispatch ) {
        dispatch({
            type: LOGIN_REQUEST
        });
        loginUser( email, password ).then(res => {
            if (res && res.success) {
                /* anser from server
                {
                    "success": true,
                    "accessToken": "Bearer ...",
                    "refreshToken": "",
                    "user": {
                        "email": "",
                        "name": ""
                    }
                } 
                */
            
                dispatch({
                    type: LOGIN_SUCCESS,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    email: res.user.email,
                    name: res.user.name
                });

                //?????????????????????????? cookie ???? 1 ????????
                setCookie( 'refreshToken', res.refreshToken, { expires: 86400 } );
            } else {
                dispatch({
                    type: LOGIN_FAILED
                });
            }
        });
    };
}

export function logout( token ) {
    return function( dispatch ) {
        dispatch({
            type: LOGOUT_REQUEST
        });
        logoutUser( token ).then(res => {
            if ( res && res.success ) {
                dispatch({
                    type: LOGOUT_SUCCESS,
                });

                deleteCookie( 'refreshToken' );
            } else {
                dispatch({
                    type: LOGOUT_FAILED
                });
            }
        });
    };
}

export function token( refreshToken ) {
    return function( dispatch ) {
        dispatch({
            type: UPDATE_TOKEN_REQUEST
        });
        updateToken( refreshToken ).then(res => {
            if ( res && res.success ) {
                dispatch({
                    type: UPDATE_TOKEN_SUCCESS,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken
                });

                setCookie( 'refreshToken', res.refreshToken, { expires: 86400 } );
            } else {
                dispatch({
                    type: UPDATE_TOKEN_FAILED
                });
            }
        });
    };
} 

export function updateData( token, data ) {
    return function( dispatch ) {
        dispatch( {
            type: UPDATE_USER_REQUEST
        } );
        updateUser( token, data ).then( res => {
            if ( res && res.success ) {
                dispatch( {
                    type: UPDATE_USER_SUCCESS,
                    name: res.user.name,
                    email: res.user.email
                } );
            } else {
                //???????????????? jwt expired

                if ( res.message === 'jwt expired' ) {

                    updateToken( getCookie( 'refreshToken' ) ).then( res2 => {
                        if ( res2 && res2.success ) {
                            dispatch({
                                type: UPDATE_TOKEN_SUCCESS,
                                accessToken: res2.accessToken,
                                refreshToken: res2.refreshToken
                            });
            
                            setCookie( 'refreshToken', res2.refreshToken, { expires: 86400 } );

                            updateUser( res2.accessToken, data ).then( res3 => {
                                if ( res3 && res3.success ) {
                                    dispatch( {
                                        type: UPDATE_USER_SUCCESS,
                                        name: res3.user.name,
                                        email: res3.user.email
                                    } );
                                } else {
                                    dispatch( {
                                        type: UPDATE_USER_FAILED
                                    } );
                                }
                            } );
                        }
                    } );
                } else {
                    dispatch( {
                        type: UPDATE_USER_FAILED
                    } );
                }
            }
        } );
    };
} 

export function userData( token ) {
    return function( dispatch ) {
        dispatch( {
            type: GET_USER_DATA_REQUEST
        } );
        getUserData( token ).then( res => {
            if ( res && res.success ) {
                dispatch( {
                    type: GET_USER_DATA_SUCCESS,
                    name: res.user.name,
                    email: res.user.email
                } );
            } else {
                if ( res.message === 'jwt expired' ) {
                    //???????????????? jwt expired

                    updateToken( getCookie( 'refreshToken' ) ).then( res2 => {
                        if ( res2 && res2.success ) {
                            dispatch({
                                type: UPDATE_TOKEN_SUCCESS,
                                accessToken: res2.accessToken,
                                refreshToken: res2.refreshToken
                            });
            
                            setCookie( 'refreshToken', res2.refreshToken, { expires: 86400 } );

                            getUserData( res2.accessToken ).then( res3 => {
                                if ( res3 && res3.success ) {
                                    dispatch( {
                                        type: GET_USER_DATA_SUCCESS,
                                        name: res.user.name,
                                        email: res.user.email
                                    } );
                                } else {
                                    dispatch( {
                                        type: GET_USER_DATA_FAILED
                                    } );
                                }
                            } );
                        }
                    } );
                } else {
                    dispatch( {
                        type: GET_USER_DATA_FAILED
                    } );
                }
            }
        });
    };
} 

export function fullUpdate( token ) {
    return function( dispatch ) {
        dispatch({
            type: UPDATE_TOKEN_REQUEST
        });
        updateToken( token ).then(res => {
            if ( res && res.success ) {

                dispatch({
                    type: UPDATE_TOKEN_SUCCESS,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken
                });

                setCookie( 'refreshToken', res.refreshToken, { expires: 86400 } );

                getUserData( res.accessToken ).then( res => {
                    if ( res && res.success ) {
                        dispatch( {
                            type: GET_USER_DATA_SUCCESS,
                            name: res.user.name,
                            email: res.user.email
                        } );
                    } else {
                        dispatch( {
                            type: GET_USER_DATA_FAILED
                        } );
                    }
                });
                
            } else {
                dispatch({
                    type: UPDATE_TOKEN_FAILED
                });
            }
        });
    }
}