import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './appheader.module.css'; 

function MenuItem( props ) {
    return (
        <NavLink
            exact={ props?.exact } to={{ pathname: props.pathname }}
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
    exact: PropTypes.bool,
    children: PropTypes.element
};

export default MenuItem;