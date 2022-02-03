import React, { useState } from 'react';
import { PostInfo } from '../types/posts.types';
import { defineImageSrc } from '../helpers/defineImageSrc';
import '../styles/post-item.css';
import { Modal } from './layout/modal';
import { UpdatePost } from './forms/PostUpdateForm';
import { DeletePost } from './DeletePost';

export interface PostProps {
	post: PostInfo;
}

export function PostItem({ post }: PostProps) {
	const imgSrc = defineImageSrc(post.photo, 'post');

	const [showModal, setShowModal] = useState(false);
	const toggleModal = async (e: React.ChangeEvent<any>) => {
		e.preventDefault();
		setShowModal(!showModal);
	};

	return (
		<>
			<div className='post-item__wrapper'>
				<div
					className='post-item'
					onClick={toggleModal}
					role='button'
					tabIndex={0}
				>
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
			<Modal handleClose={toggleModal} show={showModal} title='Post edit'>
				<div className='modal-photo-wrapper'>
					<img alt={`post-${post.id}`} src={imgSrc} />
				</div>
				<UpdatePost post={post} setRedirect={setShowModal} />
				<DeletePost post={post} setRedirect={setShowModal} />
			</Modal>
		</>
	);
}
