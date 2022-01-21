import React from 'react';
import { UserID } from '../types/auth.types';
import '../styles/account-page.css';
import { AccountInfoItem, AccountInfoItemDate } from './AccountInfoItem';
import { LogoutButton } from './buttons/Button';
import { UpdateProfile } from './updateProfile';

interface UserInfoI {
	__typename: string;
	id: UserID;
	email: string;
	name: string;
	password: string;
	createdAt: number;
	updatedAt: number;
	image?: string;
}

interface AccountInfoPropsI {
	user: UserInfoI;
}

export function AccountInfo(props: AccountInfoPropsI) {
	const { user } = props;
	let imageScr: string = '/images/avatar-default.png';
	if (user.image) imageScr = user.image;

	return (
		<div className='account-info'>
			<div className='photo-section'>
				<img className='avatar' src={imageScr} alt='avatar' />
			</div>
			<div className='info-section'>
				<AccountInfoItem name='User ID' value={user.id} />
				<AccountInfoItem name='Name' value={user.name} />
				<AccountInfoItem name='Email' value={user.email} />
				<AccountInfoItemDate name='Registration date' value={user.createdAt} />
				<AccountInfoItemDate
					name='Last profile update'
					value={user.updatedAt}
				/>
				<LogoutButton cls='blue-btn' txt='Logout' />
				<UpdateProfile />
			</div>
		</div>
	);
}
