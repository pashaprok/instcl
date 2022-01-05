import { DeleteResult, getRepository, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { UserID } from '../types/user.types';

export const getPosts = async (): Promise<Array<Post>> => {
  const postRepository: Repository<Post> = getRepository(Post);
  return postRepository.find({
    relations: ['author'],
  });
};

export const createPost = async (payload: Partial<Post>): Promise<Post> => {
  const postRepository: Repository<Post> = getRepository(Post);
  const post: Post = new Post();
  return postRepository.save({
    ...post,
    ...payload,
  });
};

export const getPost = async (id: number): Promise<Post> => {
  const postRepository: Repository<Post> = getRepository(Post);
  return postRepository.findOneOrFail({
    where: {
      id,
    },
    relations: ['author'],
  });
};

export const getUserPosts = async (id: UserID): Promise<Array<Post>> => {
  const postRepository: Repository<Post> = getRepository(Post);
  return postRepository.find({
    where: {
      author: id,
    },
  });
};

export const updatePost = async (
  id: number,
  upd: Partial<Post>,
): Promise<Post> => {
  const postRepository: Repository<Post> = getRepository(Post);
  await postRepository.update(id, upd);
  return getPost(id);
};

export const deletePost = async (id: number): Promise<DeleteResult> => {
  const postRepository: Repository<Post> = getRepository(Post);
  return postRepository.delete(id);
};
