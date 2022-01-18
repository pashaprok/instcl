import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AuthInput } from './authInput';
import { SubmitButton } from './submitButton';
import { Validation } from '../utils/validation';
import { REGISTER_QUERY } from '../graphql/schemas/register.query';

export function RegisterForm() {
	const [name, setName] = useState('');
	const [nameValErr, setNameValErr] = useState('');

	const [email, setEmail] = useState('');
	const [emailValErr, setEmailValErr] = useState('');

	const [password, setPassword] = useState('');
	const [passwordValErr, setPasswordValErr] = useState('');

	const [register] = useMutation(REGISTER_QUERY, {
		variables: {
			newUser: {
				name,
				email,
				password,
			},
		},
	});

	const handleRegister = async (e: React.ChangeEvent<any>) => {
		e.preventDefault();
		if (
			!Validation.isNotEmpty(email) &&
			!Validation.isNotEmpty(password) &&
			!Validation.isNotEmpty(name) &&
			emailValErr === '' &&
			passwordValErr === '' &&
			nameValErr === ''
		) {
			const data = await register();
			// console.log(data.data.registerUser.user);
			localStorage.setItem(
				'user',
				JSON.stringify({
					access: data.data.registerUser.accessToken,
					refresh: data.data.registerUser.refreshToken,
				}),
			);
			setName('');
			setEmail('');
			setPassword('');
		}
	};

	return (
		<form onSubmit={handleRegister} className='auth-form'>
			<AuthInput
				type='name'
				value={name}
				setValue={setName}
				errors={nameValErr}
				setErrors={setNameValErr}
			/>
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
