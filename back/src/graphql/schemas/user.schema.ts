import { gql } from 'apollo-server';

export default gql `
    type Query {
        getUserById(id: ID!): User!
        getAllUsers: [User]
    }

    type Mutation {
        registerUser(newUser: UserRegisterInput!): User!
        updateUser(userUpdate: UserRegisterInput!): User!
    }
    
    input UserRegisterInput {
        email: String!
        name: String!
        password: String! 
    }
    
    input UserUpdateInput {
        id: ID!
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
 `;