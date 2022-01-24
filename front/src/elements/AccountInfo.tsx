import React from 'react';
import { AccountInfoPropsI } from '../types/auth.types';
import '../styles/account-page.css';
import { AccountInfoItem, AccountInfoItemDate } from './AccountInfoItem';
import { LogoutButton } from './buttons/Button';
import { UpdateProfile } from './updateProfile';
import { appConfig } from '../config/app';


export function AccountInfo(props: AccountInfoPropsI) {
	const { user } = props;
	let imageScr: string = '/images/avatar-default.png';
	if (user.avatar) imageScr = `${appConfig.backImagesLink}/avatar/${user.avatar}`;

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
				<div className='account-info__btns'>
					<UpdateProfile user={user} />
					<LogoutButton
						cls='blue-btn'
						txt={<><i className='fas fa-sign-out-alt' /> Logout</>}
					/>
				</div>
			</div>
		</div>
	);
}
