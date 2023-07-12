import React, { useState, useEffect } from 'react'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Create } from './components/Create'
import { 
	BrowserRouter as Router, 
	Routes, 
	Route,
	Navigate } from 'react-router-dom'
import './css/App.css'

function App() {

	const [activeUser, setactiveUser] = useState(0)	
	const userId = sessionStorage.getItem('userId_local')

	useEffect(() => {
		if (userId && userId !== 'undefined' && userId !== 'null'){
			setactiveUser(userId)
		}
	}, [userId])

	return (
		<>
			<Router>
				<Routes>
					{
						activeUser === 0 ?
							<Route path='/' element={<Login setactiveUser={setactiveUser}/>} />
						:
							<Route path='/' element={<Navigate to={`/home/${userId}`} />} />
					}

					<Route path='/home/:id' element={<Home />} />	
					<Route path='/create/:id' element={<Create />} />
					<Route path='*' element={<h1> Page not found :C </h1>} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
