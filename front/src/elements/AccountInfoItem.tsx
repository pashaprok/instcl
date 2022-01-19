import React from 'react';

interface AccountInfoItemPropsI {
	name: string;
	value: string | number;
}

export function AccountInfoItem(props: AccountInfoItemPropsI) {
	const { name, value } = props;
	return (
		<div className='info-item'>
			<div className='info-name'>{name}</div>
			<div className='info-value'>{value}</div>
		</div>
	);
}

export function AccountInfoItemDate(props: AccountInfoItemPropsI) {
	const { name, value } = props;
	const date = new Date(+value).toISOString();
	return AccountInfoItem({ name, value: date });
}
