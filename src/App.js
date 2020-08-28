import React from 'react';
import './App.css';
import AllCurrencies from './AllCurrencies';
import Comparative from './Comparative';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
  
export default function App() {
	return (
		<Router>
			<div>
				<nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#00CCFF" }}>
					<div className="navbar-nav">
						<NavLink exact activeClassName="active" className="nav-item nav-link font-big" to="/">All Currencies</NavLink>
						<NavLink activeClassName="active" className="nav-item nav-link font-big" to="/comparative">Comparative</NavLink>
					</div>
				</nav>
				<Switch>
					<Route path="/comparative">
						<Comparative />
					</Route>
					<Route path="/">
						<AllCurrencies />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}