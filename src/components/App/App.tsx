import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import styles from './app.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {
	return (
		<div className="App">
			<AppHeader />
			<div className={ styles.main_content }>
				<div className={ styles.main_content_item + ' ' + styles.left_column_item }><BurgerIngredients /></div>
				<div className={ styles.main_content_item }><BurgerConstructor /></div>
			</div>
		</div>
	);
}

export default App;
