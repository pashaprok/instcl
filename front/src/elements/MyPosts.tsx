import React from 'react';
import { PostInfoI } from '../types/posts.types';
import { NoContentMsg } from './NoContent';
import '../styles/my-posts-list.css';
import { CreateNewPost } from './forms/CreateNewPost';
import { PostsList } from './PostsList';

export interface MyPostsPropsI {
	posts: PostInfoI[];
}

export function MyPosts(props: MyPostsPropsI) {
	const { posts } = props;

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
