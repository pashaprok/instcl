import React from 'react';
import { MyPostsPropsI } from './MyPosts';
import { PostItem } from './PostItem';

export function PostsList(props: MyPostsPropsI) {
	const { posts } = props;

	return (
		<div className='posts-list'>
			{posts.map(post => (
				<PostItem post={post} key={post.id} />
			))}
		</div>
	);
}
