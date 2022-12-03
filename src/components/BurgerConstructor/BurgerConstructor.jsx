import React from 'react';
import { ConstructorElement, CurrencyIcon, CheckMarkIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

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
		if (e.target === e.currentTarget) {
			setVisibility( false );
		}
	}

    const escFunction = (e) => {
        if (e.key === "Escape") {
            setVisibility( false );
        }
    }

    React.useEffect( () => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        }
    });

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
                                <p className="text text_type_digits-large mt-4 mb-8 ml-25 mr-25">034536</p>
                                <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
                                <span className={styles.check_icon}><CheckMarkIcon type="primary" /></span>
                                <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
                                <p className="text text_type_main-small text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
                            </Modal>
                        }
                    </div>
                </div>
            </div>
        </>
    );
  }
  
  export default BurgerConstructor;