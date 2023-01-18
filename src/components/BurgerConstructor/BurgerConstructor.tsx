import React, { SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from './OrderDetails';
import BurgerConstructorItemWrapper from './BurgerConstructorItemWrapper';
import styles from './burgerconstructor.module.css'; 

import Modal from '../Modal/Modal';
import { getOrderNumber, DELETE_ORDER_NUMBER } from '../../services/actions';
import DropTarget from '../DragAndDrop/DropTarget';
import DraggableItem from '../DragAndDrop/DraggableItem';
import { getCookie } from '../../utils/cookie';
import { useHistory } from 'react-router-dom';

interface IBurgerElem {
    image?: string; 
    _id?: string; 
    price?: number; 
    name?: string;
};

function BurgerConstructor() {
    const data: any = useSelector<any>( store => store.data.ingredients );
    const burgerBun: any = useSelector<any>( store => store.ingredients.burgerIngredients.bun );
    const burgerContent: any = useSelector<any>( store => store.ingredients.burgerIngredients.consist );

    const [ constructor, setConstructor ] = React.useState<Array<[]>>( [] );
    const [ bunTopBot, setBuns ] = React.useState<IBurgerElem>( );
    const [ visible, setVisibility ] = React.useState<boolean>( false );
    const [ orderCost, setOrderCost ] = React.useState<number>( 0 );

    const history = useHistory();

    const dispatch: any = useDispatch();

    useEffect( () => {
        if ( data[0] !== undefined ) {
            const orderArr: Array<string> = [ burgerBun, burgerBun, ...burgerContent ];
            let cost = 0;

            orderArr.forEach( ( elem ) => {
                cost += data.find( ( item: IBurgerElem ) => item._id === elem ).price;
            });

            setOrderCost( cost );
        }

    }, [ burgerBun, burgerContent, data ] );
    
    useEffect( () => {
        let buf: Array<[]> = [];
        let con: any = {};
        burgerContent.forEach( ( elem: string ) => {
            con = data.find( (item: IBurgerElem ) => item._id === elem );
            if ( con !== undefined ) {
                buf.push( con );
            } 
        } );

        setConstructor( buf );

    }, [ burgerContent, data ] );

    useEffect( () => {
        let buf: IBurgerElem = { };
        buf = data.find( ( item: IBurgerElem ) => item._id === burgerBun );

        if ( buf !== undefined ) setBuns( buf );

    }, [ burgerBun, data ] );
    
	const handleOpenModal = () => {

        if ( getCookie( 'refreshToken' ) === undefined ) { 
            history.push('/login');
            return;
        }

        const orderArr =  { 
            "ingredients": [ burgerBun, ...burgerContent ] 
        };

        dispatch( { type: DELETE_ORDER_NUMBER } );
        dispatch( getOrderNumber( orderArr ) );
		setVisibility( true );
	}

	const handleCloseModal = ( e: SyntheticEvent ) => {
		e.preventDefault();
        setVisibility( false );
	}

    return (
        <DropTarget>
            <div className={ `mt-25 pl-4 pr-4 ${ styles.constructor_wrapper }` }>
                
                {
                    bunTopBot?.image !== undefined &&
                    <BurgerConstructorItemWrapper type="bun" pos="top" key={ "top." + bunTopBot?._id } image={ bunTopBot?.image! } price={ bunTopBot?.price! } name={ bunTopBot?.name + ' (верх)' } />
                }
                
                { constructor.map( ( elem: any, index: number ) => 
                    <DraggableItem key={ 'key_constructor_' + index + '.' + elem._id } data={ { id: elem._id, content: '', board: 'constructor', index: index } }>
                        <BurgerConstructorItemWrapper key={ 'constructor.' + index + '.' + elem._id } position={ index } image={ elem.image } price={ elem.price } name={ elem.name } /> 
                    </DraggableItem>
                )}

                {
                    bunTopBot?.image !== undefined &&
                    <BurgerConstructorItemWrapper type="bun" pos="bottom" key={ "bot." + bunTopBot._id } image={ bunTopBot.image } price={ bunTopBot?.price! } name={ bunTopBot?.name + ' (низ)' } />
                }

                <div className={ styles.constructor_buttons_wrapper + ' mt-10' }>
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