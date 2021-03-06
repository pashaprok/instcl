import { ApolloError } from 'apollo-server';
import { PostID } from '../types/post.types';
import { Post } from '../entities/post.entity';
import { getPost, getUserPosts } from '../repositories/post.repository';
import { NotFound } from './errors';
import { UserID } from '../types/user.types';
import { getById } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

interface Id {
  id: number;
}

function checkBelongs<T extends Id>(arr: T[], id: PostID): boolean {
  const check = arr.filter((post) => post.id === id);
  return !!check;
}

async function checkPostExist(postId: PostID): Promise<Post> {
  const post: Post = await getPost(postId);
  if (!post) NotFound('Post');
  return post;
}

async function checkUserExist(userId: UserID): Promise<User> {
  const user: User = await getById(userId);
  if (!user) NotFound('Post');
  return user;
}

export async function checkPostRights(postId: PostID, userId: UserID) {
  await checkUserExist(userId);
  const postFound: Post = await checkPostExist(postId);
  const userPosts: Post[] = await getUserPosts(userId);
  const check: boolean = checkBelongs(userPosts, postFound.id);
  if (!check) {
    throw new ApolloError('Post can be updated only by author!', '403');
  }
}
