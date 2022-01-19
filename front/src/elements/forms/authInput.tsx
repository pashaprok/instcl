import React from 'react';
import {
	emailValidation,
	nameValidation,
	passwordValidation,
} from '../../utils/validation';
import { useStateFunction } from '../../types/common.types';

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

	let cls = 'auth-input';
	const popoverCls = 'errors-popover';
	const heightPopover = {
		maxHeight: '0',
		padding: '0',
		marginTop: '5px',
		overflow: 'hidden',
		transition: 'all 0.2s ease-in-out'
	}
	if (errors) {
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
				onChange={e => onChangeInput(e, type, setValue, setErrors)}
			/>
			<div
				style={heightPopover}
				className={popoverCls}
			>
				<span>
					<pre>{errors}</pre>
				</span>
			</div>
		</div>
	);
}
