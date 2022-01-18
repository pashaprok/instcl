import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/login.page';
import { AllUsersPage } from './pages/allUsers.page';
import { RegisterPage } from './pages/register.page';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/users' element={<AllUsersPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
