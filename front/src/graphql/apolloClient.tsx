import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { appConfig } from '../config/app';
import { extractLSTokens } from '../utils/token.helpers';

const uploadLink = createUploadLink({
	uri: appConfig.backAPILink,
	credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
	const { access, refresh } = extractLSTokens();
	return {
		headers: {
			...headers,
			access,
			refresh,
		},
	};
});

export const apolloClient = new ApolloClient({
	link: authLink.concat(uploadLink),
	cache: new InMemoryCache(),
});
