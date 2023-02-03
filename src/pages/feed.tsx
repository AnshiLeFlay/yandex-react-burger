import React, { SyntheticEvent } from 'react';
import { Route } from 'react-router-dom';

import FeedCard from '../components/Cards/FeedCard';
import Modal from '../components/Modal/Modal';
import { DELETE_ORDER } from '../services/constants/order';
import { WS_CONNECTION_START, WS_CONNECTION_END } from '../services/constants/ws';
import { useDispatch, useSelector } from '../services/hooks';
import { findIngredients } from '../utils/functions';
import { OrderPage } from './order';

import styles from './pages.module.css';

type TOrder = {
    _id: string,
    ingredients: Array<string>,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: string,
    status: string
}

export function FeedPage() {
    const dispatch = useDispatch();
    const ingredientsData = useSelector( store => store?.data?.ingredients );
    const dataFeed: Array<TOrder> = useSelector( store => store.ws.messages?.orders );
    const total = useSelector( store => store.ws.messages?.total );
    const totalToday = useSelector( store => store.ws.messages?.totalToday );

    const [ visible, setVisibility ] = React.useState<boolean>( false );
    const [ currentOrder, setCurrentOrder ] = React.useState<string>('');

    const doneOrders = dataFeed?.filter( elem => elem.status === 'done' )?.map( elem => elem.number );
    const otherOrders = dataFeed?.filter( elem => elem.status !== 'done' )?.map( elem => elem.number );

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
        dispatch( { type: WS_CONNECTION_START, url: '/all' } );
  
        return () => {
            dispatch( { type: WS_CONNECTION_END } );
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    const generateColumns = ( arr: Array<string>, textColor: string, hash: string ) => {
        if ( arr === undefined ) return [];

        let buf = [];
        let parentBuf = [];
        
        for ( let i = 0; i < arr.length; i++ ) {
            buf.push( <span key={ `${ hash }_${ i }` }>{ arr[i] }</span> );

            if ( ( i + 1 ) % 10 === 0 ) {
                parentBuf.push( <p key={ `${ hash }_p_${ i }` } className={ `text text_type_digits-default ${ textColor } ${ styles.wrapper_column }`}> { buf } </p> );
                buf = [];
            }
            
        }

        if ( buf[0] !== undefined ) parentBuf.push( <p key={ `${ hash }_p_last` } className={ `text text_type_digits-default ${ textColor } ${ styles.wrapper_column }`}> { buf } </p> );

        return parentBuf;
    }

    return (
        <div>
            <p className={ `text text_type_main-large mt-10 mb-5 ${ styles.page_header }`}>Лента заказов</p>
            <div className={ styles.main_content }>
                <div className={ `${ styles.main_content_item } ${ styles.left_column_item }` }>

                    {
                        dataFeed?.map( ( elem ) => 
                            <div key={ `div-${ elem._id }` } onClick={ (e) => handleOpenModal(e, elem.number) }>
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
                    
                </div>
                <div className={ styles.main_content_item }>
                    <div className={ `mb-15 ${ styles.wrapper_order_feed }` }>
                        <div className={ styles.wrapper_half }>
                            <p className='text text_type_main-medium mb-6'>Готовы:</p>
                            <div className={ styles.wrapper_flex }>
                                { generateColumns( doneOrders, styles.text_color_light, 'Done' ) }
                            </div>
                        </div>
                        <div className={ styles.wrapper_half }>
                            <p className='text text_type_main-medium mb-6'>В работе:</p>
                            <div className={ styles.wrapper_flex }>
                                { generateColumns( otherOrders, '', 'inProgress' ) }
                            </div>
                        </div>
                    </div>
                    <p className='text text_type_main-medium'>Выполнено за все время:</p>
                    <p className='text text_type_digits-large mb-15'>{ total }</p>
                    <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                    <p className='text text_type_digits-large'>{ totalToday }</p>
                </div>
            </div>
            { visible && 
                <Modal onClose={ handleCloseModal }>
                    <Route path={ `/feed` } render={ ( props ) => <OrderPage id={ currentOrder } modal={ true } { ...props } /> } />
                </Modal>
            }
        </div>
    );
} 