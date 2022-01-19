import React from 'react';

interface SubmitButtonPropsI {
	cls: string;
	txt?: string;
}

export function SubmitButton(props: SubmitButtonPropsI) {
	const { cls, txt = 'Submit' } = props;
	return (
		<div className='form-part'>
			<input type='submit' value={txt} className={cls} />
		</div>
	);
}
