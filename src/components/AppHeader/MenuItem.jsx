import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
//import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './appheader.module.css'; 

function MenuItem( props ) {
    return (
        <NavLink
            exact to={{ pathname: props.pathname }}
            className={ `pr-5 pl-5 text text_type_main-default ${styles.navlink} ${styles.nav_item_inactive}` }
            activeClassName={styles.nav_item_active}
        > 
            <div className={ styles.item }>
                <span>
                    { props.children }
                </span>
                <span className="ml-2">{ props.text }</span>
            </div>
        </NavLink>
    );
  }

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    children: PropTypes.element
};

export default MenuItem;

/*
<Button extraClass='pr-5 pl-5' htmlType="button" type="secondary" size="medium">
    <div className={ styles.item }>
        <span>
            { props.children }
        </span>
        <span className="ml-2">{ props.text }</span>
    </div>
</Button>
*/