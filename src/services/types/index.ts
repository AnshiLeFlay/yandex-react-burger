import { Dispatch } from 'redux';
import { TUsersActions } from '../actions/users';
import { TMainActions } from '../actions';

type TApplicationActions = TUsersActions & TMainActions;

export type AppDispatch = Dispatch<TApplicationActions>;