import { gql } from '@apollo/client';

export const CREATE_POST = gql`
	mutation CreatePost($newPost: PostCreateInput!, $photo: Upload!) {
		createPost(newPost: $newPost, photo: $photo) {
			id
			photo
			title
			content
			createdAt
			updatedAt
		}
	}
`;
