import { combineReducers } from 'redux';

import {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED
} from '../actions';

/*
Начальное состояние
ingredientsList - список всех полученных ингредиентов,
burgerIngredients - список всех ингредиентов в текущем конструкторе бургера,
currentIngridient - объект текущего просматриваемого ингредиента,
order - объект созданного заказа.
dataRequest - флаг запроса к API
dataFailed - флаг ошибки запроса к API
*/

const initialState = {
    data: {
        ingredients: [],
        dataRequest: false,
        dataFailed: false
    },
    burgerIngredients: [],
    currentIngridient: {},
    order: {
        data: {},
        orderRequest: false,
        orderFailed: false
    }
};

/*
Получение списка ингредиентов от API. Используется в компоненте BurgerIngredients.
*/
const getIngredientsData = ( state = initialState.data, action ) => {
    switch (action.type) {
        case GET_DATA_REQUEST: {
            return {
                ...state,
                dataRequest: true
            };
        }
        case GET_DATA_SUCCESS: {
            return { ...state, dataFailed: false, dataRequest: false, ingredients: action.items };
        }
        case GET_DATA_FAILED: {
            return { ...state, dataFailed: true, dataRequest: false };
        }
        default: {
            return state;
        }
    }
}

const getOrderData = ( state = initialState.order, action ) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            console.log('action suc');
            console.log(action);
            return { ...state, orderFailed: false, orderRequest: false, data: action.items };
        }
        case GET_ORDER_NUMBER_FAILED: {
            return { ...state, orderFailed: true, orderRequest: false };
        }
        default: {
            return state;
        }
    }
}

/*
Получение списка ингредиентов для конструктора бургера. Используется в компоненте BurgerConstructor.
Добавление данных о просматриваемом в модальном окне IngredientDetails ингредиенте.
Удаление данных о просматриваемом в модальном окне ингредиенте при закрытии модального окна.
Получение и обновление номера заказа в модальном окне OrderDetails.
*/
/*
const getIngredientsBurger = ( state, action ) => {
    
}

const addDataForIngredientDetails = ( state, action ) => {
    
}

const deleteDataFromIngredientDetails = ( state, action ) => {
    
}

const getOrderNumber = ( state, action ) => {
    
}

const updateOrderNumber = ( state, action ) => {
    
}
*/

export const rootReducer = combineReducers({
    data: getIngredientsData,
    order: getOrderData
});