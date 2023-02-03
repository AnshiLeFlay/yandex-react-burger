import React, { useEffect } from 'react';
import { useSelector, useDispatch } from '../services/hooks';
import { useParams } from 'react-router-dom';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { findIngredients } from '../utils/functions';

import styles from './pages.module.css'; 
import { getOrder } from '../services/actions';

type TOrder = {
    _id?: string;
    ingredients?: Array<string>;
    owner?: string;
    status?: string;
    name?: string;
    createdAt?: string;
    updatedAt?: string;
    number?: number;
    __v?: number
}

type TIngredient = {
    _id?: string;
    name?: string;
    image?: string;
    calories?: string;
    proteins?: string;
    fat?: string;
    carbohydrates?: string;
    price?: string;
}

export function OrderPage( props: { id?: string, modal?: boolean } ) {
    const dispatch = useDispatch();

    const ingredientsData = useSelector( store => store?.data?.ingredients );
    const orderData = useSelector( store => store.order.current );
    const [ currentOrder, setCurrentOrder ] = React.useState<TOrder>( );
    const [ ingredients, setIngredients ] = React.useState<{ [x: string]: number }>();
    const [ ingredientsInOrder, setIngredientsInOrder ] = React.useState<Array<TIngredient>>();
    const [ price, setPrice ] = React.useState<number>( 0 );

    const params: { id: string } = useParams();
    
    useEffect( () => {
        if ( props?.id !== undefined ) dispatch( getOrder( props?.id ) );
        else if ( params?.id !== undefined) dispatch( getOrder( params?.id ) );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ ] );

    useEffect( () => {
        if ( orderData?.ingredients !== undefined ) { 
            setCurrentOrder( orderData );
            setIngredients( uniqueIngredients( orderData.ingredients ) );
            setIngredientsInOrder( findIngredients( orderData.ingredients, ingredientsData ) );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ orderData ] );

    useEffect( () => {
        
        if ( ingredientsInOrder !== undefined ) {
            let buf = 0;
            ingredientsInOrder.forEach( elem => {
                buf += parseInt( elem?.price! );
            } );
            setPrice( buf );
        }
            
    }, [ ingredientsInOrder ] );

    const uniqueIngredients = ( ingredients: any ) => {
        const unique = ingredients?.reduce( (acc: { [x: string]: number; }, val: string | number ) => {
            acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
            return acc;
        }, {});
        
        return unique;
    }

    const getStatus = ( arg: string ) => {
        switch( arg ) {
            case 'done':
                return 'Выполнен';
            case 'created':
                return 'Создан';
            case 'pending':
                return 'Готовится';
            default:
                return '';
        }
    }

    return (
        <div className={ !props?.modal ? `${ styles.wrapper_middle } ${ styles.wrapper_half }` : 'p-10' }>
            <p className={ `text text_type_digits-default mb-10 ${ styles.text_center }` }>#{ currentOrder?.number }</p>
            <p className='mb-3 text text_type_main-medium'>{ currentOrder?.name }</p>
            <p className={ `mb-15 text text_type_main-small ${ styles.text_color_light }` }>{ getStatus( currentOrder?.status! ) }</p>
            <p className='mb-6 text text_type_main-medium'>Состав:</p>
            <div className='mb-10 pr-6'>
                {
                    //currentOrder?.ingredients !== undefined &&
                    ingredientsInOrder?.filter( (v: any, i: any, a: string | any[] ) => a.indexOf(v) === i ).map( ( elem, index ) => 
                        <div key={ `ingredient-${ index }` } className={ `${ styles.text_icon_align }` }>
                            <div>
                                <div
                                    style={ { backgroundImage: `url(${ elem.image })` } }
                                    className={ styles.ingredient_icon } 
                                />
                            </div>
                            
                            <div className={ `${ styles.spaced } ${ styles.full_width }` }>
                                <p className='ml-4 mr-4 text text_type_main-default'>{ elem.name }</p>
                                <p className={ `text text_type_digits-default ${ styles.text_icon_align }` }><span className='mr-2'>{ ingredients?.[ `${ elem._id }` ] } x { elem.price }</span><CurrencyIcon type="primary" /></p>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={ `${ styles.spaced } ${ styles.text_icon_align }` }>
                <p className={ `text text_type_main-default text_color_inactive` }>
                    <FormattedDate date={ new Date( currentOrder?.createdAt! ) } />
                </p>
                <p className={ `text text_type_digits-default ${ styles.text_icon_align }` }><span className='mr-2'>{ price }</span><CurrencyIcon type="primary" /></p>
            </div>
        </div>
    )
}