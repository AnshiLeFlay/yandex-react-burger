import React from 'react';
import PropTypes from 'prop-types';

import styles from './modal.module.css'; 

function ModalOverlay( props ) {

    const handleHideOverlay = (e) => {
        if (e.target === e.currentTarget)
            props.onClick(e);
    }

    return (
        <>
            <div id="overlay" className={ styles.modal } >
                { props.children }
            </div>
            <div onClick={ handleHideOverlay } className={ styles.modal_overlay } />
        </>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default ModalOverlay;