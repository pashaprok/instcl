import React from 'react';
import { ApolloError } from '@apollo/client';
import { Validation } from './validation';
import { setLSToken } from './token.helpers';
import {
	refObj,
	useStateFunction,
	useStateFunctionAny,
	useStateFunctionBool,
} from '../types/common.types';

export function allEmpty(values: string[]) {
	let countEmpty: number = 0;
	values.forEach(v => {
		if (Validation.isNotEmpty(v)) {
			countEmpty += 1;
		}
	});

	return countEmpty >= values.length;
}

function checkValidation(values: string[], errList: string[]) {
	const checkArr: boolean[] = [];

	values.forEach(v => {
		if (Validation.isNotEmpty(v)) {
			checkArr.push(false);
		} else {
			checkArr.push(true);
		}
	});

	errList.forEach(e => {
		if (e.length > 0) {
			checkArr.push(false);
		} else {
			checkArr.push(true);
		}
	});

	const result = checkArr.indexOf(false, 0);
	return result === -1;
}

export function resetValues(functions: useStateFunction[]) {
	functions.forEach(f => f(''));
}

export function resetFileInputs(
	functions: useStateFunctionAny[],
	refs: refObj[],
) {
	functions.forEach(f => f(null));
	refs.forEach(r => {
		r.current.value = null;
	});
}

export function setLSTokens(data: any) {
	if (data.loginUser) {
		setLSToken(data.loginUser.accessToken, data.loginUser.refreshToken);
	}

	if (data.registerUser) {
		setLSToken(data.registerUser.accessToken, data.registerUser.refreshToken);
	}

	if (data.updateCurrentUser) {
		setLSToken(
			data.updateCurrentUser.accessToken,
			data.updateCurrentUser.refreshToken,
		);
	}
}

export async function handleAuth(
	e: React.ChangeEvent<any>,
	values: string[],
	validationResults: string[],
	authFunction: Function,
	setInputs: useStateFunction[],
	redirect: useStateFunctionBool,
) {
	e.preventDefault();
	if (checkValidation(values, validationResults)) {
		try {
			const res = await authFunction();
			if (res.data) {
				setLSTokens(res.data);
				resetValues(setInputs);
				redirect(true);
			}
		} catch (err) {
			if (err instanceof ApolloError) {
				console.log(err.message);
			} else {
				console.log(err);
			}
		}
	}
}
