import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { ActionCreator } from 'redux';

import { store } from '../store';
import { TDataActions, TIngredientsActions, TOrderActions } from '../actions';
import { TUsersActions } from '../actions/users';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TUsersActions | TDataActions | TIngredientsActions | TOrderActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = any> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>; 

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch; 