import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import styles from './app.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
//import Modal from '../Modal/Modal';

//import {API_URL} from '../../utils/api';

function App() {

	//const [burgersDataFromAPI, setData] = React.useState([]);

	/*
	React.useEffect( () => {

		fetch( API_URL )
        	.then( res => {
				if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
			} ).then( data => setData(data.data) )
			.catch(( error ) => {
				console.log('Ошибка подключения к API: ', error);
			})
    }, [] );
	*/

	return (
		<div className="App">
			<AppHeader />
			<main className={ styles.main_content }>
				<div className={ styles.main_content_item + ' ' + styles.left_column_item }><BurgerIngredients /></div>
				<div className={ styles.main_content_item }><BurgerConstructor /></div>
			</main>
		</div>
	);
}

export default App;