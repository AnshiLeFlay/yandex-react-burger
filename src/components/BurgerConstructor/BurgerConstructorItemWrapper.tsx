import React, { FC } from 'react';
import { useDispatch } from '../../services/hooks';
import { DELETE_INGREDIENTS_CONSTRUCTOR } from '../../services/constants/ingredients';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burgerconstructor.module.css'; 

interface IBurgerConstructorItemWrapperProps {
    name: string;
    price: number;
    image: string;
    type?: string | undefined;
    position?: number;
    pos?: "top" | "bottom" | undefined ;
}

const BurgerConstructorItemWrapper: FC<IBurgerConstructorItemWrapperProps> = ( props ) => {
    const itemType = props.type;

    const dispatch = useDispatch();

    const handleClose = () => {
        if ( itemType === 'bun' )
            dispatch({ type: DELETE_INGREDIENTS_CONSTRUCTOR, itemDelete: props.pos });
        else dispatch({ type: DELETE_INGREDIENTS_CONSTRUCTOR, itemDelete: props.position });
    }

    return (
        <>
            {
                itemType === 'bun' ? 
                    <div className='pl-8'>
                        <ConstructorElement
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
                            handleClose={ handleClose }
                        />
                    </div>
                
            }  
        </>      
    );
}
  
export default BurgerConstructorItemWrapper;