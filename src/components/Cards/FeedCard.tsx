import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './cards.module.css'; 

interface IFeedCardProps {
    orderNumber: string;
    orderDate: string;
    burgerName: string;
    ingredients: Array<any>;
}

const FeedCard: FC<IFeedCardProps> = ( props ) => {
    const toshowIngredients = props.ingredients.slice(0, 5);
    const otherIngredients = props.ingredients.slice(5);

    const getPrice = ( ) => {
        let ans = 0;

        for ( let i = 0; i < props.ingredients.length; i++ )
            ans += props.ingredients[i].price;

        return ans;
    }

    const timeSince = ( date: string ) => {
        const dateOfOrder = new Date( date );
        const dateOfToday = new Date();

        const order = { year: dateOfOrder.getFullYear(), month: dateOfOrder.getMonth(), day: dateOfOrder.getDate() };
        const today = { year: dateOfToday.getFullYear(), month: dateOfToday.getMonth(), day: dateOfToday.getDate() };

        //упрощенный подсчет дней
        //заменить на секунды с обнулением до полуночи
        const daysAgo = (today.year - order.year)*365 + (today.month - order.month)*30 + ( today.day - order.day );

        let formattedTime;

        if ( dateOfOrder.getMinutes() < 10 )
        formattedTime = `${ dateOfOrder.getHours() }:0${ dateOfOrder.getMinutes() }`;
        else formattedTime = `${ dateOfOrder.getHours() }:${ dateOfOrder.getMinutes() }`;

        let ans = '';

        if ( daysAgo >= 0 && daysAgo < 1 ) {
            ans = `Сегодня, `;
        }
        if ( daysAgo >= 1 && daysAgo < 2 ) {
            ans = 'Вчера, ';
        }
        if ( daysAgo >= 2 && daysAgo < 5 ) {
            ans = `${ daysAgo } дня назад, `;
        }
        if ( daysAgo >= 5 ) {
            ans = `${ daysAgo } дней назад, `;
        }

        return `${ ans }${ formattedTime }`;
    }

    return (
        <div className={ `${ styles.order_card } p-6` }>
            <div className={ `mb-6 ${ styles.space_between }` }>
                <span className="text text_type_digits-default">#{ props.orderNumber }</span>
                <span className="text text_type_main-default text_color_inactive">{ timeSince( props.orderDate ) }</span>
            </div>
            <p className="text text_type_main-medium mb-6">
                { props.burgerName }
            </p>
            <div className={ `${ styles.wrapper_feed }` }>
                <div>
                    {  
                        toshowIngredients.map( (elem, index) => (
                                <div 
                                    key={ `${ props.orderNumber }_${ index }` } 
                                    style={{ zIndex: 6-index, left: -16*index, backgroundImage: `url(${ elem.image }` }} 
                                    className={ `${ styles.ingredient_icon }` } 
                                />
                        ) )
                    }

                    {
                        otherIngredients[0] !== undefined && (
                            otherIngredients.length > 1 ?
                                ( 
                                    <div 
                                        style={{ zIndex: 1, left: -16*5, backgroundImage: `url(${ otherIngredients[0]?.image })` }} 
                                        className={ `${ styles.ingredient_icon }` }>
                                        <div className={ styles.icon_overlay }><span className='text text_type_digits-default'>{ '+' + (otherIngredients.length-1) }</span></div>
                                    </div> 
                                ) : 
                                ( 
                                    <div 
                                        style={{ zIndex: 1, left: -16*5, backgroundImage: `url(${ otherIngredients[0]?.image })` }} 
                                        className={ `${ styles.ingredient_icon }` 
                                    } />
                                )
                        )
                    }
                    
                </div>
                <p className={ `text text_type_main-medium ${ styles.text_icon_align }` }><span className='text text_type_digits-default mr-2'>{ getPrice() }</span><CurrencyIcon type="primary" /></p>
            </div>
        </div>
    )
}

export default FeedCard;