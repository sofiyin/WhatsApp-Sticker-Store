import React, { useState } from 'react';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { NavBar } from './components/NavBar';
import { Create } from './components/Create';
import { 
	BrowserRouter as Router, 
	Routes, 
	Route } from 'react-router-dom';
import './css/App.css';

function App() {
	const [showNavBar, setShowNavBar] = useState(true);

	const mostrarNavBar = () => {
		setShowNavBar(false);
	}

	return (
		<>
			<Router>
				{ showNavBar && <NavBar />}
				<Routes>
					<Route path='/' element={<Login mostrarNavBar={mostrarNavBar}/>} />
					<Route path='/home' element={<Home />} />
					<Route path='/create' element={<Create />} />
					<Route path='*' element={<h1> Page not found :C </h1>} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
