import { gql } from '@apollo/client';

export const REGISTER_QUERY = gql`
	mutation RegisterUser($newUser: UserRegisterInput!, $avatar: Upload) {
    registerUser(newUser: $newUser, avatar: $avatar) {
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
