import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import styles from './app.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
//import Modal from '../Modal/Modal';

import {API_URL} from '../../utils/api';

function App() {

	const [burgersDataFromAPI, setData] = React.useState([]);

	React.useEffect( () => {
        try {
            fetch( API_URL )
            .then( response => response.json() )
            .then( data => setData(data.data) )
        } catch ( error ) {
            console.log('Ошибка подключения к API: ', error);
        }
    }, [] );

	return (
		<>
			<div className="App">
				<AppHeader />
				<div className={ styles.main_content }>
					<div className={ styles.main_content_item + ' ' + styles.left_column_item }><BurgerIngredients data={burgersDataFromAPI} /></div>
					<div className={ styles.main_content_item }><BurgerConstructor /></div>
				</div>
			</div>
			
		</>
	);
}

export default App;