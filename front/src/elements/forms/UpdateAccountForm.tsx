import React, { useRef, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { AuthFormPropsI } from '../../types/auth.types';
import { AuthInput } from './authInput';
import { SubmitButton } from '../buttons/submitButton';
import { FailAlert } from '../layout/alerts';
import { UPDATE_CURRENT_USER_QUERY } from '../../graphql/schemas/updateUser.query';
import { allEmpty, setLSTokens } from '../../utils/handleAuth';
import { resetFileInputs, resetValues } from '../../helpers/formHelpers';
import { NotAuthorizedMsg } from '../notAuthorizedMsg';
import { PhotoUploadInput } from './photoUploadInput';

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

	const [avatar, setAvatar] = useState(null);
	const avatarRef = useRef();

	const userUpdateInfo: userUpdateInfoI = {};
	if (name) userUpdateInfo.name = name;
	if (email) userUpdateInfo.email = email;

	const [update, { error }] = useMutation(UPDATE_CURRENT_USER_QUERY, {
		variables: {
			userUpdateInfo,
			avatar,
		},
	});

	const handleUpdate = async (e: React.ChangeEvent<any>) => {
		e.preventDefault();
		const validationSuccess =
			allEmpty([nameValErr, emailValErr]) && !allEmpty([name, email]);
		if (validationSuccess || avatar) {
			try {
				const res = await update();
				if (res.data) {
					setLSTokens(res.data);
					resetValues([setName, setEmail]);
					resetFileInputs([setAvatar], [avatarRef]);
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
					<PhotoUploadInput
						cls='modal-input update-upload'
						imageRef={avatarRef}
						setFile={setAvatar}
					/>
					<SubmitButton cls='blue-btn' txt='Update info' />
				</form>
				{error ? <FailAlert txt={error.message} /> : <></>}
			</>
		);
	}

	return <NotAuthorizedMsg />;
}
