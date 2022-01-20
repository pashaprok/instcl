import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import '../styles/auth-pages.css';
import { HeadingOne } from '../elements/layout/titles';
import { RegisterForm } from '../elements/forms/RegisterForm';
import { useStateFunctionBool } from '../types/common.types';
import { redirectToAccount } from '../elements/redirects';
import { Header } from '../elements/layout/headers';
import { CURRENT_USER } from '../graphql/schemas/currentUser.query';

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
	const [redirect, setRedirect] = useState(false);
	const [content, setContent] = useState(registerPage(setRedirect));
	const { data } = useQuery(CURRENT_USER);

	useEffect(() => {
		if (redirect || data) {
			setContent(redirectToAccount);
		}
	}, [redirect, data]);

	return content;
}
