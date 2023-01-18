import React, { FC, SyntheticEvent } from 'react';

import styles from './modal.module.css'; 

interface IModalOverlayProps {
    onClick: Function;
    children?: React.ReactNode | JSX.Element | string;
}
//const DropTarget: FC<IDropTargetProps> = ( props ) => {
const ModalOverlay: FC<IModalOverlayProps> = ( props ) => {

    const handleHideOverlay = ( e: SyntheticEvent ) => {
        if ( e.target === e.currentTarget )
            props.onClick( e );
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

export default ModalOverlay;