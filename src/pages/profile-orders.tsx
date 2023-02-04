import React from 'react';

import { useDispatch, useSelector } from '../services/hooks';
import { WS_CONNECTION_END, WS_CONNECTION_START } from '../services/constants/ws';
import FeedCard from '../components/Cards/FeedCard';
import { findIngredients } from '../utils/functions';
import { Link, useLocation } from 'react-router-dom';
import { DELETE_ORDER } from '../services/constants/order';

import styles from './pages.module.css';

export function ProfileOrdersPage() {
    const location = useLocation();

    const dispatch = useDispatch();
    const accessToken = useSelector( store => store.users.user.accessToken );

    const ingredientsData = useSelector( store => store?.data?.ingredients );
    const dataFeed = useSelector( store => store.ws.messages?.orders );

    React.useEffect( () => {
        const token = `?token=${ accessToken.replace( 'Bearer ', '') }`;
        dispatch({ type: WS_CONNECTION_START, url: `${ token }` });

        return () => {
            dispatch({ type: WS_CONNECTION_END });
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ accessToken ])

    return (
        <div className={ `${ styles.left_column_item }` }>

            {
                dataFeed?.map( ( elem: { _id: React.Key | null | undefined; number: string; createdAt: string; name: string; ingredients: string[]; } ) => 
                    <Link 
                        className={ styles.link_reset }
                        onClick={ () => { dispatch( { type: DELETE_ORDER } ) }}
                        to={{
                            pathname: `/profile/orders/${ elem.number }`,
                            state: { background: location }
                        }}
                        key={ `div-${ elem._id }` }>
                        <FeedCard 
                            key={ elem._id }
                            orderNumber={ elem.number }
                            orderDate={ elem.createdAt }
                            burgerName={ elem.name }
                            ingredients={ findIngredients( elem.ingredients, ingredientsData ) }
                        />
                    </Link>
                )
            }
        </div>
    );
} 