import { gql } from 'apollo-server';

export default gql`
  type Query {
    getUserById(id: ID!): User!
    getAllUsers: [User]
  }

  type Mutation {
    registerUser(newUser: UserRegisterInput!): User!
    updateUser(userId: ID!, userUpdateInfo: UserUpdateInput): User!
    deleteUser(userId: ID!): ResponseMsg!
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
    createdAt: String
    updatedAt: String
  }

  type ResponseMsg {
    message: String!
  }
`;
