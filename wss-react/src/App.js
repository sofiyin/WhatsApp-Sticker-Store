import React from 'react';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Create } from './components/Create';
import { 
	BrowserRouter as Router, 
	Routes, 
	Route } from 'react-router-dom';
import './css/App.css';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Login/>} />
					<Route path='/home' element={<Home />} />
					<Route path='/create' element={<Create />} />
					<Route path='*' element={<h1> Page not found :C </h1>} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
