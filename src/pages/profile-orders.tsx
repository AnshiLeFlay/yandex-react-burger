import React, { SyntheticEvent } from 'react';

import { useDispatch, useSelector } from '../services/hooks';
import { WS_CONNECTION_END, WS_CONNECTION_START } from '../services/constants/ws';
import FeedCard from '../components/Cards/FeedCard';
import { findIngredients } from '../utils/functions';
import Modal from '../components/Modal/Modal';
import { Route } from 'react-router-dom';
import { OrderPage } from './order';
import { DELETE_ORDER } from '../services/constants/order';

import styles from './pages.module.css';

export function ProfileOrdersPage() {
    const dispatch = useDispatch();
    const accessToken = useSelector( store => store.users.user.accessToken );

    const ingredientsData = useSelector( store => store?.data?.ingredients );
    const dataFeed = useSelector( store => store.ws.messages?.orders );

    const [ visible, setVisibility ] = React.useState<boolean>( false );
    const [ currentOrder, setCurrentOrder ] = React.useState<string>('');

    const handleOpenModal = ( e: React.MouseEvent, value: string ) => {
        setVisibility( true );
        setCurrentOrder( value );
	}

	const handleCloseModal = ( e: SyntheticEvent ) => {
		e.preventDefault();
        setVisibility( false );
        dispatch( { type: DELETE_ORDER } );
    }

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
                    <div  key={ `div-${ elem._id }` } onClick={ (e) => handleOpenModal(e, elem.number) }>
                        <FeedCard 
                            key={ elem._id }
                            orderNumber={ elem.number }
                            orderDate={ elem.createdAt }
                            burgerName={ elem.name }
                            ingredients={ findIngredients( elem.ingredients, ingredientsData ) }
                        />
                    </div>
                )
            }
            { visible && 
                <Modal onClose={ handleCloseModal }>
                    <Route path={ `/` } render={ ( props ) => <OrderPage id={ currentOrder } modal={ true } { ...props } /> } />
                </Modal>
            }
        </div>
    );
} 