import { gql } from '@apollo/client';

export const ALL_USERS = gql`
	query GetAllUsers {
		getAllUsers {
			id
			email
			name
			password
			createdAt
			updatedAt
		}
	}
`;
