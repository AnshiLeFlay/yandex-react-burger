import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from './OrderDetails';
import BurgerConstructorItemWrapper from './BurgerConstructorItemWrapper';
import styles from './burgerconstructor.module.css'; 

import Modal from '../Modal/Modal';
import { getOrderNumber, ADD_INGREDIENTS_CONSTRUCTOR } from '../../services/actions';
import DropTarget from '../DragAndDrop/DropTarget';
import DraggableItem from '../DragAndDrop/DraggableItem';

function BurgerConstructor() {
    const data = useSelector( store => store.data.ingredients );
    const burgerBun = useSelector( store => store.ingredients.burgerIngredients.bun );
    const burgerContent = useSelector( store => store.ingredients.burgerIngredients.consist );

    const [ constructor, setConstructor ] = React.useState( [] );
    const [ bunTopBot, setBuns ] = React.useState( [] );
    const [ visible, setVisibility ] = React.useState( false );

    const dispatch = useDispatch();
    const testDATA = { 
        "ingredients": ["60d3b41abdacab0026a733c7","60d3b41abdacab0026a733cf"]
    };
    
    useEffect( () => {
        let buf = [];
        let con = {};
        burgerContent.forEach((elem) => {
            con = data.find( item => item._id === elem );
            if ( con !== undefined ) {
                buf.push( con );
            } 
        });

        console.log( burgerContent );

        setConstructor( buf );

    }, [ burgerContent, data ] );

    useEffect( () => {
        let buf = {};
        buf = data.find( item => item._id === burgerBun );

        if ( buf !== undefined ) setBuns( buf );

    }, [burgerBun, data]);
    
	const handleOpenModal = () => {
        //dispatch( { type: ADD_INGREDIENTS_CONSTRUCTOR, item: '60d3b41abdacab0026a733c7' } );
        dispatch( getOrderNumber( testDATA ) );
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
                
                { constructor.map((elem) => <BurgerConstructorItemWrapper key={"constructor." + elem._id} image={elem.image} price={elem.price} name={elem.name} /> )}

                {
                    bunTopBot.image !== undefined &&
                    <BurgerConstructorItemWrapper type="bun" pos="bottom" key={"bot." + bunTopBot._id} image={bunTopBot.image} price={bunTopBot.price} name={bunTopBot.name + ' (низ)'} />
                }

                <div className={styles.constructor_buttons_wrapper + ' mt-10'}>
                    <p className="text text_type_digits-medium mr-10"><span>610</span>&nbsp;<CurrencyIcon type="primary" /></p>
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
// <DraggableItem key={'2123123123'} data={{ id: '1231231', content: 'hey'}}>
export default BurgerConstructor;