import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burgerconstructor.module.css'; 

function BurgerConstructorItemWrapper ( props ) {
    const itemType = props.type;

    return (
        <>
            {
                itemType === 'bun' ? 
                    <div className='pl-8'>
                        <ConstructorElement
                            className='ml-8'
                            type={ props.pos }
                            isLocked={ true }
                            text={ props.name }
                            price={ props.price }
                            thumbnail={ props.image }
                        />
                    </div>
                : 
                    <div className={ styles.constructor_item_wrapper } >
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={ props.name }
                            price={ props.price }
                            thumbnail={ props.image }
                        />
                    </div>
                
            }  
        </>      
    );
}

/*
<div className={ styles.constructor_item_wrapper } >
    <DragIcon type="primary" />
    <ConstructorElement
        text={props.name}
        price={props.price}
        thumbnail={props.image}
    />
</div>
<div className='pl-8'>
    <ConstructorElement
        className='ml-8'
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={img}
    />
</div>
*/

BurgerConstructorItemWrapper.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    type: PropTypes.string,
};
  
export default BurgerConstructorItemWrapper;