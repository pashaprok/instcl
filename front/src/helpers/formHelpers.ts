import {
	refObj,
	useStateFunction,
	useStateFunctionAny,
} from '../types/common.types';

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
