import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Switch, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { LoginPage, RegisterPage, ForgotPage, ResetPage, ProfilePage, IngredientsPage, FeedPage, OrderPage } from '../../pages';
import styles from './app.module.css';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getItems } from '../../services/actions';
import { useDispatch } from '../../services/hooks';
import Modal from '../Modal/Modal';

function App( ) {
	let location:any = useLocation();
	const background = location.state && location.state.background;


	const dispatch = useDispatch();

	React.useEffect( () => {
		dispatch( getItems() );
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="App">
			
				<AppHeader />

				<main className={ styles.main_content }>
			
					<Switch location={background || location}>
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
						<Route path="/feed/:id">
							<OrderPage />
						</Route>
						<Route path="/feed">
							<FeedPage />
						</Route>
						<ProtectedRoute path="/profile/orders/:id">
							<OrderPage />
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
					{background && <Route path="/feed/:id" render={() => ( <Modal><OrderPage modal /></Modal> )} />}

					{background && <Route path="/profile/order/:id" render={() => ( <Modal><OrderPage modal /></Modal> )} />}

					{background && <Route path="/ingredients/:id" render={() => ( <Modal><IngredientsPage modal /></Modal> )} />}
				</main>
			
		</div>
	);
}

export default App;