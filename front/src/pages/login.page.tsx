import React from 'react';
import '../styles/auth-pages.css';
import { HeadingOne } from '../elements/headingOne';
import { LoginForm } from '../elements/LoginForm';

export function LoginPage() {
	return (
		<div className='container'>
			<div className='auth-section'>
				<HeadingOne text='Sign in to your account' cls='auth__title' />
				<LoginForm />
			</div>
		</div>
	);
}
