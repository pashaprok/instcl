import React from 'react';

interface SubmitButtonProps {
	cls: string;
	txt?: string;
}

export function SubmitButton({ cls, txt = 'Submit' }: SubmitButtonProps) {
	return (
		<div className='form-part'>
			<input type='submit' value={txt} className={cls} />
		</div>
	);
}
