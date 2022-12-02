import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './appheader.module.css'; 

function MenuItem( props ) {
    return (
        <Button extraClass='pr-5 pl-5' htmlType="button" type="secondary" size="medium">
            <div className={ styles.item }>
                <span>
                    { props.children }
                </span>
                <span className="ml-2">{ props.text }</span>
            </div>
        </Button>
    );
  }

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.element
};

export default MenuItem;