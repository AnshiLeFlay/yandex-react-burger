import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './ModalOverlay';
import styles from './modal.module.css'; 

const modalRoot = document.getElementById("burger-modals")!;

interface IModalProps {
    children?: React.ReactNode | JSX.Element | string;
    onClose: any | Function;
    header?: string;
}

const Modal: FC<IModalProps> = ( props ) => {
    const { children, onClose, header } = props;

    const escFunction = ( e: KeyboardEvent ) => {
        if ( e.key === "Escape" ) {
            onClose( e );
        }
    }

    React.useEffect( () => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        }
    });

    return ReactDOM.createPortal(
        <ModalOverlay onClick={ onClose } >
            <div className={styles.modal_body}>
                <p className={ styles.modal_header + ' mt-10 ml-10 mr-10 text text_type_main-medium'}>
                    <span>{header}</span><CloseIcon onClick={ onClose } type="primary" />
                </p>
                <div className={ styles.modal_children }>
                    {children}
                </div>
            </div>
        </ModalOverlay>
        , modalRoot
    );
  
}
  
export default Modal;