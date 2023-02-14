import {
    getDataRequest,
    getOrderData,
    getOrderNumberRequest,
} from "../../utils/getdata";

import {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,
} from "../constants/data";
import {
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    DELETE_ORDER_NUMBER,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    DELETE_ORDER,
} from "../constants/order";
import {
    GET_INGREDIENTS_CONSTRUCTOR,
    ADD_INGREDIENTS_CONSTRUCTOR,
    DELETE_INGREDIENTS_CONSTRUCTOR,
    MOVE_INGREDIENTS_CONSTRUCTOR,
    ADD_DATA_INGREDIENTS_MODAL,
    DELETE_DATA_INGREDIENTS_MODAL,
} from "../constants/ingredients";

import { AppDispatch, TIngredient } from "../types";

export interface IGetDataRequestAction {
    readonly type: typeof GET_DATA_REQUEST;
}
export interface IGetDataSuccessAction {
    readonly type: typeof GET_DATA_SUCCESS;
    items: Array<TIngredient>;
}
export interface IGetDataFailedAction {
    readonly type: typeof GET_DATA_FAILED;
}

export interface IGetOrderNumberRequestAction {
    readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}
export interface IGetOrderNumberSuccessAction {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
    items: any;
}
export interface IGetOrderNumberFailedAction {
    readonly type: typeof GET_ORDER_NUMBER_FAILED;
}
export interface IDeleteOrderNumberAction {
    readonly type: typeof DELETE_ORDER_NUMBER;
}
export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    order: any;
}
export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}
export interface IDeleteOrderAction {
    readonly type: typeof DELETE_ORDER;
}

export interface IGetIngredientsConstructorAction {
    readonly type: typeof GET_INGREDIENTS_CONSTRUCTOR;
}
export interface IAddIngredientsConstructorAction {
    readonly type: typeof ADD_INGREDIENTS_CONSTRUCTOR;
    content: string;
    item: any;
}
export interface IDeleteIngredientsConstructorAction {
    readonly type: typeof DELETE_INGREDIENTS_CONSTRUCTOR;
    itemDelete: any;
}
export interface IMoveIngredientsConstructorAction {
    readonly type: typeof MOVE_INGREDIENTS_CONSTRUCTOR;
    itemReplace: number;
    itemDrag: number;
}

export interface IAddDataIngredientsModalAction {
    readonly type: typeof ADD_DATA_INGREDIENTS_MODAL;
    item: any;
}
export interface IDeleteDataIngredientsModalAction {
    readonly type: typeof DELETE_DATA_INGREDIENTS_MODAL;
}

export type TDataActions =
    | IGetDataRequestAction
    | IGetDataSuccessAction
    | IGetDataFailedAction;

export type TOrderActions =
    | IGetOrderNumberRequestAction
    | IGetOrderNumberSuccessAction
    | IGetOrderNumberFailedAction
    | IDeleteOrderNumberAction
    | IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderFailedAction
    | IDeleteOrderAction;

export type TIngredientsActions =
    | IGetIngredientsConstructorAction
    | IAddIngredientsConstructorAction
    | IDeleteIngredientsConstructorAction
    | IMoveIngredientsConstructorAction
    | IAddDataIngredientsModalAction
    | IDeleteDataIngredientsModalAction;

/* усилитель 1 - получение ингридиентов из API */
export const getItems = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_DATA_REQUEST,
        });
        getDataRequest().then((res) => {
            if (res && res.success) {
                dispatch({
                    type: GET_DATA_SUCCESS,
                    items: res.data,
                });
            } else {
                dispatch({
                    type: GET_DATA_FAILED,
                });
            }
        });
    };
};

/* усилитель 2 - получение данных заказа из API */
export const getOrderNumber = (order = {}, token: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_NUMBER_REQUEST,
        });
        getOrderNumberRequest(order, token).then((res) => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    items: res,
                });
            } else {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED,
                });
            }
        });
    };
};

export const getOrder = (order: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
        });
        getOrderData(order).then((res) => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res,
                });
            } else {
                dispatch({
                    type: GET_ORDER_FAILED,
                });
            }
        });
    };
};
