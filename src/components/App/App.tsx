import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { LoginPage, RegisterPage, ForgotPage, ResetPage, ProfilePage, IngredientsPage, FeedPage } from '../../pages/';
import styles from './app.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {

	return (
		<div className="App">
			<Router>
				<AppHeader />

				<main className={ styles.main_content }>
			
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
						<Route path="/feed">
							<FeedPage />
						</Route>
						<Route path="/feed/:id">
							<FeedPage />
						</Route>
						<ProtectedRoute path="/profile/orders/:id">
							<ProfilePage />
						</ProtectedRoute>
						<ProtectedRoute path="/profile/orders">
							<ProfilePage />
						</ProtectedRoute>
						<ProtectedRoute path="/profile">
							<ProfilePage />
						</ProtectedRoute>
						<Route path="/ingredients/:id">
							<IngredientsPage />
						</Route>
						<Route path='/'>
							<div className={ `${ styles.main_content_item } ${ styles.left_column_item }` }>
								<DndProvider backend={ HTML5Backend }>
									<BurgerIngredients />
								</DndProvider>
							</div>
							<div className={ styles.main_content_item }>
								<DndProvider backend={ HTML5Backend }>
									<BurgerConstructor />
								</DndProvider>
							</div>
						</Route>
					</Switch>
			
				</main>
			</Router>
		</div>
	);
}

export default App;