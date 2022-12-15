//actions к API
/*
export const DATA_API_QUERY = 'DATA_API_QUERY';
export const DATA_API_SUCCESS = 'DATA_API_SUCCESS';
export const DATA_API_ERROR = 'DATA_API_ERROR';
*/

import { getDataRequest, getOrderNumberRequest } from '../../utils/getdata';

export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

/*
Получение списка ингредиентов от API. Используется в компоненте BurgerIngredients.
Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor.
Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
Получение и обновление номера заказа в модальном окне OrderDetails.
*/

/* усилитель */
export function getItems() {
    return function(dispatch) {
        dispatch({
            type: GET_DATA_REQUEST
        });
        getDataRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_DATA_SUCCESS,
                    items: res.data
                });
            } else {
                dispatch({
                    type: GET_DATA_FAILED
                });
            }
        });
    };
}

export function getOrderNumber( order = {}) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_NUMBER_REQUEST
        });
        getOrderNumberRequest( order ).then(res => {
            console.log('test res');
            console.log(res);
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_NUMBER_SUCCESS,
                    items: res
                });
            } else {
                dispatch({
                    type: GET_ORDER_NUMBER_FAILED
                });
            }
        });
    };
}