import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { CURRENT_USER } from '../graphql/schemas/currentUser.query';
import { redirectToAccount } from '../elements/redirects';

export function ShowAuthPages(page: Function) {
	const [redirect, setRedirect] = useState(false);
	const [content, setContent] = useState(page(setRedirect));
	const { data } = useQuery(CURRENT_USER);

	useEffect(() => {
		if (redirect || data) {
			setContent(redirectToAccount);
		}
	}, [redirect, data]);

	return content;
}
