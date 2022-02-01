import React, { useRef, useState } from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_POST } from '../../graphql/schemas/createPost.mutation';
import { resetFileInputs, resetValues } from '../../helpers/formHelpers';
import { SubmitButton } from '../buttons/submitButton';
import { FailAlert } from '../layout/alerts';
import { PhotoUploadInput } from './photoUploadInput';
import { useStateFunction } from '../../types/common.types';
import '../../styles/create-post-form.css';
import { ACCOUNT_PAGE } from '../../graphql/schemas/currentUser.query';

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

	const onChangeInput = (
		e: React.ChangeEvent<any>,
		setFunction: useStateFunction,
	) => {
		setFunction(e.target.value);
	};

	const handleCreate = async (e: React.ChangeEvent<any>) => {
		e.preventDefault();
		try {
			await createPost();
			resetValues([setTitle, setContent]);
			resetFileInputs([setPhoto], [photoRef]);
		} catch (err) {
			if (err instanceof ApolloError) {
				console.log(err.message);
			} else {
				console.log(err);
			}
		}
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
