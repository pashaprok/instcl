import {
  createPost, deletePost,
  getPost,
  getPosts,
  getUserPosts,
  updatePost,
} from '../../repositories/post.repository';
import { Post } from '../../entities/post.entity';
import { NotFound } from '../../utils/errors';
import { UserID } from '../../types/user.types';
import { UserInputError } from 'apollo-server';
import { User } from '../../entities/user.entity';
import { getById } from '../../repositories/user.repository';
import { ValidationResponse } from '../../types/validation.types';
import { postPartialValidate } from '../../utils/validation';
import { checkPostRights } from '../../utils/checkRights';

export default {
  Query: {
    async getPostById(parent, args, context, info) {
      const post: Post = await getPost(+args.id);
      if (!post) NotFound('Post');
      return post;
    },
    async getAllPosts(parent, args, context, info) {
      return getPosts();
    },
    async getAllUserPosts(parent, args, context, info) {
      return getUserPosts(+args.userId);
    },
  },
  Mutation: {
    async createPost(parent, args, context, info) {
      const postValidation: ValidationResponse = await postPartialValidate(args.newPost);
      if (postValidation.status === 'fail') {
        throw new UserInputError(postValidation.msg, postValidation);
      }

      const authorId: UserID = +args.userId;
      const authorFound: User = await getById(authorId);
      if(!authorFound) NotFound('User');

      const newPost = args.newPost;
      newPost.author = authorId;

      return await createPost(newPost);
    },
    async updatePost(parent, args, context, info) {
      const postValidation: ValidationResponse = await postPartialValidate(args.postUpdateInfo);
      if (postValidation.status === 'fail') {
        throw new UserInputError(postValidation.msg, postValidation);
      }

      await checkPostRights(+args.postId, +args.userId);
      return await updatePost(+args.postId, args.postUpdateInfo)
    },
    async deletePost(parent, args, context, info) {
      try {
        await checkPostRights(+args.postId, +args.userId);
        await deletePost(+args.postId);
        return { message: 'success' };
      } catch (e) {
        return {
          message: 'fail',
          info: e,
        };
      }
    }
  }
}