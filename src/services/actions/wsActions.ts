import {
    WS_CONNECTION_START,
    WS_CONNECTION_END,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
} from "../constants/ws";

export interface IWSConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    url: string;
}
export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload: any;
}
export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSConnectionEndAction {
    readonly type: typeof WS_CONNECTION_END;
}
export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    payload: any;
}
export interface IWSSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    payload: any;
}

export type TWSActions =
    | IWSConnectionStartAction
    | IWSConnectionEndAction
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction
    | IWSSendMessageAction;
