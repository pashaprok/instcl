import React from 'react';
import { ApolloError } from '@apollo/client';
import { Validation } from './validation';
import {
	refObj,
	useStateFunction,
	useStateFunctionAny,
	useStateFunctionBool,
} from '../types/common.types';
import { resetFileInputs, resetValues } from '../helpers/formHelpers';

export function postValidation(values: string[], action: 'create' | 'update') {
	const checkArr: boolean[] = [];

	if (action === 'create') {
		values.forEach(v => {
			if (Validation.isNotEmpty(v)) {
				checkArr.push(false);
			} else {
				checkArr.push(true);
			}
		});
	}

	values.forEach(v => {
		if (Validation.lengthValidation(v, 'Text', 3, 255)) {
			checkArr.push(false);
		} else {
			checkArr.push(true);
		}
	});

	const result = checkArr.indexOf(false, 0);
	return result === -1;
}

export const onChangeInput = (
	e: React.ChangeEvent<any>,
	setFunction: useStateFunction,
) => {
	setFunction(e.target.value);
};

interface FileResetI {
	set: useStateFunctionAny;
	ref: refObj;
}

export async function handleSubmitPostForm(
	e: React.ChangeEvent<any>,
	values: string[],
	postFunction: Function,
	setInputs: useStateFunction[],
	fileReset: FileResetI,
	redirect?: useStateFunctionBool,
) {
	e.preventDefault();
	try {
		await postFunction();
		resetValues(setInputs);
		resetFileInputs([fileReset.set], [fileReset.ref]);
		if (redirect) redirect(false);
	} catch (err) {
		if (err instanceof ApolloError) {
			console.log(err.message);
		} else {
			console.log(err);
		}
	}
}
