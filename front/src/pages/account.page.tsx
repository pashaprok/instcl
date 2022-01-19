import React from 'react';
import { useQuery } from '@apollo/client';
import { HeadingOne } from '../elements/layout/titles';
import { redirectToLogin } from '../elements/redirects';
import { CURRENT_USER } from '../graphql/schemas/currentUser.query';
import { LoadingSpinner } from '../elements/LoadingSpinner';
import { AccountInfo } from '../elements/AccountInfo';
import { Header } from '../elements/layout/headers';

export function AccountPage() {
	const { data, error } = useQuery(CURRENT_USER);

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
				</div>
			</>
		);
	}

	return <LoadingSpinner />;
}
