import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_QUERY } from '../graphql/schemas/login.query';
import { AuthInput } from './authInput';
import { SubmitButton } from './submitButton';
import { Validation } from '../utils/validation';

export function LoginForm() {
	const [email, setEmail] = useState('');
	const [emailValErr, setEmailValErr] = useState('');
	const [password, setPassword] = useState('');
	const [passwordValErr, setPasswordValErr] = useState('');
	const [login] = useMutation(LOGIN_QUERY, {
		variables: {
			loginInfo: {
				email,
				password,
			},
		},
	});

	const handleLogin = async (e: React.ChangeEvent<any>) => {
		e.preventDefault();
		if (
			!Validation.isNotEmpty(email) &&
			!Validation.isNotEmpty(password) &&
			emailValErr === '' &&
			passwordValErr === ''
		) {
			const data = await login();
			// console.log(data.data.loginUser.user);
			localStorage.setItem(
				'user',
				JSON.stringify({
					access: data.data.loginUser.accessToken,
					refresh: data.data.loginUser.refreshToken,
				}),
			);
			setEmail('');
			setPassword('');
		}
	};

	return (
		<form onSubmit={handleLogin} className='auth-form'>
			<AuthInput
				type='email'
				value={email}
				setValue={setEmail}
				errors={emailValErr}
				setErrors={setEmailValErr}
			/>
			<AuthInput
				type='password'
				value={password}
				setValue={setPassword}
				errors={passwordValErr}
				setErrors={setPasswordValErr}
			/>
			<SubmitButton cls='auth-button' />
		</form>
	);
}
