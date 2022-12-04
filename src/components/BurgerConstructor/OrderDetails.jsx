import React from "react";

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burgerconstructor.module.css'; 

function OrderDetails() {

    return (
        <>
            <p className="text text_type_digits-large mt-4 mb-8 ml-25 mr-25">034536</p>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <span className={styles.check_icon}><CheckMarkIcon type="primary" /></span>
            <p className="text text_type_main-small mt-15 mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive mb-30">Дождитесь готовности на орбитальной станции</p>
        </>
    )
}

export default OrderDetails;