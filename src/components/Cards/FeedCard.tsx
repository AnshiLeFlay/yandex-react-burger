import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './cards.module.css'; 

interface IFeedCardProps {
    orderNumber: number;
    orderDate: string;
    burgerName: string;
    ingredients: Array<{
        image: string;
    }>
    price: number;
}

const FeedCard: FC<IFeedCardProps> = ( props ) => {

    const toshowIngredients = props.ingredients.slice(0, 5);
    const otherIngredients = props.ingredients.slice(5);

    return (
        <div className={ `${ styles.order_card } p-6` }>
            <div className={ `mb-6 ${ styles.space_between }` }>
                <span className="text text_type_digits-default">#{ props.orderNumber }</span>
                <span className="text text_type_main-default text_color_inactive">Сегодня, HH:MM</span>
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
                <p className={ `text text_type_main-medium ${ styles.text_icon_align }` }><span className='text text_type_digits-default mr-2'>{ props.price }</span><CurrencyIcon type="primary" /></p>
            </div>
        </div>
    )
}

export default FeedCard;