import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../../graphql/schemas/createPost.mutation';
import { SubmitButton } from '../buttons/submitButton';
import { FailAlert } from '../layout/alerts';
import { PhotoUploadInput } from './photoUploadInput';
import '../../styles/create-post-form.css';
import { ACCOUNT_PAGE } from '../../graphql/schemas/currentUser.query';
import { handleSubmitPostForm, onChangeInput } from '../../utils/handlePost';

export function CreateNewPost() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [photo, setPhoto] = useState(null);
	const photoRef = useRef();

	const [createPost, { error }] = useMutation(CREATE_POST, {
		variables: {
			newPost: {
				title,
				content,
			},
			photo,
		},
		refetchQueries: [ACCOUNT_PAGE],
	});

	const handleCreate = async (e: React.ChangeEvent<any>) => {
		await handleSubmitPostForm(
			e,
			[title, content],
			createPost,
			[setTitle, setContent],
			{ ref: photoRef, set: setPhoto },
		);
	};

	return (
		<>
			<form onSubmit={handleCreate} className='create-post-form'>
				<div className='form-part'>
					<input
						value={title}
						type='text'
						placeholder='post title'
						className='create-post-input'
						onChange={e => onChangeInput(e, setTitle)}
					/>
				</div>
				<PhotoUploadInput
					cls='create-post-input file'
					setFile={setPhoto}
					imageRef={photoRef}
				/>
				<div className='form-part full-width'>
					<textarea
						value={content}
						className='create-post-textarea'
						placeholder='post content'
						onChange={e => onChangeInput(e, setContent)}
					/>
				</div>
				<SubmitButton cls='blue-btn' txt='Create post' />
			</form>
			{error ? <FailAlert txt={error.message} /> : <></>}
		</>
	);
}
