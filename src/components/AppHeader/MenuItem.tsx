import React, { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './appheader.module.css'; 

interface IMenuItemProps {
    text: string;
    pathname: string;
    exact?: boolean;
    children?: ReactNode | JSX.Element | string;
}

const MenuItem: FC<IMenuItemProps> = ( props ) => {
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

export default MenuItem;