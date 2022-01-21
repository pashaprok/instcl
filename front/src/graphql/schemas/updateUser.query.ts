import { gql } from '@apollo/client';

export const UPDATE_CURRENT_USER_QUERY = gql`
	mutation UpdateCurrentUser($userUpdateInfo: UserUpdateInput) {
		updateCurrentUser(userUpdateInfo: $userUpdateInfo) {
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
