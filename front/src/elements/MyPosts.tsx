import React from 'react';
import { PostInfo } from '../types/posts.types';
import { NoContentMsg } from './NoContent';
import '../styles/my-posts-list.css';
import { CreateNewPost } from './forms/CreateNewPost';
import { PostsList } from './PostsList';

export interface MyPostsProps {
	posts: PostInfo[];
}

export function MyPosts({ posts }: MyPostsProps) {
	return (
		<>
			<CreateNewPost />
			{!posts ? (
				<NoContentMsg
					txt={`you don\'t have any posts yet`}
					cls='no-posts-msg'
				/>
			) : (
				<PostsList posts={posts} />
			)}
		</>
	);
}
