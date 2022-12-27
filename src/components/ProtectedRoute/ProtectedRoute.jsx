//import { useAuth } from '../services/auth';
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getCookie } from '../../utils/cookie';

export function ProtectedRoute({ children, ...rest }) {
    //let { getUser, ...auth } = useAuth();
    const [ auth, setAuth ] = useState( false );
    //const dispatch = useDispatch();
    const accessToken = useSelector( store => store.users.user.accessToken);
    const token = getCookie('refreshToken');

    const [ isUserLoaded, setUserLoaded ] = useState(false);

    const init = () => {
        //await getUser();
        //проверить если данные о пользователе в хранилище
        //если их нет проверить куки
        //если есть кука, то обновить данные
        //if ( token )
        //if ( accessToken !== '' )
        console.log( 'tokens' );
        console.log( token );
        console.log( accessToken );
        if ( token !== '' ) {
            if ( accessToken !== '' ) {
                //ok
                //проверить надо ли обновить токе?
                //console.log('ok');
                setAuth( true );
            } else {
                //update
                //get another accessToken
                setAuth( true );
            }
            //console.log('ne ok');
        }

        //console.log( 'tyt ne ok' );

        setUserLoaded(true);
    };

    useEffect( () => {
        init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

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