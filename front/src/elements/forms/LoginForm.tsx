import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_QUERY } from '../../graphql/schemas/login.query';
import { AuthInput } from './authInput';
import { SubmitButton } from '../buttons/submitButton';
import { Validation } from '../../utils/validation';
import { setLSToken } from '../../utils/token.helpers';
import { AuthFormPropsI } from '../../types/auth.types';

export function LoginForm(props: AuthFormPropsI) {
	const { setRedirect } = props;
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
			const res = await login();
			if (res.data) {
				setLSToken(
					res.data.loginUser.accessToken,
					res.data.loginUser.refreshToken,
				);
				setEmail('');
				setPassword('');

				setRedirect(true);
			}
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
			<SubmitButton
				cls='auth-button'
				txt='Sign in'
			/>
		</form>
	);
}
