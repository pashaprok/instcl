import React, { useState } from 'react';
import { inputValidation } from '../../utils/validation';
import { useStateFunction } from '../../types/common.types';

interface AuthInputProps {
	type: string;
	value: string;
	setValue: useStateFunction;
	errors: string;
	setErrors: useStateFunction;
	clsName: 'auth-input' | 'modal-input';
	allowEmpty?: boolean;
	placeholder?: string;
}

function onChangeInput(
	event: React.ChangeEvent<any>,
	validationTarget: string,
	setValue: useStateFunction,
	setErrors: useStateFunction,
	allowEmpty?: boolean,
) {
	let empty = false;
	if (allowEmpty) empty = allowEmpty;
	if (
		validationTarget === 'name' ||
		validationTarget === 'email' ||
		validationTarget === 'password'
	) {
		inputValidation(event, setErrors, empty, validationTarget);
	}

	setValue(event.target.value);
}

export function AuthInput({
	type,
	value,
	setValue,
	errors,
	setErrors,
	clsName,
	allowEmpty = false,
	placeholder = `Your ${type}`,
}: AuthInputProps) {
	const [errTxt, setErrTxt] = useState('');

	let cls = clsName;
	const popoverCls = 'errors-popover';
	const heightPopover = {
		maxHeight: '0',
		padding: '0',
		marginTop: '5px',
		overflow: 'hidden',
		transition: 'all 0.2s ease-in-out',
	};
	if (errors) {
		setTimeout(() => {
			setErrTxt(errors);
		}, 0);
		cls += ' input-error';
		heightPopover.maxHeight = '100px';
		heightPopover.marginTop = '-10px';
		heightPopover.padding = '5px 15px';
	}

	return (
		<div className='form-part'>
			<input
				type={type}
				value={value}
				className={cls}
				placeholder={placeholder}
				onChange={e => onChangeInput(e, type, setValue, setErrors, allowEmpty)}
			/>
			<div style={heightPopover} className={popoverCls}>
				<span>
					<pre>{errTxt}</pre>
				</span>
			</div>
		</div>
	);
}
