import React from 'react';
import { useQuery } from '@apollo/client';
import { HeadingOne } from '../elements/layout/titles';
import { redirectToLogin } from '../elements/redirects';
import { ACCOUNT_PAGE } from '../graphql/schemas/currentUser.query';
import { LoadingSpinner } from '../elements/LoadingSpinner';
import { AccountInfo } from '../elements/AccountInfo';
import { Header } from '../elements/layout/headers';
import { Tabs } from '../elements/layout/Tabs';
import { TabContent } from '../elements/layout/TabContent';
import { UsersList } from '../elements/UsersList';
import { MyPosts } from '../elements/MyPosts';

export function AccountPage() {
	const { data, error } = useQuery(ACCOUNT_PAGE);

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
					<Tabs>
						<TabContent title='My posts'>
							<MyPosts posts={data.getAllMyPosts} />
						</TabContent>
						<TabContent title='Other users'>
							<div className='other-users'>
								<UsersList
									list={data.getAllUsers}
									currentUser={data.getCurrentUser}
								/>
							</div>
						</TabContent>
					</Tabs>
				</div>
			</>
		);
	}

	return <LoadingSpinner />;
}
