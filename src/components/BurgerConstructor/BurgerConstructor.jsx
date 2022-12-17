import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from './OrderDetails';
import BurgerConstructorItemWrapper from './BurgerConstructorItemWrapper';
import styles from './burgerconstructor.module.css'; 

import Modal from '../Modal/Modal';
import { getOrderNumber } from '../../services/actions';
import DropTarget from '../DragAndDrop/DropTarget';
import DraggableItem from '../DragAndDrop/DraggableItem';

function BurgerConstructor() {
    const data = useSelector( store => store.data.ingredients );
    const burgerBun = useSelector( store => store.ingredients.burgerIngredients.bun );
    const burgerContent = useSelector( store => store.ingredients.burgerIngredients.consist );

    const [ constructor, setConstructor ] = React.useState( [] );
    const [ bunTopBot, setBuns ] = React.useState( [] );
    const [ visible, setVisibility ] = React.useState( false );
    const [ orderCost, setOrderCost ] = React.useState( 0 );

    const dispatch = useDispatch();

    useEffect( () => {
        const orderArr =  [ burgerBun, burgerBun, ...burgerContent ];
        let cost = 0;

        orderArr.forEach( ( elem ) => {
            cost += data.find( item => item._id === elem ).price;
        });

        setOrderCost( cost );

    }, [burgerBun, burgerContent, data]);
    
    useEffect( () => {
        let buf = [];
        let con = {};
        burgerContent.forEach((elem) => {
            con = data.find( item => item._id === elem );
            if ( con !== undefined ) {
                buf.push( con );
            } 
        });

        setConstructor( buf );

    }, [ burgerContent, data ] );

    useEffect( () => {
        let buf = {};
        buf = data.find( item => item._id === burgerBun );

        if ( buf !== undefined ) setBuns( buf );

    }, [burgerBun, data]);
    
	const handleOpenModal = () => {
        const orderArr =  { 
            "ingredients": [ burgerBun, ...burgerContent ] 
        };

        dispatch( getOrderNumber( orderArr ) );
		setVisibility( true );
	}

	const handleCloseModal = (e) => {
		e.preventDefault();
        setVisibility( false );
	}

    return (
        <DropTarget>
            <div className={styles.constructor_wrapper + ' mt-25 pl-4 pr-4'}>
                
                {
                    bunTopBot.image !== undefined &&
                    <BurgerConstructorItemWrapper type="bun" pos="top" key={"top." + bunTopBot._id} image={bunTopBot.image} price={bunTopBot.price} name={bunTopBot.name + ' (верх)'} />
                }
                
                { constructor.map((elem, index) => 
                    <DraggableItem key={'key_constructor_' + index + '.' + elem._id} data={{ id: elem._id, content: '', board: 'constructor', index: index}}>
                        <BurgerConstructorItemWrapper key={'constructor.' + index + '.' + elem._id} pos={ index } image={elem.image} price={elem.price} name={elem.name} /> 
                    </DraggableItem>
                )}

                {
                    bunTopBot.image !== undefined &&
                    <BurgerConstructorItemWrapper type="bun" pos="bottom" key={"bot." + bunTopBot._id} image={bunTopBot.image} price={bunTopBot.price} name={bunTopBot.name + ' (низ)'} />
                }

                <div className={styles.constructor_buttons_wrapper + ' mt-10'}>
                    <p className="text text_type_digits-medium mr-10"><span>{ orderCost }</span>&nbsp;<CurrencyIcon type="primary" /></p>
                    <div style={{overflow: 'hidden'}}>
                        <Button onClick={handleOpenModal} htmlType="button">Оформить заказ</Button>
                        {visible && 
                            <Modal onClose={ handleCloseModal }>
                                <OrderDetails />
                            </Modal>
                        }
                    </div>
                </div>
            </div>
        </DropTarget>
    );
}

export default BurgerConstructor;