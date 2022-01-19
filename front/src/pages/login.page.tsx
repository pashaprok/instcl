import React, { useEffect, useState } from 'react';
import '../styles/auth-pages.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { HeadingOne } from '../elements/layout/titles';
import { LoginForm } from '../elements/forms/LoginForm';
import { useStateFunctionBool } from '../types/common.types';
import { redirectToAccount } from '../elements/redirects';
import { Header } from '../elements/layout/headers';
import { CURRENT_USER } from '../graphql/schemas/currentUser.query';

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
					<Link
						to='/register'
						className='blue-link'
					>
						sign up
					</Link>
				</div>
			</div>
		</div>
	</>
);

export function LoginPage() {
	const [redirect, setRedirect] = useState(false);
	const [content, setContent] = useState(loginPage(setRedirect));
	const { data } = useQuery(CURRENT_USER);

	useEffect(() => {
		if (redirect || data) {
			setContent(redirectToAccount);
		}
	}, [redirect, data]);

	return content;
}
