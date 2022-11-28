import React from 'react';
//import logo from './logo.svg';
import './App.css';
import styles from './app.module.css';

import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';

function App() {
	return (
		<div className="App">
			<AppHeader />
			<div className={ styles.main_content }>
				<div style={{ display: 'flex', flexDirection: 'column' }} className={ styles.main_content_item }><BurgerIngredients /></div>
				<div className={ styles.main_content_item }><BurgerConstructor /></div>
			</div>
		</div>
	);
}

export default App;
