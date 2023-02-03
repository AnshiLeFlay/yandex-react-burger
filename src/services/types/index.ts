import { ThunkDispatch } from 'redux-thunk';

import { store } from '../store';
import { TDataActions, TIngredientsActions, TOrderActions } from '../actions';
import { TWSActions } from '../actions/wsActions';
import { TUsersActions } from '../actions/users';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions = TUsersActions | TDataActions | TIngredientsActions | TOrderActions | TWSActions;

// Типизация thunk'ов в нашем приложении
//export type AppThunk<TReturn = any> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>; 
export type AppThunk = ThunkDispatch<RootState, any, TApplicationActions>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch; 

//export type TWSActions = ;

export type TIngredient = {
    _id?: string;
    name?: string;
    image?: string;
    calories?: string;
    proteins?: string;
    fat?: string;
    carbohydrates?: string;
}

export type TOrder = {
    _id?: string,
    ingredients?: Array<string>,
    name?: string,
    createdAt?: string,
    updatedAt?: string,
    number?: string,
    status?: string
}