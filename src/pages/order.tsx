import React from 'react';
import { useHistory } from 'react-router-dom';

//import styles from './pages.module.css';

export function OrderPage() {
    const history = useHistory();

    return (
        <div>
            { history?.location?.pathname?.split('/')[2] }
        </div>
    );
} 