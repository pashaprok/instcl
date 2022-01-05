import { gql } from 'apollo-server';

export default gql`
  extend type Query {
    getPostById(id: ID!): Post!
    getAllUserPosts(userId: ID!): [Post]
    getAllMyPosts: [Post]
    getAllPosts: [Post]
  }

  extend type Mutation {
    createPost(newPost: PostCreateInput!): Post!
    updatePost(postId: ID!, postUpdateInfo: PostUpdateInput): Post!
    deletePost(postId: ID!): ResponseMsg!
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
