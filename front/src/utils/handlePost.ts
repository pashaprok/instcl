import { Validation } from './validation';

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
