import React from 'react';
import { UsersListItemPropsI } from '../types/auth.types';
import { defineImageSrc } from '../helpers/defineImageSrc';

export function UsersListItem(props: UsersListItemPropsI) {
	const { user } = props;
	const imageScr = defineImageSrc(user.avatar, 'avatar');

	return (
		<li>
			<div className='users-list__item'>
				<div className='user-avatar'>
					<img className='user-avatar__image' src={imageScr} alt='avatar' />
				</div>
				<div className='user-list_item-info'>
					<span>
						{' '}
						{user.name} - {user.email}
					</span>
				</div>
			</div>
		</li>
	);
}
