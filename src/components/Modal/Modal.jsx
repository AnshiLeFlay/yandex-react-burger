import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from './ModalOverlay';

import styles from './modal.module.css'; 

const modalRoot = document.getElementById("burger-modals");

function Modal( props ) {
    const { children, onClose, header } = props;

    return ReactDOM.createPortal(
        <>
        
            <div onClick={ onClose } className={styles.modal}>
                <div className={styles.modal_body}>
                    <p className={ styles.modal_header + ' mt-10 ml-10 mr-10 text text_type_main-medium'}>
                        <span>{header}</span><CloseIcon onClick={ onClose } type="primary" />
                    </p>
                    <div className={ styles.modal_children }>
                        {children}
                    </div>
                </div>
            </div>
            <ModalOverlay />
        </>,
        modalRoot
      );
  
  }
  
  export default Modal;