import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { HeadingOne } from '../elements/headingOne';
import { ALL_USERS } from '../graphql/schemas/allUsers.query';
import { gqlResponse } from '../types/common.types';
import { ShowContent } from '../elements/showQueryContent';

export function AllUsersPage() {
	const { data, loading, error } = useQuery(ALL_USERS);
	const [response, setResponse] = useState<gqlResponse>('loading');

	useEffect(() => {
		if (loading) {
			setResponse('loading');
		}

		if (!loading && data) {
			setTimeout(() => setResponse('data'), 10000);
		}

		if (!loading && error) {
			setResponse('error');
		}
	}, [loading]);

	return (
		<div className='container'>
			<HeadingOne text='All users' cls='users__title' />
			<div className='users-list'>
				<ShowContent response={response} data={data} error={error} />
			</div>
		</div>
	);
}
