import React from 'react';
import {
	emailValidation,
	nameValidation,
	passwordValidation,
} from '../utils/validation';
import { useStateFunction } from '../types/common.types';

interface AuthInputProps {
	type: string;
	value: string;
	setValue: useStateFunction;
	errors: string;
	setErrors: useStateFunction;
}

function onChangeInput(
	event: React.ChangeEvent<any>,
	validationTarget: string,
	setValue: useStateFunction,
	setErrors: useStateFunction,
) {
	if (validationTarget === 'email') {
		emailValidation(event, setErrors);
	} else if (validationTarget === 'password') {
		passwordValidation(event, setErrors);
	} else if (validationTarget === 'name') {
		nameValidation(event, setErrors);
	}

	setValue(event.target.value);
}

export function AuthInput(props: AuthInputProps) {
	const { type, value, setValue, errors, setErrors } = props;
	const placeholder = `Your ${type}`;
	return (
		<div className='form-part'>
			<input
				type={type}
				value={value}
				className='auth-input'
				placeholder={placeholder}
				onChange={e => onChangeInput(e, type, setValue, setErrors)}
			/>
			<span className='auth-input__errors-alert'>
				<pre>{errors}</pre>
			</span>
		</div>
	);
}
