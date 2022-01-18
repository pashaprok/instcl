import { gql } from '@apollo/client';

export const LOGIN_QUERY = gql`
	mutation loginUser($loginInfo: LoginInput!) {
		loginUser(loginInfo: $loginInfo) {
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
