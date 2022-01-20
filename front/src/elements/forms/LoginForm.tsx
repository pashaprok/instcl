import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_QUERY } from '../../graphql/schemas/login.query';
import { AuthInput } from './authInput';
import { SubmitButton } from '../buttons/submitButton';
import { AuthFormPropsI } from '../../types/auth.types';
import { FailAlert } from '../layout/alerts';
import { handleAuth } from '../../utils/handleAuth';

export function LoginForm(props: AuthFormPropsI) {
	const { setRedirect } = props;
	const [email, setEmail] = useState('');
	const [emailValErr, setEmailValErr] = useState('');
	const [password, setPassword] = useState('');
	const [passwordValErr, setPasswordValErr] = useState('');
	const [login, { error }] = useMutation(LOGIN_QUERY, {
		variables: {
			loginInfo: {
				email,
				password,
			},
		},
	});

	const handleLogin = async (e: React.ChangeEvent<any>) => {
		await handleAuth(
			e,
			[email, password],
			[emailValErr, passwordValErr],
			login,
			[setEmail, setPassword],
			setRedirect,
		);
	};

	return (
		<>
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
				<SubmitButton cls='auth-button' txt='Sign in' />
			</form>
			{error ? <FailAlert txt={error.message} /> : <></>}
		</>
	);
}
