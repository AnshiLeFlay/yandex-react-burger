import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
			<main className={ styles.main_content }>
				<div className={ styles.main_content_item + ' ' + styles.left_column_item }>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
					</DndProvider>
				</div>
				<div className={ styles.main_content_item }>
					<DndProvider backend={HTML5Backend}>
						<BurgerConstructor />
					</DndProvider>
				</div>
			</main>
		</div>
	);
}

export default App;