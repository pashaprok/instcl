import React from 'react';

interface AccountInfoItemProps {
	name: string;
	value: string | number;
}

export function AccountInfoItem({ name, value }: AccountInfoItemProps) {
	return (
		<div className='info-item'>
			<div className='info-name'>{name}</div>
			<div className='info-value'>{value}</div>
		</div>
	);
}

export function AccountInfoItemDate({ name, value }: AccountInfoItemProps) {
	const date = new Date(+value).toLocaleString();
	return AccountInfoItem({ name, value: date });
}
