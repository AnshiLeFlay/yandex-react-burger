import { combineReducers } from 'redux';

import { users } from './users';

import {
    GET_DATA_REQUEST,
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    DELETE_ORDER_NUMBER,
    GET_INGREDIENTS_CONSTRUCTOR,
    ADD_INGREDIENTS_CONSTRUCTOR,
    DELETE_INGREDIENTS_CONSTRUCTOR,
    MOVE_INGREDIENTS_CONSTRUCTOR,
    ADD_DATA_INGREDIENTS_MODAL,
    DELETE_DATA_INGREDIENTS_MODAL
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
    ingredients: {
        burgerIngredients: {
            bun: '60d3b41abdacab0026a733c6',
            consist: [ '60d3b41abdacab0026a733ce', '60d3b41abdacab0026a733c8', '60d3b41abdacab0026a733ca']
        },
        currentIngredient: {},
    },
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

/* Получение и обновление номера заказа в модальном окне OrderDetails. */
const getOrderData = ( state = initialState.order, action ) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return { ...state, orderFailed: false, orderRequest: false, data: action.items };
        }
        case GET_ORDER_NUMBER_FAILED: {
            return { ...state, orderFailed: true, orderRequest: false, data: '' };
        }
        case DELETE_ORDER_NUMBER: {
            return { ...state, orderFailed: false, orderRequest: false, data: '' };
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
*/
const ingredientsReducer = ( state = initialState.ingredients, action ) => {
    switch (action.type) {
        case GET_INGREDIENTS_CONSTRUCTOR: {
            return {
                ...state
            };
        }
        case ADD_INGREDIENTS_CONSTRUCTOR: {
            if ( action.content === 'bun' )
            {
                return {
                    ...state,
                    burgerIngredients: { 
                        bun: action.item,
                        consist: [...state.burgerIngredients.consist]
                    }
                };
            } else {
                return {
                    ...state,
                    burgerIngredients: { 
                        bun: state.burgerIngredients.bun,
                        consist: [ ...state.burgerIngredients.consist, action.item ] 
                    }
                };
            }
        }
        case DELETE_INGREDIENTS_CONSTRUCTOR: {
            const bufferState = state.burgerIngredients.consist;

            bufferState.splice(action.itemDelete, 1);

            return {
                ...state,
                burgerIngredients: { 
                    bun: state.burgerIngredients.bun,
                    consist: [ ...bufferState ] 
                }
            };
        }
        case MOVE_INGREDIENTS_CONSTRUCTOR: {
            const bufferState = state.burgerIngredients.consist;

            bufferState.splice(action.itemReplace, 0, bufferState.splice(action.itemDrag, 1)[0]);

            return {
                ...state,
                burgerIngredients: { 
                    bun: state.burgerIngredients.bun,
                    consist: [ ...bufferState ] 
                }
            };
        }
        case ADD_DATA_INGREDIENTS_MODAL: {
            return {
                ...state,
                currentIngredient: action.item
            };
        }
        case DELETE_DATA_INGREDIENTS_MODAL: {
            return {
                ...state,
                currentIngredient: {}
            };
        }
        default: {
            return state;
        }
    }
}

export const rootReducer = combineReducers({
    data: getIngredientsData,
    order: getOrderData,
    ingredients: ingredientsReducer,
    users: users
});