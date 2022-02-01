import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { PostFormPropsI } from '../../types/posts.types';
import { UPDATE_POST } from '../../graphql/schemas/updatePost.mutation';
import { handleSubmitPostForm, onChangeInput } from '../../utils/handlePost';
import { PhotoUploadInput } from './photoUploadInput';
import { SubmitButton } from '../buttons/submitButton';
import { FailAlert } from '../layout/alerts';

export function UpdatePost(props: PostFormPropsI) {
	const { setRedirect, post } = props;

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [photo, setPhoto] = useState(null);
	const photoRef = useRef();

	const [update, { error }] = useMutation(UPDATE_POST, {
		variables: {
			postId: post.id,
			postUpdateInfo: {
				title,
				content,
			},
			photo,
		},
	});

	const handleUpdate = async (e: React.ChangeEvent<any>) => {
		await handleSubmitPostForm(
			e,
			[title, content],
			update,
			[setTitle, setContent],
			{ ref: photoRef, set: setPhoto },
			setRedirect,
		);
	};

	return (
		<>
			<form onSubmit={handleUpdate} className='modal-form'>
				<div className='form-part'>
					<input
						value={title}
						type='text'
						placeholder={`Now title: ${post.title}`}
						className='modal-input'
						onChange={e => onChangeInput(e, setTitle)}
					/>
				</div>
				<PhotoUploadInput
					cls='modal-input update-upload'
					setFile={setPhoto}
					imageRef={photoRef}
				/>
				<div className='form-part full-width'>
					<textarea
						value={content}
						className='modal-textarea'
						placeholder={`Now text: ${post.content}`}
						onChange={e => onChangeInput(e, setContent)}
					/>
				</div>
				<SubmitButton cls='blue-btn' txt='Update post' />
			</form>
			{error ? <FailAlert txt={error.message} /> : <></>}
		</>
	);
}
