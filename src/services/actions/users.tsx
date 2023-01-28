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
import { Dispatch } from 'redux';

import { 
    PASSWORD_FORGOT_REQUEST, PASSWORD_FORGOT_SUCCESS, PASSWORD_FORGOT_FAILED,
    PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILED,
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED,
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED,
    LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED,
    UPDATE_TOKEN_REQUEST, UPDATE_TOKEN_SUCCESS, UPDATE_TOKEN_FAILED,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED,
    GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILED
} from './../constants/users';

export interface IPasswordForgotRequestAction {
    readonly type: typeof PASSWORD_FORGOT_REQUEST;
}
export interface IPasswordForgotSuccessAction {
    readonly type: typeof PASSWORD_FORGOT_SUCCESS;
}
export interface IPasswordForgotFailedAction {
    readonly type: typeof PASSWORD_FORGOT_FAILED;
}

export interface IPasswordResetRequestAction {
    readonly type: typeof PASSWORD_RESET_REQUEST;
}
export interface IPasswordResetSuccessAction {
    readonly type: typeof PASSWORD_RESET_SUCCESS;
}
export interface IPasswordResetFailedAction {
    readonly type: typeof PASSWORD_RESET_FAILED;
}

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
}
export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    accessToken: String;
    refreshToken: String;
    email: String;
    name: String;
}
export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

export interface IUpdateTokenRequestAction {
    readonly type: typeof UPDATE_TOKEN_REQUEST;
}
export interface IUpdateTokenSuccessAction {
    readonly type: typeof UPDATE_TOKEN_SUCCESS;
    accessToken: String;
    refreshToken: String;
}
export interface IUpdateTokenFailedAction {
    readonly type: typeof UPDATE_TOKEN_FAILED;
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    name: String;
    email: String;
}
export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}

export interface IGetUserDataRequestAction {
    readonly type: typeof GET_USER_DATA_REQUEST;
}
export interface IGetUserDataSuccessAction {
    readonly type: typeof GET_USER_DATA_SUCCESS;
    name: String;
    email: String;
}
export interface IGetUserDataFailedAction {
    readonly type: typeof GET_USER_DATA_FAILED;
}

export type TUsersActions = 
    | IPasswordForgotRequestAction | IPasswordForgotSuccessAction | IPasswordForgotFailedAction
    | IPasswordResetRequestAction | IPasswordResetSuccessAction | IPasswordResetFailedAction
    | IRegisterRequestAction | IRegisterSuccessAction | IRegisterFailedAction
    | ILoginRequestAction | ILoginSuccessAction | ILoginFailedAction
    | ILogoutRequestAction | ILogoutSuccessAction | ILogoutFailedAction
    | IUpdateTokenRequestAction | IUpdateTokenSuccessAction | IUpdateTokenFailedAction
    | IUpdateUserRequestAction | IUpdateUserSuccessAction | IUpdateUserFailedAction
    | IGetUserDataRequestAction | IGetUserDataSuccessAction | IGetUserDataFailedAction;

export function forgot( email: string ): Function {
    return function( dispatch: Dispatch ) {
        dispatch( {
            type: PASSWORD_FORGOT_REQUEST
        } );
        forgotPassword( email ).then( res => {
            if ( res && res.success ) {
                dispatch( {
                    type: PASSWORD_FORGOT_SUCCESS
                } );
            } else {
                dispatch( {
                    type: PASSWORD_FORGOT_FAILED
                } );
            }
        });
    };
}

export function reset( password: string, token: string ): Function {
    return function( dispatch: Dispatch ) {
        dispatch({
            type: PASSWORD_RESET_REQUEST
        });
        resetPassword( password, token ).then( res => {
            if ( res && res.success ) {
                dispatch( {
                    type: PASSWORD_RESET_SUCCESS
                } );
            } else {
                dispatch( {
                    type: PASSWORD_RESET_FAILED
                } );
            }
        } );
    };
}

export function register( name: string, email: string, password: string ): Function {
    return function( dispatch: Dispatch<any> ) {
        dispatch( {
            type: REGISTER_REQUEST
        } );
        registerUser( name, email, password ).then( res => {
            if ( res && res.success ) {
                dispatch( {
                    type: REGISTER_SUCCESS
                } );

                //авторизовать пользователя после успешной регистрации
                dispatch( login( email, password ) );
            } else {
                dispatch({
                    type: REGISTER_FAILED
                });
            }
        });
    };
}

export function login( email: string, password: string ): Function {
    return function( dispatch: Dispatch ) {
        dispatch( {
            type: LOGIN_REQUEST
        } );
        loginUser( email, password ).then( res => {
            if ( res && res.success ) {
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
            
                dispatch( {
                    type: LOGIN_SUCCESS,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                    email: res.user.email,
                    name: res.user.name
                } );

                //устанавливаем cookie на 1 день
                setCookie( 'refreshToken', res.refreshToken, { expires: 86400 } );
            } else {
                dispatch( {
                    type: LOGIN_FAILED
                } );
            }
        });
    };
}

export function logout( token: string ): Function {
    return function( dispatch: Dispatch ) {
        dispatch( {
            type: LOGOUT_REQUEST
        } );
        logoutUser( token ).then( res => {
            if ( res && res.success ) {
                dispatch( {
                    type: LOGOUT_SUCCESS,
                } );

                deleteCookie( 'refreshToken' );
            } else {
                dispatch( {
                    type: LOGOUT_FAILED
                } );
            }
        });
    };
}

export function token( refreshToken: string ): Function {
    return function( dispatch: Dispatch ) {
        dispatch( {
            type: UPDATE_TOKEN_REQUEST
        } );
        updateToken( refreshToken ).then( res => {
            if ( res && res.success ) {
                dispatch( {
                    type: UPDATE_TOKEN_SUCCESS,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken
                } );

                setCookie( 'refreshToken', res.refreshToken, { expires: 86400 } );
            } else {
                dispatch( {
                    type: UPDATE_TOKEN_FAILED
                } );
            }
        });
    };
} 

export function updateData( token: string, data: any ): Function {
    return function( dispatch: Dispatch ) {
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
                //проверка jwt expired

                if ( res.message === 'jwt expired' ) {

                    updateToken( getCookie( 'refreshToken' ) ).then( res2 => {
                        if ( res2 && res2.success ) {
                            dispatch( {
                                type: UPDATE_TOKEN_SUCCESS,
                                accessToken: res2.accessToken,
                                refreshToken: res2.refreshToken
                            } );
            
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

export function userData( token: string ): Function {
    return function( dispatch: Dispatch ) {
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
                    //проверка jwt expired

                    updateToken( getCookie( 'refreshToken' ) ).then( res2 => {
                        if ( res2 && res2.success ) {
                            dispatch( {
                                type: UPDATE_TOKEN_SUCCESS,
                                accessToken: res2.accessToken,
                                refreshToken: res2.refreshToken
                            } );
            
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
        } );
    };
} 

export function fullUpdate( token: string ): Function {
    return function( dispatch: Dispatch ) {
        dispatch( {
            type: UPDATE_TOKEN_REQUEST
        } );
        updateToken( token ).then( res => {
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
                dispatch( {
                    type: UPDATE_TOKEN_FAILED
                } );
            }
        } );
    }
}