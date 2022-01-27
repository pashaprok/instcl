import React from 'react';
import { useQuery } from '@apollo/client';
import { HeadingOne } from '../elements/layout/titles';
import { redirectToLogin } from '../elements/redirects';
import { ALL_USERS_WITH_CURRENT } from '../graphql/schemas/currentUser.query';
import { LoadingSpinner } from '../elements/LoadingSpinner';
import { AccountInfo } from '../elements/AccountInfo';
import { Header } from '../elements/layout/headers';
import { UsersList } from '../elements/UsersList';

export function AccountPage() {
	const { data, error } = useQuery(ALL_USERS_WITH_CURRENT);

	if (error) {
		return redirectToLogin;
	}

	if (data) {
		return (
			<>
				<Header>
					<HeadingOne text='Your profile' cls='profile__title' />
				</Header>
				<div className='container'>
					<div className='account-content'>
						<AccountInfo user={data.getCurrentUser} />
					</div>
					<div className='other-users'>
						<UsersList
							list={data.getAllUsers}
							currentUser={data.getCurrentUser}
						/>
					</div>
				</div>
			</>
		);
	}

	return <LoadingSpinner />;
}
