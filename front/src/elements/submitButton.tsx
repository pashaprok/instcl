import React from 'react';

interface SubmitButtonPropsI {
	cls: string;
}

export function SubmitButton(props: SubmitButtonPropsI) {
	const { cls } = props;
	return (
		<div className='form-part'>
			<input type='submit' value='Submit' className={cls} />
		</div>
	);
}
