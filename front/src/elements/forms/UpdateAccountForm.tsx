import React, { useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { AuthFormPropsI } from '../../types/auth.types';
import { AuthInput } from './authInput';
import { SubmitButton } from '../buttons/submitButton';
import { FailAlert } from '../layout/alerts';
import { UPDATE_CURRENT_USER_QUERY } from '../../graphql/schemas/updateUser.query';
import { allEmpty, resetValues, setLSTokens } from '../../utils/handleAuth';

interface userUpdateInfoI {
	name?: string;
	email?: string;
}

export function UpdateAccountForm(props: AuthFormPropsI) {
	const { setRedirect, user } = props;
	const [name, setName] = useState('');
	const [nameValErr, setNameValErr] = useState('');

	const [email, setEmail] = useState('');
	const [emailValErr, setEmailValErr] = useState('');

	const userUpdateInfo: userUpdateInfoI = {};
	if (name) userUpdateInfo.name = name;
	if (email) userUpdateInfo.email = email;

	const [update, { error }] = useMutation(UPDATE_CURRENT_USER_QUERY, {
		variables: {
			userUpdateInfo,
		},
	});

	const handleUpdate = async (e: React.ChangeEvent<any>) => {
		e.preventDefault();
		if (nameValErr === '' && emailValErr === '' && !allEmpty([name, email])) {
			try {
				const res = await update();
				if (res.data) {
					setLSTokens(res.data);
					resetValues([setName, setEmail]);
					setRedirect(false);
				}
			} catch (err) {
				if (err instanceof ApolloError) {
					console.log(err.message);
				} else {
					console.log(err);
				}
			}
		}
	};

	if (user) {
		return (
			<>
				<form onSubmit={handleUpdate} className='modal-form'>
					<AuthInput
						type='name'
						value={name}
						setValue={setName}
						errors={nameValErr}
						setErrors={setNameValErr}
						clsName='modal-input'
						allowEmpty
						placeholder={`Your name: ${user.name}`}
					/>
					<AuthInput
						type='email'
						value={email}
						setValue={setEmail}
						errors={emailValErr}
						setErrors={setEmailValErr}
						clsName='modal-input'
						allowEmpty
						placeholder={`Your email: ${user.email}`}
					/>
					<SubmitButton cls='blue-btn' txt='Update info' />
				</form>
				{error ? <FailAlert txt={error.message} /> : <></>}
			</>
		);
	}

	return (
		<div>
			you are not logged in!
		</div>
	);
}
