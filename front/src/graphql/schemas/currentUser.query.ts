import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
	query getCurrentUser {
		getCurrentUser {
			id
			email
			name
			password
			avatar
			createdAt
			updatedAt
		}
	}
`;

export const ACCOUNT_PAGE = gql`
	query Query {
		getCurrentUser {
			id
			email
			name
			password
			avatar
			createdAt
			updatedAt
		}
		getAllUsers {
			id
			email
			name
			avatar
		}
		getAllMyPosts {
			id
			title
			content
			photo
			createdAt
			updatedAt
		}
	}
`;
