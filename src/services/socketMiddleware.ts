import type { Middleware, MiddlewareAPI } from "redux";

import type { AppThunk, RootState } from "./types";

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppThunk, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { dispatch, getState } = store;
            const { type, payload, url } = action;

            if (type === "WS_CONNECTION_START") {
                socket = new WebSocket(`${wsUrl}${url}`);
            }

            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = (event) => {
                    dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = (event) => {
                    dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
                };

                // функция, которая вызывается при получения события от сервера
                socket.onmessage = (event) => {
                    const { data } = event;
                    dispatch({ type: "WS_GET_MESSAGE", payload: data });
                    //console.log( data );
                };

                // функция, которая вызывается при закрытии соединения
                socket.onclose = (event) => {
                    dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
                };

                if (type === "WS_SEND_MESSAGE") {
                    const message = payload;
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify(message));
                }

                if (type === "WS_CONNECTION_END") {
                    socket.close();
                }
            }

            next(action);
        };
    }) as Middleware;
};
