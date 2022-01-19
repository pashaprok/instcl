import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { appConfig } from '../config/app';
import { extractLSTokens } from '../utils/token.helpers';

const link = createHttpLink({
	uri: appConfig.backAPILink,
	credentials: 'same-origin',
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
	// uri: appConfig.backAPILink,
	link: authLink.concat(link),
	cache: new InMemoryCache(),
});
