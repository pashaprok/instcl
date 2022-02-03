import React from 'react';
import { MyPostsProps } from './MyPosts';
import { PostItem } from './PostItem';

export function PostsList({ posts }: MyPostsProps) {
	return (
		<div className='posts-list'>
			{posts.map(post => (
				<PostItem post={post} key={post.id} />
			))}
		</div>
	);
}
