import React from "react";

import styles from './modal.module.css'; 

function ModalOverlay(  ) {
    //const [ show, setShow ] = React.useState( false );

    return (
        <div className={ styles.modal_overlay } />
    )
}

export default ModalOverlay;