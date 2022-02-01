import React from 'react';
import { ApolloError, useMutation } from '@apollo/client';
import { PostFormPropsI } from '../types/posts.types';
import { Button } from './buttons/Button';
import { DELETE_POST } from '../graphql/schemas/deletePost.mutation';
import { ACCOUNT_PAGE } from '../graphql/schemas/currentUser.query';
import { FailAlert } from './layout/alerts';

export function DeletePost(props: PostFormPropsI) {
	const { setRedirect, post } = props;

	const [deletePost, { error }] = useMutation(DELETE_POST, {
		variables: {
			postId: post.id,
		},
		refetchQueries: [ACCOUNT_PAGE],
	});

	const handleDelete = async (e: React.ChangeEvent<any>) => {
		e.preventDefault();
		try {
			await deletePost();
		} catch (err) {
			if (err instanceof ApolloError) {
				console.log(err.message);
			} else {
				console.log(err);
			}
		}
		setRedirect(false);
	};

	return (
		<>
			<Button
				cls='red-btn full-width-btn'
				onClickF={handleDelete}
				txt='Delete post'
			/>
			{error ? <FailAlert txt={error.message} /> : <></>}
		</>
	);
}
