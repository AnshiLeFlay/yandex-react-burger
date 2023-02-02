// rootReducer.ts

import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_START
} from '../constants/ws';

import { TWSActions } from '../actions/wsActions';

//import type { /*IMessage,*/ TWSActions } from '../types';


type TWSState = {
    url: string;
    wsConnected: boolean;
    messages: any;

    error?: Event;
}
  
const initialState: TWSState = {
    url: '',
    wsConnected: false,
    messages: {}
};
  
  // Создадим редьюсер для WebSocket
export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
    switch ( action.type ) {
        case WS_CONNECTION_START: 
            return {
                ...state,
                url: action.url
            }
        // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
        // Установим флаг wsConnected в состояние true
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
  
        // Опишем обработку экшена с типом WS_CONNECTION_ERROR
        // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
  
        // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
        // Установим флаг wsConnected в состояние false
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false
            };
  
        // Опишем обработку экшена с типом WS_GET_MESSAGE
        // Обработка происходит, когда с сервера возвращаются данные
        // В messages передадим данные, которые пришли с сервера
        case WS_GET_MESSAGE:
            if ( action.payload !== '' )
                return {
                    ...state,
                    error: undefined,
                    messages: JSON.parse(action.payload)
                };
            else return {
                ...state
            }
        default:
            return state;
    }
};