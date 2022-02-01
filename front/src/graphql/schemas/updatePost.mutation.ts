import { gql } from '@apollo/client';

export const UPDATE_POST = gql`
	mutation UpdatePost(
		$postId: ID!
		$postUpdateInfo: PostUpdateInput
		$photo: Upload
	) {
		updatePost(
			postId: $postId
			postUpdateInfo: $postUpdateInfo
			photo: $photo
		) {
			id
			photo
			title
			content
			createdAt
			updatedAt
		}
	}
`;
