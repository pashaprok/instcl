import { gql } from 'apollo-server';

export default gql`
  type Query {
    getCurrentUser: User!
    getUserById(id: ID!): User!
    getAllUsers: [User]
  }

  type Mutation {
    loginUser(loginInfo: LoginInput!): AuthUser!
    registerUser(newUser: UserRegisterInput!, avatar: Upload): AuthUser!
    updateCurrentUser(
      userUpdateInfo: UserUpdateInput
      avatar: Upload
    ): AuthUser!
    deleteUser(userId: ID!): ResponseMsg!
  }

  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserRegisterInput {
    email: String!
    name: String!
    password: String!
  }

  input UserUpdateInput {
    email: String
    name: String
  }

  type User {
    id: ID!
    email: String!
    name: String!
    password: String!
    avatar: String
    createdAt: String
    updatedAt: String
  }

  type ResponseMsg {
    message: String!
  }

  type AuthUser {
    accessToken: String!
    refreshToken: String!
    user: User!
  }
`;
