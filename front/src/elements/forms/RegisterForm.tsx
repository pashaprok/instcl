import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AuthInput } from './authInput';
import { SubmitButton } from '../buttons/submitButton';
import { REGISTER_QUERY } from '../../graphql/schemas/register.query';
import { AuthFormPropsI } from '../../types/auth.types';
import { handleAuth } from '../../utils/handleAuth';
import { FailAlert } from '../layout/alerts';

export function RegisterForm(props: AuthFormPropsI) {
	const { setRedirect } = props;
	const [name, setName] = useState('');
	const [nameValErr, setNameValErr] = useState('');

	const [email, setEmail] = useState('');
	const [emailValErr, setEmailValErr] = useState('');

	const [password, setPassword] = useState('');
	const [passwordValErr, setPasswordValErr] = useState('');

	const [register, { error }] = useMutation(REGISTER_QUERY, {
		variables: {
			newUser: {
				name,
				email,
				password,
			},
		},
	});

	const handleRegister = async (e: React.ChangeEvent<any>) => {
		await handleAuth(
			e,
			[name, email, password],
			[nameValErr, emailValErr, passwordValErr],
			register,
			[setName, setEmail, setPassword],
			setRedirect,
		);
	};

	return (
		<>
			<form onSubmit={handleRegister} className='auth-form'>
				<AuthInput
					type='name'
					value={name}
					setValue={setName}
					errors={nameValErr}
					setErrors={setNameValErr}
					clsName='auth-input'
				/>
				<AuthInput
					type='email'
					value={email}
					setValue={setEmail}
					errors={emailValErr}
					setErrors={setEmailValErr}
					clsName='auth-input'
				/>
				<AuthInput
					type='password'
					value={password}
					setValue={setPassword}
					errors={passwordValErr}
					setErrors={setPasswordValErr}
					clsName='auth-input'
				/>
				<SubmitButton cls='auth-button' txt='Sign up' />
			</form>
			{error ? <FailAlert txt={error.message} /> : <></>}
		</>
	);
}
