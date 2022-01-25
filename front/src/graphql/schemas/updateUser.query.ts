import { gql } from '@apollo/client';

export const UPDATE_CURRENT_USER_QUERY = gql`
	mutation UpdateCurrentUser($userUpdateInfo: UserUpdateInput, $avatar: Upload) {
    updateCurrentUser(userUpdateInfo: $userUpdateInfo, avatar: $avatar) {
      accessToken
      refreshToken
      user {
        id
        email
        name
        password
        avatar
        createdAt
        updatedAt
      }
    }
  }
`;
