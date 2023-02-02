import React from 'react';

import FeedCard from '../components/Cards/FeedCard';
import { WS_CONNECTION_START, WS_CONNECTION_END } from '../services/constants/ws';
import { useDispatch, useSelector } from '../services/hooks';

import styles from './pages.module.css';

type TIngredient = {
    _id?: string;
    name?: string;
    image?: string;
    calories?: string;
    proteins?: string;
    fat?: string;
    carbohydrates?: string;
}

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

    const doneOrders = dataFeed?.filter( elem => elem.status === 'done' )?.map( elem => elem.number );
    const otherOrders = dataFeed?.filter( elem => elem.status !== 'done' )?.map( elem => elem.number );

    const findIngredients = ( args: Array<string>, inrgediensArray: Array<TIngredient> ) => {
        let res = [];
        for ( let i = 0; i < inrgediensArray.length; i++ ) {
            const buf = inrgediensArray.find( ( elem: TIngredient ) => elem._id === args[i] );
            if ( buf !== undefined )
                res.push( buf );
        }

        return res;
    }

    React.useEffect( () => {
        dispatch( { type: WS_CONNECTION_START, url: 'feed' } );
  
        return () => {
            dispatch( { type: WS_CONNECTION_END } );
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    /* orders
    ingredients: Array<string>,
    name: string,
    createdAt: date,
    number: number
    */

    /* messages
    total: number,
    totalToday: number
    */

    const generateColumns = ( arr: Array<string>, textColor: string, hash: string ) => {
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
                            <FeedCard 
                                key={ elem._id }
                                orderNumber={ elem.number }
                                orderDate={ elem.createdAt }
                                burgerName={ elem.name }
                                ingredients={ findIngredients( elem.ingredients, ingredientsData ) }
                            />
                        )
                    }
                    
                </div>
                <div className={ styles.main_content_item }>
                    <div className={ `mb-15 ${ styles.wrapper_order_feed }` }>
                        <div className={ styles.wrapper_half }>
                            <p className='text text_type_main-medium mb-6'>Готовы:</p>
                            <div className={ styles.wrapper_flex }>
                                { generateColumns( doneOrders, styles.text_color_order_number, 'inProgress' ) }
                            </div>
                        </div>
                        <div className={ styles.wrapper_half }>
                            <p className='text text_type_main-medium mb-6'>В работе:</p>
                            <div className={ styles.wrapper_flex }>
                                { generateColumns( otherOrders, styles.text_color_order_number, '' ) }
                            </div>
                        </div>
                    </div>
                    <p className='text text_type_main-medium'>Выполнено за все время:</p>
                    <p className='text text_type_digits-large mb-15'>{ total }</p>
                    <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                    <p className='text text_type_digits-large'>{ totalToday }</p>
                </div>
            </div>
        </div>
    );
} 