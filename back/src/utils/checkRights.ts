import { PostID } from '../types/post.types';
import { Post } from '../entities/post.entity';
import { getPost, getUserPosts } from '../repositories/post.repository';
import { NotFound } from './errors';
import { UserID } from '../types/user.types';
import { ApolloError } from 'apollo-server';

interface Id {
  id: number
}

function checkBelongs<T extends Id>(arr: T[], id: PostID): boolean {
  let check: boolean = false;
  arr.forEach(i => {
    check = i.id === id;
  })

  return check;
}

async function checkPostExist(postId: PostID): Promise<Post> {
  const post: Post = await getPost(postId);
  if (post) return post;
  NotFound('Post');
}

export async function checkPostRights(postId: PostID, userId: UserID) {
  const postFound: Post = await checkPostExist(postId);
  const userPosts: Post[] = await getUserPosts(userId);
  const check: boolean = checkBelongs(userPosts, postFound.id);
  if(!check) {
    throw new ApolloError('Post can be updated only by author!', '403')
  }
}