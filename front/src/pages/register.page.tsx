import React from 'react';
import '../styles/auth-pages.css';
import { HeadingOne } from '../elements/headingOne';
import { RegisterForm } from '../elements/RegisterForm';

export function RegisterPage() {
	return (
		<div className='container'>
			<div className='auth-section'>
				<HeadingOne text='Create your account' cls='auth__title' />
				<RegisterForm />
			</div>
		</div>
	);
}
