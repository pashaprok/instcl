import { gql } from '@apollo/client';

export const REGISTER_QUERY = gql`
	mutation registerUser($newUser: UserRegisterInput!) {
		registerUser(newUser: $newUser) {
			accessToken
			refreshToken
			user {
				id
				email
				name
				password
				createdAt
				updatedAt
			}
		}
	}
`;
