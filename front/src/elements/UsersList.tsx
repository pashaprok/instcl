import React from 'react';
import { UserListPropsI } from '../types/auth.types';
import { UsersListItem } from './UsersListItem';
import '../styles/users-list.css';

export function UsersList(props: UserListPropsI) {
	const { list, currentUser } = props;
	const users = list.filter(user => user.id !== currentUser.id);
	return (
		<>
			<ul className='users-list'>
				{users.map(user => (
					<UsersListItem user={user} key={user.id} />
				))}
			</ul>
		</>
	);
}
