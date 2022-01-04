import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    getPostById(id: ID!): Post!
    getAllUserPosts(userId: ID!): [Post]
    getAllPosts: [Post]
  }

  extend type Mutation {
    createPost(userId: ID!, newPost: PostCreateInput!): Post!
    updatePost(userId: ID!, postId: ID!, postUpdateInfo: PostUpdateInput): Post!
    deletePost(userId: ID!, postId: ID!): ResponseMsg!
  }

  input PostCreateInput {
    title: String!
    content: String!
  }

  input PostUpdateInput {
    title: String
    content: String
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String
    updatedAt: String
  }

  type ResponseMsg {
    message: String!
  }
`;
