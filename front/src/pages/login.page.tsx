import React from 'react';
import '../styles/auth-pages.css';
import { Link } from 'react-router-dom';
import { HeadingOne } from '../elements/layout/titles';
import { LoginForm } from '../elements/forms/LoginForm';
import { useStateFunctionBool } from '../types/common.types';
import { Header } from '../elements/layout/headers';
import { ShowAuthPages } from '../helpers/showAuthPages';

const loginPage = (setRedirect: useStateFunctionBool) => (
	<>
		<Header>
			<HeadingOne text='Sign in to your account' cls='auth__title' />
		</Header>
		<div className='container'>
			<div className='auth-content'>
				<LoginForm setRedirect={setRedirect} />
				<div className='auth-question'>
					don&apos;t have an account?&nbsp;
					<Link to='/register' className='blue-link'>
						sign up
					</Link>
				</div>
			</div>
		</div>
	</>
);

export function LoginPage() {
	return ShowAuthPages(loginPage);
}
