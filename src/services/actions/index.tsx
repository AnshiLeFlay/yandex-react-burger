import { Dispatch } from 'redux';
import { getDataRequest, getOrderNumberRequest } from '../../utils/getdata';

export const GET_DATA_REQUEST: 'GET_DATA_REQUEST' = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS: 'GET_DATA_SUCCESS' = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILED: 'GET_DATA_FAILED' = 'GET_DATA_FAILED';

export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';
export const DELETE_ORDER_NUMBER: 'DELETE_ORDER_NUMBER' = 'DELETE_ORDER_NUMBER';

export const GET_INGREDIENTS_CONSTRUCTOR: 'GET_INGREDIENTS_CONSTRUCTOR' = 'GET_INGREDIENTS_CONSTRUCTOR';
export const ADD_INGREDIENTS_CONSTRUCTOR: 'ADD_INGREDIENTS_CONSTRUCTOR' = 'ADD_INGREDIENTS_CONSTRUCTOR';
export const DELETE_INGREDIENTS_CONSTRUCTOR: 'DELETE_INGREDIENTS_CONSTRUCTOR' = 'DELETE_INGREDIENTS_CONSTRUCTOR';
export const MOVE_INGREDIENTS_CONSTRUCTOR: 'MOVE_INGREDIENTS_CONSTRUCTOR' = 'MOVE_INGREDIENTS_CONSTRUCTOR';

export const ADD_DATA_INGREDIENTS_MODAL: 'ADD_DATA_INGREDIENTS_MODAL' = 'ADD_DATA_INGREDIENTS_MODAL';
export const DELETE_DATA_INGREDIENTS_MODAL: 'DELETE_DATA_INGREDIENTS_MODAL' = 'DELETE_DATA_INGREDIENTS_MODAL';

/* усилитель 1 - получение ингридиентов из API */
export function getItems(): Function {
    return function( dispatch: Dispatch ) {
        dispatch( {
            type: GET_DATA_REQUEST
        } );
        getDataRequest().then( res => {
            if ( res && res.success ) {
                dispatch( {
                    type: GET_DATA_SUCCESS,
                    items: res.data
                } );
            } else {
                dispatch( {
                    type: GET_DATA_FAILED
                } );
            }
        });
    };
}

/* усилитель 2 - получение данных заказа из API */
export function getOrderNumber( order = {} ): Function {
    return function( dispatch: Dispatch ) {
        dispatch( {
            type: GET_ORDER_NUMBER_REQUEST
        } );
        getOrderNumberRequest( order ).then( res => {
            if ( res && res.success ) {
                dispatch( {
                    type: GET_ORDER_NUMBER_SUCCESS,
                    items: res
                } );
            } else {
                dispatch( {
                    type: GET_ORDER_NUMBER_FAILED
                } );
            }
        } );
    };
}