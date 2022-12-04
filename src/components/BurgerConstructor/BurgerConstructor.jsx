import React from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderDetails from './OrderDetails';
import BurgerConstructorItemWrapper from './BurgerConstructorItemWrapper';
import styles from './burgerconstructor.module.css'; 

import Modal from '../Modal/Modal';

import { burgersData } from '../../utils/data';

function BurgerConstructor() {
    const img = burgersData[0].image;
    const testData = [ burgersData[3], burgersData[1], burgersData[7] ];

    const [ visible, setVisibility ] = React.useState( false );

	const handleOpenModal = () => {
		setVisibility( true );
	}

	const handleCloseModal = (e) => {
		e.preventDefault();
        setVisibility( false );
	}

    return (
        <>
            <div className={styles.constructor_wrapper + ' mt-25 pl-4 pr-4'}>
                <div className='pl-8'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={img}
                    />
                </div>
                
                { testData.map((elem) => <BurgerConstructorItemWrapper key={"constructor." + elem._id} image={elem.image} price={elem.price} name={elem.name} /> )}

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
        </>
    );
}
  
export default BurgerConstructor;