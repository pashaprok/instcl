import React from 'react';
import {
	strongPasswordRegExp,
	emailValidationRegExp,
} from '../constants/regex';
import { useStateFunction } from '../types/common.types';

export class Validation {
	static isNotEmpty(target: string) {
		if (!target) {
			return "Can't be empty!";
		}

		return null;
	}

	static lengthValidation(
		value: string,
		target: string,
		min: number,
		max: number,
	) {
		if (value.length < min || value.length > max) {
			return `${target} must be greater than ${min} chars and less ${max}!`;
		}

		return null;
	}

	static nameValidation(name: string): string[] {
		const errors: string[] = [];

		const empty: string | null = Validation.isNotEmpty(name);
		if (empty) errors.push(empty);

		const length: string | null = Validation.lengthValidation(
			name,
			'Name',
			3,
			255,
		);
		if (length) errors.push(length);

		return errors;
	}

	static passwordValidate(password: string): string[] {
		const errors: string[] = [];

		const empty: string | null = Validation.isNotEmpty(password);
		if (empty) errors.push(empty);

		if (!password.match(strongPasswordRegExp)) {
			errors.push('Password must contain uppercase, lowercase and digits!');
		}

		const length: string | null = Validation.lengthValidation(
			password,
			'Password',
			8,
			50,
		);
		if (length) errors.push(length);

		return errors;
	}

	static emailValidate(email: string): string[] {
		const errors: string[] = [];

		const empty: string | null = Validation.isNotEmpty(email);
		if (empty) errors.push(empty);

		if (!emailValidationRegExp.test(email)) {
			errors.push('Invalid email!');
		}

		return errors;
	}
}

function setValidationErrors(errors: string[], setErrors: useStateFunction) {
	if (errors.length > 0) {
		const labelErrs = errors.join('\n');
		setErrors(labelErrs);
	} else {
		setErrors('');
	}
}

export function nameValidation(
	event: React.ChangeEvent<any>,
	setErrors: useStateFunction,
) {
	const errors = Validation.nameValidation(event.target.value);
	setValidationErrors(errors, setErrors);
}

export function emailValidation(
	event: React.ChangeEvent<any>,
	setErrors: useStateFunction,
) {
	const errors = Validation.emailValidate(event.target.value);
	setValidationErrors(errors, setErrors);
}

export function passwordValidation(
	event: React.ChangeEvent<any>,
	setErrors: useStateFunction,
) {
	const errors = Validation.passwordValidate(event.target.value);
	setValidationErrors(errors, setErrors);
}
