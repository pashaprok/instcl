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
		if (!emailValidationRegExp.test(email)) {
			errors.push('Invalid email!');
		}

		return errors;
	}

	static validateWitNotEmpty(
		value: string,
		validationFunction: Function,
	): string[] {
		const errors: string[] = [];

		const empty: string | null = Validation.isNotEmpty(value);
		if (empty) errors.push(empty);

		const validation: string[] | null = validationFunction(value);
		if (validation) errors.push(...validation);

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
	emptyAllow: boolean,
) {
	let errors: string[];
	if (emptyAllow) {
		errors = Validation.nameValidation(event.target.value);
	} else {
		errors = Validation.validateWitNotEmpty(
			event.target.value,
			Validation.nameValidation,
		);
	}

	setValidationErrors(errors, setErrors);
}

export function emailValidation(
	event: React.ChangeEvent<any>,
	setErrors: useStateFunction,
	emptyAllow: boolean,
) {
	let errors: string[];
	if (emptyAllow) {
		errors = Validation.emailValidate(event.target.value);
	} else {
		errors = Validation.validateWitNotEmpty(
			event.target.value,
			Validation.emailValidate,
		);
	}

	setValidationErrors(errors, setErrors);
}

export function passwordValidation(
	event: React.ChangeEvent<any>,
	setErrors: useStateFunction,
	emptyAllow: boolean,
) {
	let errors: string[];
	if (emptyAllow) {
		errors = Validation.passwordValidate(event.target.value);
	} else {
		errors = Validation.validateWitNotEmpty(
			event.target.value,
			Validation.passwordValidate,
		);
	}

	setValidationErrors(errors, setErrors);
}

export function inputValidation(
	event: React.ChangeEvent<any>,
	setErrors: useStateFunction,
	emptyAllow: boolean,
	type: 'name' | 'email' | 'password',
) {
	let funcValidate: Function;
	if (type === 'email') {
		funcValidate = Validation.emailValidate;
	} else if (type === 'password') {
		funcValidate = Validation.passwordValidate;
	} else {
		funcValidate = Validation.nameValidation;
	}

	const errors: string[] = [];
	if (emptyAllow) {
		if (event.target.value.length > 0) {
			const errs = funcValidate(event.target.value);
			errors.push(...errs);
		}
	} else {
		const errs = Validation.validateWitNotEmpty(
			event.target.value,
			funcValidate,
		);
		errors.push(...errs);
	}

	setValidationErrors(errors, setErrors);
}
