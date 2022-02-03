import React from 'react';
import { AccountInfoProps } from '../types/auth.types';
import '../styles/account-page.css';
import { AccountInfoItem, AccountInfoItemDate } from './AccountInfoItem';
import { LogoutButton } from './buttons/Button';
import { UpdateProfile } from './updateProfile';
import { AccountPhotoSection } from './AccountPhotoSection';
import { defineImageSrc } from '../helpers/defineImageSrc';

export function AccountInfo({ user }: AccountInfoProps) {
	const imageScr = defineImageSrc(user.avatar, 'avatar');

	return (
		<div className='account-info'>
			<AccountPhotoSection imgLink={imageScr} />
			<div className='info-section'>
				<AccountInfoItem name='User ID' value={user.id} />
				<AccountInfoItem name='Name' value={user.name} />
				<AccountInfoItem name='Email' value={user.email} />
				<AccountInfoItemDate name='Registration date' value={user.createdAt} />
				<AccountInfoItemDate
					name='Last profile update'
					value={user.updatedAt}
				/>
				<div className='account-info__btns'>
					<UpdateProfile user={user} />
					<LogoutButton
						cls='blue-btn'
						txt={
							<>
								<i className='fas fa-sign-out-alt' /> Logout
							</>
						}
					/>
				</div>
			</div>
		</div>
	);
}
