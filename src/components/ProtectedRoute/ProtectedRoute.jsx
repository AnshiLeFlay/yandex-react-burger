//import { useAuth } from '../services/auth';
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { token } from '../../services/actions/users';
import { getCookie } from '../../utils/cookie';

export function ProtectedRoute({ children, ...rest }) {
    //let { getUser, ...auth } = useAuth();
    const [ auth, setAuth ] = useState( false );
    const dispatch = useDispatch();
    const accessToken = useSelector( store => store.users.user.accessToken);
    const username = useSelector( store => store.users.user.name);
    //const refreshToken = getCookie('refreshToken');

    const [ isUserLoaded, setUserLoaded ] = useState(false);

    const init = () => {
        //проверить если данные о пользователе в хранилище
        //если их нет проверить куки
        //если есть кука, то обновить данные

        //console.log(refreshToken);
        const refreshToken = getCookie('refreshToken');
    
        if ( refreshToken !== '' && refreshToken !== undefined ) {
            //console.log('if');
            if ( accessToken !== '' ) {
                setAuth( true );
            } else {
                //update
                //get another accessToken
                dispatch( token( refreshToken ) );
                setAuth( true );
            }
        }

        setUserLoaded(true);
    };

    useEffect( () => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    
    useEffect( () => {
        if ( accessToken === '' || accessToken === undefined ) console.log('no access token');
    }, [ accessToken ] );
    
    

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route
            {...rest}
                // Получим текущий маршрут, с которого произойдёт переадресация 
                // для неавторизованного пользователя
            render={
                ({ location }) => auth ? (
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