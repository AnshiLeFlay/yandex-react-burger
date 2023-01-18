import React, { useEffect, useState, FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fullUpdate } from '../../services/actions/users';
import { getCookie } from '../../utils/cookie';

interface IStore {
    users: { 
        user: { 
            accessToken?: string; 
            name?: string;
        }; 
    }; 
}

interface IProtectedRouteProps {
    children?: React.ReactNode | JSX.Element | string;
    path: string;
}

const getAccessToken: any = ( store: IStore ) => store.users.user.accessToken; 
const getUsername: any = ( store: IStore ) => store.users.user.name

export const ProtectedRoute: FC<IProtectedRouteProps> = ( { children, ...rest } ) => {
    const [ auth, setAuth ] = useState<boolean>( false );
    const dispatch: any = useDispatch();
    const accessToken = useSelector<any>( getAccessToken );
    const username = useSelector<any>( getUsername );

    const [ isUserLoaded, setUserLoaded ] = useState(false);

    const init = async () => {
        //проверить если данные о пользователе в хранилище
        //если их нет проверить куки
        //если есть кука, то обновить данные

        const refreshToken = getCookie('refreshToken');
    
        if ( refreshToken !== '' && refreshToken !== undefined ) {
            if ( accessToken !== '' &&  accessToken !== undefined ) {
                setAuth( true );
            } else {
                //update
                //get another accessToken
                dispatch( fullUpdate( refreshToken ) );
                setAuth( true );
            }
        }

        setUserLoaded(true);
    };

    
    useEffect( () => {
        if ( username === '' ) {
            if ( getCookie('refreshToken') === undefined ) setAuth(false); 
        } 
    }, [ username ])
    

    useEffect( () => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route
            { ...rest }
            // Получим текущий маршрут, с которого произойдёт переадресация 
            // для неавторизованного пользователя
            render={
                ( { location } ) => auth ? (
                    children
                ) : (
                    <Redirect
                        // Передадим в пропс to не строку, а объект.
                        to={{
                            // Маршрут, на который произойдёт переадресация
                            pathname: '/login',
                            // В from сохраним текущий маршрут
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}