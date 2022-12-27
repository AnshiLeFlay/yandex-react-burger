import React from 'react';
import MenuItem from './MenuItem';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './appheader.module.css'; 

function AppHeader() {
    return (
        <header className={ `mt-5 ml-10 mr-10 ${styles.header}` }>
            <nav className={ styles.nav + ' mt-4 mb-4' }>
                <div>
                    <MenuItem text={'Конструктор'}><BurgerIcon type="primary" /></MenuItem>
                    <MenuItem text={'Лента заказов'}><ListIcon type="primary" /></MenuItem>
                </div>
                <div className={ styles.header_logo }>
                    <Button htmlType="button" type="secondary" size="medium">
                        <span className={styles.item}><Logo /></span>
                    </Button>
                </div>
                <div>
                    <MenuItem text={'Личный кабинет'}><ProfileIcon type="primary" /></MenuItem>
                </div>
            </nav>
        </header>
    );
  }
  
  export default AppHeader;