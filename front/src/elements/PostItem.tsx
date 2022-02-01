import React from 'react';
import { PostInfoI } from '../types/posts.types';
import { defineImageSrc } from '../helpers/defineImageSrc';
import '../styles/post-item.css';

export interface PostPropsI {
	post: PostInfoI;
}

export function PostItem(props: PostPropsI) {
	const { post } = props;
	const imgSrc = defineImageSrc(post.photo, 'post');

	return (
		<div className='post-item__wrapper'>
			<div className='post-item'>
				<div className='post-header'>
					<h4>{post.title}</h4>
				</div>
				<div className='post-photo-block'>
					<img src={imgSrc} className='post-photo' alt={`post-${post.id}`} />
				</div>
				<div className='post-info'>
					<div className='content'>{post.content}</div>
					<div className='date'>
						<div>
							Posted at:&nbsp;
							<span>{new Date(+post.createdAt).toLocaleString()}</span>
						</div>
						<div>
							Last updated at:&nbsp;
							<span>{new Date(+post.updatedAt).toLocaleString()}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
