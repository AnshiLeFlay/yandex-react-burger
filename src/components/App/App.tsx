import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginPage, RegisterPage, ForgotPage, ResetPage } from '../../pages/';
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
			<Router>
				<Switch>
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route path="/register">
						<RegisterPage />
					</Route>
					<Route path="/forgot-password">
						<ForgotPage />
					</Route>
					<Route path="/reset-password">
						<ResetPage />
					</Route>
					<Route path='/'>
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
					</Route>
				</Switch>
			</Router>
			</main>
		</div>
	);
}

export default App;

/*

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

*/