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
