import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth-pages.css';
import { HeadingOne } from '../elements/layout/titles';
import { RegisterForm } from '../elements/forms/RegisterForm';
import { useStateFunctionBool } from '../types/common.types';
import { Header } from '../elements/layout/headers';
import { ShowAuthPages } from '../helpers/showAuthPages';

const registerPage = (setRedirect: useStateFunctionBool) => (
	<>
		<Header>
			<HeadingOne text='Create your account' cls='auth__title' />
		</Header>
		<div className='container'>
			<div className='auth-content'>
				<RegisterForm setRedirect={setRedirect} />
				<div className='auth-question'>
					already registered?&nbsp;
					<Link to='/' className='blue-link'>
						sign in
					</Link>
				</div>
			</div>
		</div>
	</>
);

export function RegisterPage() {
	return ShowAuthPages(registerPage);
}
